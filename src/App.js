import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import PizzaBlock from './components/PizzaBlock';
import { NotFound } from './pages/NotFound';

import axios from 'axios';
import Skeleton from './components/PizzaBlock/Skeleton';
import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const api = 'https://63ef3f0ac59531ccf16b8250.mockapi.io/';

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [pizzasRes] = await Promise.all([axios.get(`${api}pizzas`)]);
        setIsLoading(false);
        setPizzas(pizzasRes.data);
      } catch (err) {
        alert('Ошибка запроса данных :(');
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const renderPizzaBlocks = () => {
    return isLoading
      ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
      : pizzas.map((item, index) => <PizzaBlock {...item} isLoading={isLoading} key={index} />);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home renderPizzaBlocks={renderPizzaBlocks} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
