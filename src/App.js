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
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });
  const api = 'https://63ef3f0ac59531ccf16b8250.mockapi.io/';

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [pizzasRes] = await Promise.all([
          axios.get(
            `${api}pizzas?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortType.sort}`,
          ),
        ]);
        setIsLoading(false);
        setPizzas(pizzasRes.data);
      } catch (err) {
        alert('Ошибка запроса данных :(');
        console.log(err);
      }
    }
    fetchData();
  }, [categoryId, sortType]);

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
            <Route
              path="/"
              element={
                <Home
                  sortType={sortType}
                  setSortType={(id) => setSortType(id)}
                  renderPizzaBlocks={renderPizzaBlocks}
                  categoryId={categoryId}
                  setCategoryId={(id) => setCategoryId(id)}
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
