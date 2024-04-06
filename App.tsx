import ThemeProvider from './store/themeContext';
import Home from './screens/Home';

export default function App() {

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
