import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

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
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{renderPizzaBlocks()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
