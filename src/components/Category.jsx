import React from 'react';

function Category({ onClickCategory, activeIndex, title, index }) {
  return (
    <li onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>
      {title}
    </li>
  );
}

export default Category;
