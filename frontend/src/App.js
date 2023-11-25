import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import SearchScreen from './screens/SearchScreen';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div></div>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/restaurant/:slug" element={<RestaurantScreen />} />
            <Route path="/search" element={<SearchScreen />} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
