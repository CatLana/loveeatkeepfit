/**
 * Cookbook Recipes
 *
 * instagramPostId: the shortcode from the Instagram post URL
 *   e.g. https://www.instagram.com/p/C1abcXYZ123/ → "C1abcXYZ123"
 * Leave as an empty string until you copy the real post shortcode.
 */
export const recipes = [
  {
    id: 1,
    title: 'Overnight Protein Oats',
    // Replace with the real Instagram post shortcode from your @loveeatkeepfit post
    instagramPostId: '',
    caption:
      'High-protein breakfast you prep the night before. Zero cooking in the morning, no excuses. ' +
      '27g protein, under 400 kcal, and it keeps you full until lunch.',
    ingredients: [
      '80 g rolled oats (not instant)',
      '250 ml unsweetened almond milk (or skimmed milk)',
      '150 g low-fat Greek yoghurt (0 % fat)',
      '1 scoop vanilla whey protein powder (~25 g)',
      '1 tbsp chia seeds',
      '1 tsp honey or maple syrup',
      'Handful of mixed berries to serve',
    ],
    steps: [
      'Mix oats, milk, yoghurt, protein powder, chia seeds, and honey in a jar or bowl.',
      'Stir well, seal, and refrigerate overnight (minimum 6 hours).',
      'In the morning, stir again and add a splash of milk if too thick.',
      'Top with fresh berries and eat straight from the jar.',
    ],
    macros: { protein: 27, carbs: 48, fat: 7, calories: 375 },
    tags: ['breakfast', 'meal prep', 'high protein', 'no cook', '~375 kcal'],
  },
  {
    id: 2,
    title: 'Grilled Chicken Power Bowl',
    // Replace with the real Instagram post shortcode from your @loveeatkeepfit post
    instagramPostId: '',
    caption:
      'My go-to lunch bowl — lean protein, complex carbs, healthy fats, all in one. ' +
      'Tastes great cold too, so make a double batch for tomorrow.',
    ingredients: [
      '180 g chicken breast',
      '70 g quinoa (dry weight)',
      '100 g cherry tomatoes, halved',
      '60 g cucumber, diced',
      '30 g feta cheese, crumbled',
      'Large handful of rocket (arugula)',
      '1 tsp olive oil',
      'Juice of half a lemon',
      'Salt, pepper, dried oregano to taste',
    ],
    steps: [
      'Season chicken with salt, pepper, and oregano. Grill or pan-fry 5–6 min per side until cooked through.',
      'Cook quinoa in salted water according to packet instructions, then drain and cool slightly.',
      'Slice the chicken and arrange over quinoa with tomatoes, cucumber, and rocket.',
      'Crumble feta on top, drizzle with olive oil and lemon juice, and serve.',
    ],
    macros: { protein: 48, carbs: 42, fat: 12, calories: 475 },
    tags: ['lunch', 'meal prep', 'high protein', 'gluten free', '~475 kcal'],
  },
];