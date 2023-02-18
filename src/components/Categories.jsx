import React from 'react';
import Category from './Category';

function Categories({ categoryId, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const renderCategories = () => {
    return categories.map((item, index) => (
      <Category
        onClickCategory={() => onClickCategory(index)}
        categoryId={categoryId}
        title={item}
        index={index}
        key={index}
      />
    ));
  };

  return (
    <div className="categories">
      <ul>{renderCategories()}</ul>
    </div>
  );
}

export default Categories;
