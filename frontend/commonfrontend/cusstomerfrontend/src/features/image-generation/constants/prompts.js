export const DISH_PROMPTS = [
  {
    id: 'dish_burger',
    label: 'Gourmet Burger',
    emoji: '🍔',
    prompt:
      'A golden-brown gourmet burger with melted cheese, fresh lettuce, and sesame bun, styled on a wooden table with shallow depth of field',
  },
  {
    id: 'dish_pasta',
    label: 'Truffle Pasta',
    emoji: '🍝',
    prompt: 'Creamy truffle pasta with microgreens, plated elegantly on white porcelain, soft natural light',
  },
  {
    id: 'dish_sushi',
    label: 'Sushi Platter',
    emoji: '🍣',
    prompt: 'Assorted sushi platter with glossy fish, garnishes, presented on dark slate, overhead shot',
  },
]

export const BEVERAGE_PROMPTS = [
  {
    id: 'bev_espresso',
    label: 'Espresso',
    emoji: '☕️',
    prompt: 'Close-up of a steaming espresso shot in a ceramic cup, crema visible, moody cafe lighting',
  },
  {
    id: 'bev_cocktail',
    label: 'Signature Cocktail',
    emoji: '🍸',
    prompt: 'Colorful cocktail in a coupe glass garnished with citrus peel, reflective bar surface and bokeh lights',
  },
  {
    id: 'bev_wine',
    label: 'Red Wine',
    emoji: '🍷',
    prompt: 'Glass of red wine with rich color, soft focused background, warm ambient lighting',
  },
]

export const DESSERT_PROMPTS = [
  {
    id: 'des_tiramisu',
    label: 'Tiramisu',
    emoji: '🍰',
    prompt: 'Slice of tiramisu dusted with cocoa powder, delicate layers visible, side lighting for texture',
  },
  {
    id: 'des_cheesecake',
    label: 'Cheesecake',
    emoji: '🧁',
    prompt: 'Smooth cheesecake with berry compote drizzle, plated on minimalist white background',
  },
  {
    id: 'des_chocolate',
    label: 'Chocolate Lava',
    emoji: '🍫',
    prompt: 'Warm chocolate lava cake with molten center, close-up with dramatic studio lighting',
  },
]

const ALL_PROMPTS = [...DISH_PROMPTS, ...BEVERAGE_PROMPTS, ...DESSERT_PROMPTS]

export function getAllPrompts() {
  return ALL_PROMPTS
}

export function getPromptById(id) {
  return ALL_PROMPTS.find((p) => p.id === id) || null
}

export default {
  DISH_PROMPTS,
  BEVERAGE_PROMPTS,
  DESSERT_PROMPTS,
  getAllPrompts,
  getPromptById,
}
