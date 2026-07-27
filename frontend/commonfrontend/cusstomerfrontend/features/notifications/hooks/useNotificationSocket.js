// hooks/useNotificationSocket.js

import { useState, useEffect, useCallback, useRef } from 'react';

export const useNotificationSocket = (userId) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const socketRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  /**
   * Connect to WebSocket
   */
  const connect = useCallback(() => {
    if (!userId) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    try {
      // In production, use your actual WebSocket URL
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3000/ws';
      socketRef.current = new WebSocket(`${wsUrl}?userId=${userId}`);

      socketRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttempts.current = 0;
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(event.data);
          
          // Handle different message types
          if (data.type === 'notification') {
            // Show browser notification if supported
            if (Notification.permission === 'granted') {
              new Notification(data.title || 'New Notification', {
                body: data.message || '',
                icon: data.icon || '/favicon.ico',
              });
            }
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('WebSocket connection error');
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        
        // Attempt reconnection
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
          setTimeout(() => {
            console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`);
            connect();
          }, delay);
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionError(error.message);
    }
  }, [userId]);

  /**
   * Disconnect WebSocket
   */
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  /**
   * Send message through WebSocket
   */
  const sendMessage = useCallback((message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      return true;
    }
    return false;
  }, []);

  /**
   * Subscribe to notification channel
   */
  const subscribe = useCallback((channel) => {
    return sendMessage({
      type: 'subscribe',
      channel,
      userId,
    });
  }, [userId, sendMessage]);

  /**
   * Unsubscribe from notification channel
   */
  const unsubscribe = useCallback((channel) => {
    return sendMessage({
      type: 'unsubscribe',
      channel,
      userId,
    });
  }, [userId, sendMessage]);

  /**
   * Check if connection is active
   */
  const isActive = useCallback(() => {
    return socketRef.current?.readyState === WebSocket.OPEN;
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    lastMessage,
    connectionError,
    connect,
    disconnect,
    sendMessage,
    subscribe,
    unsubscribe,
    isActive,
  };
};

export default useNotificationSocket;