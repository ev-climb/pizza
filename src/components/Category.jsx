import React from 'react';

function Category({ onClickCategory, title, index, categoryId }) {
  return (
    <li onClick={() => onClickCategory(index)} className={categoryId === index ? 'active' : ''}>
      {title}
    </li>
  );
}

export default Category;
