const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export async function getHealth() {
  const res = await fetch(`${BASE}/api/health`)
  if (!res.ok) throw new Error('Health check failed')
  return res.json()
}

export async function getRestaurants() {
  const res = await fetch(`${BASE}/api/restaurants`)
  if (!res.ok) throw new Error('Failed to fetch restaurants')
  return res.json()
}

export default { getHealth, getRestaurants }
