import React, { useState } from 'react';
import Categories from '../Categories/CategoriesList/CategoriesList';
import styles from '../Filters/Filters.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import DateNew from '../Sort/DateNew/DateNew';
import DateOld from '../Sort/DateOld/DateOld';
import InputMax from '../Sort/InputMax/InputMax';
import InputMin from '../Sort/InputMin/InputMin';
import PriceHigh from '../Sort/PriceHigh/PriceHigh';
import PriceLow from '../Sort/PriceLow/PriceLow';

const Filters = (): JSX.Element => {
	const [sort, setSort] = useState({
		priceLow: false,
		priceHigh: false,
		dateNew: false,
		dateOld: false,
	});

	return (
		<div className={styles.filterImageAndNameContainer}>
			<div className={styles.sortBy}>Sort by:</div>
			<div className={styles.priceSort}>
				<div>Price Sort:</div>
				<PriceLow sort={sort} setSort={setSort} />
				<PriceHigh sort={sort} setSort={setSort} />
				<InputMax />
				<InputMin />
			</div>
			<div className={styles.dateSort}>
				<div>Date Sort:</div>
				<DateNew sort={sort} setSort={setSort} />
				<DateOld sort={sort} setSort={setSort} />
			</div>
			<Categories />
			<SearchBar />
		</div>
	);
};

export default Filters;
