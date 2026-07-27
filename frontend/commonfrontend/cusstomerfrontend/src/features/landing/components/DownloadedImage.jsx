import React from 'react'

const DownloadedImage = () => {
  const src = '/assets/images/landing/istockphoto-1005666894-612x612.jpg'
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
      <img src={src} alt="Landing" style={{ maxWidth: '100%', borderRadius: 8 }} />
    </div>
  )
}

export default DownloadedImage
