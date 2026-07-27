import React from 'react'
import DownloadedImage from './components/DownloadedImage'

export const HeroSection = () => (
  <section style={{ padding: '3rem 0' }}>
    <h1>Welcome to the Smart Restaurant</h1>
    <p>Discover dishes, offers, and book a table easily.</p>
  </section>
)

export const FeaturesSection = () => (
  <section style={{ padding: '2rem 0' }}>
    <h2>Features</h2>
    <ul>
      <li>Browse menu</li>
      <li>Order online</li>
      <li>Reserve tables</li>
    </ul>
  </section>
)

export const HowItWorks = () => (
  <section style={{ padding: '2rem 0' }}>
    <h2>How it works</h2>
    <p>Quick steps to order and enjoy your meal.</p>
  </section>
)

export const CTASection = () => (
  <section style={{ padding: '2rem 0' }}>
    <button>Get Started</button>
  </section>
)

export default {
  HeroSection,
  FeaturesSection,
  HowItWorks,
  CTASection,
  DownloadedImage,
}
