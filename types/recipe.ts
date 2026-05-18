export type Unit = 'g' | 'kg' | 'ml' | 'l' | 'Stück' | 'EL' | 'TL' | 'Prise' | 'Bund' | 'Scheibe' | 'Zehe' | 'Dose'

export interface RecipeIngredient {
  name: string
  amount: number
  unit: Unit
  note: string | null
}

export interface ProTipp {
  text: string
  extraIngredients?: Array<{ name: string; reason: string }>
}

export interface Nutrition {
  kcal: number
  protein: number
  carbs: number
  fat: number
}

export interface Recipe {
  id: string
  title: string
  description: string
  timeMinutes: number
  difficulty: 'Einfach' | 'Mittel' | 'Anspruchsvoll'
  servings: number
  tags: string[]
  ingredients: RecipeIngredient[]
  steps: string[]
  nutrition: Nutrition
  proTipp: ProTipp
  generatedAt: number
}
