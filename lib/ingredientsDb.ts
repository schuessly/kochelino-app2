import type { Category } from '@/types/pantry'
import type { Unit } from '@/types/recipe'

export interface IngredientEntry {
  name: string
  category: Category
  defaultUnit: Unit
  icon: string
}

export const INGREDIENTS_DB: IngredientEntry[] = [
  // Gemüse
  { name: 'Tomaten', category: 'Gemüse', defaultUnit: 'Stück', icon: '🍅' },
  { name: 'Zwiebeln', category: 'Gemüse', defaultUnit: 'Stück', icon: '🧅' },
  { name: 'Knoblauch', category: 'Gemüse', defaultUnit: 'Zehe', icon: '🧄' },
  { name: 'Paprika', category: 'Gemüse', defaultUnit: 'Stück', icon: '🫑' },
  { name: 'Zucchini', category: 'Gemüse', defaultUnit: 'Stück', icon: '🥒' },
  { name: 'Karotten', category: 'Gemüse', defaultUnit: 'Stück', icon: '🥕' },
  { name: 'Brokkoli', category: 'Gemüse', defaultUnit: 'g', icon: '🥦' },
  { name: 'Spinat', category: 'Gemüse', defaultUnit: 'g', icon: '🌿' },
  { name: 'Kartoffeln', category: 'Gemüse', defaultUnit: 'g', icon: '🥔' },
  { name: 'Süßkartoffeln', category: 'Gemüse', defaultUnit: 'g', icon: '🍠' },
  { name: 'Champignons', category: 'Gemüse', defaultUnit: 'g', icon: '🍄' },
  { name: 'Lauch', category: 'Gemüse', defaultUnit: 'Stück', icon: '🥬' },
  { name: 'Sellerie', category: 'Gemüse', defaultUnit: 'Stück', icon: '🌿' },
  { name: 'Gurke', category: 'Gemüse', defaultUnit: 'Stück', icon: '🥒' },
  { name: 'Salat', category: 'Gemüse', defaultUnit: 'Stück', icon: '🥗' },
  { name: 'Erbsen', category: 'Gemüse', defaultUnit: 'g', icon: '🟢' },
  { name: 'Mais', category: 'Gemüse', defaultUnit: 'Dose', icon: '🌽' },
  { name: 'Aubergine', category: 'Gemüse', defaultUnit: 'Stück', icon: '🍆' },
  { name: 'Blumenkohl', category: 'Gemüse', defaultUnit: 'g', icon: '🥦' },
  { name: 'Kürbis', category: 'Gemüse', defaultUnit: 'g', icon: '🎃' },

  // Obst
  { name: 'Äpfel', category: 'Obst', defaultUnit: 'Stück', icon: '🍎' },
  { name: 'Bananen', category: 'Obst', defaultUnit: 'Stück', icon: '🍌' },
  { name: 'Zitronen', category: 'Obst', defaultUnit: 'Stück', icon: '🍋' },
  { name: 'Orangen', category: 'Obst', defaultUnit: 'Stück', icon: '🍊' },
  { name: 'Erdbeeren', category: 'Obst', defaultUnit: 'g', icon: '🍓' },
  { name: 'Heidelbeeren', category: 'Obst', defaultUnit: 'g', icon: '🫐' },
  { name: 'Trauben', category: 'Obst', defaultUnit: 'g', icon: '🍇' },

  // Fleisch & Fisch
  { name: 'Hähnchenbrust', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🍗' },
  { name: 'Hackfleisch', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🥩' },
  { name: 'Rindfleisch', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🥩' },
  { name: 'Speck', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🥓' },
  { name: 'Lachs', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🐟' },
  { name: 'Garnelen', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🦐' },
  { name: 'Thunfisch', category: 'Fleisch & Fisch', defaultUnit: 'Dose', icon: '🐟' },
  { name: 'Schweinefleisch', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🥩' },
  { name: 'Putenbrust', category: 'Fleisch & Fisch', defaultUnit: 'g', icon: '🍗' },

  // Milchprodukte
  { name: 'Eier', category: 'Milchprodukte', defaultUnit: 'Stück', icon: '🥚' },
  { name: 'Butter', category: 'Milchprodukte', defaultUnit: 'g', icon: '🧈' },
  { name: 'Milch', category: 'Milchprodukte', defaultUnit: 'ml', icon: '🥛' },
  { name: 'Sahne', category: 'Milchprodukte', defaultUnit: 'ml', icon: '🥛' },
  { name: 'Joghurt', category: 'Milchprodukte', defaultUnit: 'g', icon: '🥛' },
  { name: 'Parmesan', category: 'Milchprodukte', defaultUnit: 'g', icon: '🧀' },
  { name: 'Mozzarella', category: 'Milchprodukte', defaultUnit: 'g', icon: '🧀' },
  { name: 'Frischkäse', category: 'Milchprodukte', defaultUnit: 'g', icon: '🧀' },
  { name: 'Käse', category: 'Milchprodukte', defaultUnit: 'g', icon: '🧀' },
  { name: 'Quark', category: 'Milchprodukte', defaultUnit: 'g', icon: '🥛' },

  // Getreide & Beilagen
  { name: 'Mehl', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🌾' },
  { name: 'Nudeln', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🍝' },
  { name: 'Spaghetti', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🍝' },
  { name: 'Reis', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🍚' },
  { name: 'Brot', category: 'Getreide & Beilagen', defaultUnit: 'Scheibe', icon: '🍞' },
  { name: 'Toastbrot', category: 'Getreide & Beilagen', defaultUnit: 'Scheibe', icon: '🍞' },
  { name: 'Quinoa', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🌾' },
  { name: 'Haferflocken', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🌾' },
  { name: 'Paniermehl', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🌾' },
  { name: 'Linsen', category: 'Getreide & Beilagen', defaultUnit: 'g', icon: '🫘' },
  { name: 'Kichererbsen', category: 'Getreide & Beilagen', defaultUnit: 'Dose', icon: '🫘' },

  // Gewürze & Öle
  { name: 'Salz', category: 'Gewürze & Öle', defaultUnit: 'Prise', icon: '🧂' },
  { name: 'Pfeffer', category: 'Gewürze & Öle', defaultUnit: 'Prise', icon: '🌶️' },
  { name: 'Olivenöl', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🫒' },
  { name: 'Sonnenblumenöl', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🌻' },
  { name: 'Paprikapulver', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌶️' },
  { name: 'Kreuzkümmel', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌿' },
  { name: 'Oregano', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌿' },
  { name: 'Basilikum', category: 'Gewürze & Öle', defaultUnit: 'Bund', icon: '🌿' },
  { name: 'Petersilie', category: 'Gewürze & Öle', defaultUnit: 'Bund', icon: '🌿' },
  { name: 'Thymian', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌿' },
  { name: 'Rosmarin', category: 'Gewürze & Öle', defaultUnit: 'Bund', icon: '🌿' },
  { name: 'Zucker', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🍬' },
  { name: 'Honig', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🍯' },
  { name: 'Sojasauce', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🫙' },
  { name: 'Essig', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🍾' },
  { name: 'Tomatenmark', category: 'Gewürze & Öle', defaultUnit: 'EL', icon: '🍅' },
  { name: 'Senf', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌭' },
  { name: 'Zimt', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌿' },
  { name: 'Backpulver', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🌾' },
  { name: 'Vanillezucker', category: 'Gewürze & Öle', defaultUnit: 'TL', icon: '🍬' },

  // Tiefkühl
  { name: 'Tiefkühlgemüse', category: 'Tiefkühl', defaultUnit: 'g', icon: '🧊' },
  { name: 'Tiefkühlerbsen', category: 'Tiefkühl', defaultUnit: 'g', icon: '🧊' },
  { name: 'Tiefkühlspinach', category: 'Tiefkühl', defaultUnit: 'g', icon: '🧊' },
]

export const QUICK_INGREDIENTS = ['Salz', 'Pfeffer', 'Olivenöl', 'Zwiebeln', 'Knoblauch', 'Eier', 'Butter', 'Tomaten']

export const CATEGORY_ICONS: Record<Category, string> = {
  'Gemüse': '🥬',
  'Obst': '🍎',
  'Fleisch & Fisch': '🥩',
  'Milchprodukte': '🧀',
  'Getreide & Beilagen': '🌾',
  'Gewürze & Öle': '🧂',
  'Tiefkühl': '🧊',
  'Sonstiges': '📦',
}

export function searchIngredients(query: string): IngredientEntry[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return INGREDIENTS_DB.filter((i) =>
    i.name.toLowerCase().includes(q)
  ).slice(0, 8)
}
