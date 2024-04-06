
type Theme = {
  background: string;
  foreground: string;
  text: string;
  bgCircle: string;
  modalBg: string;
  backdrop: string;
  /**
  * List items, recipe list filter button, etc.
  */
  cardBg: string;
  stepDone: string;
  stepUndone: string;
  searchBarBg: string;
};

export const lightTheme: Theme = {
  background: 'white',
  foreground: '#181818',
  text: '#181818',
  bgCircle: 'rgba(255, 190, 103, 1)',
  modalBg: '#F3F3F3',
  backdrop: 'rgba(32, 32, 32, 0.23)',
  cardBg: '#FFFFFF',
  stepDone: '#3D974B',
  stepUndone: '#D5D5D5',

  searchBarBg: '#F3F3F3',
};

export const darkTheme: Theme = {
  background: '#151515',
  foreground: '#F3F3F3',
  text: '#F3F3F3',
  bgCircle: 'rgba(37, 44, 34, 0.34)',
  modalBg: '#181818',
  backdrop: 'rgba(0, 0, 0, 0.27)',
  cardBg: '#232323',
  stepDone: '#3D974B',
  stepUndone: '#6B6B6B',


  searchBarBg: '#F3F3F3',
};
