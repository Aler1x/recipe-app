
export type Theme = {
  background: string;
  foreground: string;
  /**
   * Text color for foreground elements (e.g. button text)
   */
  fgText: string;
  text: string;
  bgCircle: string;
  placeholder: string;

  modalBg: string;
  backdrop: string;
  /**
  * List items, recipe list filter button, etc.
  */
  cardBackground: string;
  inactiveCardBg: string;
  stepDone: string;
  stepUndone: string;
  searchBarBg: string;
  /**
   * user profile, recipe details, etc.
   */
  userIcon: string;
  /**
   * Shadows
   */
  generalShadow: string;
  categoryCardShadow: string;
  recipeImageInnerShadow: string;
};

const commonTheme = {
  searchBarBg: '#F3F3F3',
  generalShadow: 'rgba(0, 0, 0, 0.15)',
  categoryCardShadow: 'rgba(0, 0, 0, 0.55)',
};

export const lightTheme: Theme = {
  background: 'white',
  foreground: '#181818',
  fgText: '#F3F3F3',
  text: '#181818',
  placeholder: '#9B9B9B',
  bgCircle: 'rgba(147, 190, 103, 0.12)',
  modalBg: '#F3F3F3',
  backdrop: 'rgba(32, 32, 32, 0.23)',
  cardBackground: '#FFFFFF',
  inactiveCardBg: '#FAFAFA',
  stepDone: '#82AC88',
  stepUndone: '#E2E2E2',
  recipeImageInnerShadow: 'rgba(255,255,255,0.65)',
  userIcon: '#F3F3F3',

  ...commonTheme,
};

export const darkTheme: Theme = {
  background: '#151515',
  foreground: '#F3F3F3',
  fgText: '#181818',
  text: '#F3F3F3',
  placeholder: '#696969',
  bgCircle: 'rgba(37, 44, 34, 0.34)',
  modalBg: '#181818',
  backdrop: 'rgba(0, 0, 0, 0.27)',
  cardBackground: '#232323',
  inactiveCardBg: '#1F1F1F',
  stepDone: '#3F6D46',
  stepUndone: '#6B6B6B',
  recipeImageInnerShadow: 'rgba(18,18,18, 0.65)',
  userIcon: '#303030',

  ...commonTheme,
};
