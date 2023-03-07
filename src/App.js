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

export const AppContext = React.createContext({});

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState('');
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
            `${api}pizzas?page=${currentPage}&limit=4&${
              categoryId ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sort}`,
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
  }, [categoryId, sortType, currentPage, searchValue]);

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const renderPizzaBlocks = () => {
    return isLoading
      ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
      : pizzas
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => <PizzaBlock {...item} isLoading={isLoading} key={index} />);
  };

  return (
    <AppContext.Provider value={{ setSearchValue, searchValue }}>
      <div className="App">
        <div className="wrapper">
          <Header onChangeSearchInput={onChangeSearchInput} />
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
                    setCurrentPage={setCurrentPage}
                  />
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
