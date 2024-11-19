import React, { useContext } from 'react';
import { HomePageContext } from '../../../Context/Context';
import styles from '../SearchBar/SearchBar.module.scss'

const SearchBar = (): JSX.Element => {
	const setSearch = useContext(HomePageContext).setSearch;

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
