import React, { useContext } from "react";
import styles from '../../styles/Filters/SearchBar.module.scss';
import { HomePageContext } from "../../Pages/HomePage";


const SearchBar = () => {

  const homePageData = useContext(HomePageContext);

  if (!homePageData) {
    throw new Error('amountContext is not provided');
  }

  const setSearch = homePageData.setSearch;

    const searchBar = (value: React.FormEvent<HTMLInputElement>) => {
        setSearch(value.currentTarget.value);
      };
      
    return (
        <div className={styles.searchBar}>
        <input
          className={styles.searchBarInput}
          type="text"
          placeholder="Search Product"
          name="search"
          onChange={searchBar}
        />
      </div>
    )
}

export default SearchBar;

