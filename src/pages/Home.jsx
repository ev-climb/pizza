import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';

export const Home = ({ renderPizzaBlocks, categoryId, setCategoryId, sortType, setSortType }) => {
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={setCategoryId} />
        <Sort sortType={sortType} onClick={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{renderPizzaBlocks()}</div>
    </div>
  );
};
