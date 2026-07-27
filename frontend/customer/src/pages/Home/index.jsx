import React, { useEffect, useState } from 'react'
import { HeroSection, FeaturesSection, CTASection, HowItWorks, DownloadedImage } from '../../features/landing'
import ImageGenerator from '../../features/image-generation/components/ImageGenerator'
import { getHealth, getRestaurants } from '../../api/client'

const HomePage = () => {
  const [health, setHealth] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((e) => setError(e.message))

    getRestaurants()
      .then((res) => setRestaurants(res.data || []))
      .catch((e) => setError(e.message))
  }, [])

  return (
    <main>
      <HeroSection />
      <FeaturesSection />

      <section style={{ padding: '1rem 0' }}>
        <h3>Backend status</h3>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {health ? <div>OK — {new Date(health.time).toLocaleString()}</div> : <div>Checking...</div>}
      </section>

      <section style={{ padding: '1rem 0' }}>
        <h3>Restaurants</h3>
        {restaurants.length === 0 ? (
          <div>No restaurants found.</div>
        ) : (
          <ul>
            {restaurants.map((r) => (
              <li key={r.id}>{r.name} — rating: {r.rating}</li>
            ))}
          </ul>
        )}
      </section>

      <DownloadedImage />
      <HowItWorks />
      <CTASection />

      <ImageGenerator />
    </main>
  )
}

export default HomePage
