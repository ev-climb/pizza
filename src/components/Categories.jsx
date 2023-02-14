import React from 'react';
import Category from './Category';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const renderCategories = () => {
    return categories.map((item, index) => (
      <Category
        onClickCategory={onClickCategory}
        activeIndex={activeIndex}
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
