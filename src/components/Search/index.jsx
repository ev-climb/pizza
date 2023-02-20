import React from 'react';
import { RiSearchLine } from 'react-icons/ri';

import styles from './Search.module.scss';

export const Search = ({ onChangeSearchInput, searchValue }) => {
  return (
    <label className={styles.label}>
      <div className={styles.icon}>
        <RiSearchLine size="20px" opacity={0.5} />
      </div>
      <input
        className={styles.root}
        placeholder="Поиск пиццы..."
        value={searchValue}
        onChange={onChangeSearchInput}
      />
    </label>
  );
};
