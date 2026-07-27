const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.get('/api/restaurants', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Downtown Diner', rating: 4.5 },
      { id: 2, name: 'Eastside Eats', rating: 4.2 }
    ]
  })
})

// In-memory images store for demo
const images = []

app.get('/api/images', (req, res) => {
  res.json({ success: true, data: images })
})

app.post('/api/images/generate', (req, res) => {
  const { prompt, style } = req.body || {}
  const id = `img_${Date.now()}`
  // For demo, return an existing static image from public assets
  const sample = '/assets/images/landing/istockphoto-1005666894-612x612.jpg'
  const item = {
    id,
    url: sample,
    prompt: prompt || 'demo',
    style: style || 'realistic',
    createdAt: new Date().toISOString(),
  }
  images.unshift(item)
  res.json({ success: true, data: item })
})

app.delete('/api/images/:id', (req, res) => {
  const { id } = req.params
  const idx = images.findIndex((i) => i.id === id)
  if (idx === -1) return res.status(404).json({ success: false, message: 'Not found' })
  images.splice(idx, 1)
  return res.json({ success: true })
})

app.post('/api/images/:id/favorite', (req, res) => {
  const { id } = req.params
  const item = images.find((i) => i.id === id)
  if (!item) return res.status(404).json({ success: false, message: 'Not found' })
  item.isFavorite = !item.isFavorite
  return res.json({ success: true, data: item })
})

// Serve copied landing images for demonstration
app.use('/assets/images/landing', express.static(path.join(__dirname, '..', 'public', 'assets', 'images', 'landing')))

app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`)
})
