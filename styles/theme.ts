
export type Theme = {
  background: string;
  foreground: string;
  /**
   * Text color for foreground elements (e.g. button text)
   */
  fgText: string;
  text: string;
  bgCircle: string;
  modalBg: string;
  backdrop: string;
  /**
  * List items, recipe list filter button, etc.
  */
  cardBg: string;
  inactiveCardBg: string;
  stepDone: string;
  stepUndone: string;
  searchBarBg: string;
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
  bgCircle: 'rgba(147, 190, 103, 0.12)',
  modalBg: '#F3F3F3',
  backdrop: 'rgba(32, 32, 32, 0.23)',
  cardBg: '#FFFFFF',
  inactiveCardBg: '#FAFAFA',
  stepDone: '#3D974B',
  stepUndone: '#D5D5D5',
  recipeImageInnerShadow: 'rgba(255,255,255,0.65)',

  ...commonTheme,
};

export const darkTheme: Theme = {
  background: '#151515',
  foreground: '#F3F3F3',
  fgText: '#181818',
  text: '#F3F3F3',
  bgCircle: 'rgba(37, 44, 34, 0.34)',
  modalBg: '#181818',
  backdrop: 'rgba(0, 0, 0, 0.27)',
  cardBg: '#232323',
  inactiveCardBg: '#1F1F1F',
  stepDone: '#3D974B',
  stepUndone: '#6B6B6B',
  recipeImageInnerShadow: 'rgba(18,18,18, 0.65)',

  ...commonTheme,
};
