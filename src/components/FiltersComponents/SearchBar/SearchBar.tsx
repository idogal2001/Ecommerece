import React, { useContext } from 'react';
import { HomePageContext } from '../../../Pages/HomePage/HomePage';
import styles from '../SearchBar/SearchBar.module.scss'

const SearchBar = (): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const setSearch = homePageData.setSearch;

	const searchBar = (value: React.FormEvent<HTMLInputElement>): void => {
		setSearch(value.currentTarget.value);
	};

	return (
		<div className={styles.searchBar}>
			<input className={styles.searchBarInput} type='text' placeholder='Search Product' name='search' onChange={searchBar} />
		</div>
	);
};

export default SearchBar;
