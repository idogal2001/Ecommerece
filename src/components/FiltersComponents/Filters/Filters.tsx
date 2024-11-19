import React, { useState, useContext } from 'react';
import { HomePageContext, productListDBContext } from '../../../Context/Context';
import Categories from '../Categories/CategoriesList/CategoriesList';
import styles from '../Filters/Filters.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import InputSort from '../Sort/InputSort/InputSort';
import SortButton from '../Sort/sortButton/SortButton';
import type { Product } from '../../../Interfaces/Product';

enum Sorting {
	PriceLow = 'priceLow',
	PriceHigh = 'priceHigh',
	DateNew = 'dateNew',
	DateOld = 'dateOld',
	None = 'none', 
}

const Filters = (): JSX.Element => {
	const [sort, setSort] = useState<Sorting>(Sorting.None);
	const productListFiltered = useContext(HomePageContext).productListFiltered;
	const setProductListFiltered = useContext(HomePageContext).setProductListFiltered;
	const [productListFromContext] = useContext(productListDBContext);
	const setMaxPriceRange = useContext(HomePageContext).setMaxPriceRange;
	const setMinPrice = useContext(HomePageContext).setMinPrice;

	const sortFunction = (productListSorted: Product[], sortType: Sorting): void => {
		setProductListFiltered(productListSorted);
		setSort(sortType);
	};

	const newSortFunction = (): void => {
		setProductListFiltered(productListFromContext);
		setSort(Sorting.None); 
	};

	const priceSortingLow = (): void => {
		if (sort !== Sorting.PriceLow) {
			sortFunction(
				[...productListFiltered].sort(({ price: itemPriceFirst }, { price: itemPriceSecond }) => itemPriceFirst - itemPriceSecond),
				Sorting.PriceLow,
			);
		} else {
			newSortFunction();
		}
	};

	const priceSortingHigh = (): void => {
		if (sort !== Sorting.PriceHigh) {
			sortFunction(
				[...productListFiltered].sort(({ price: itemPriceFirst }, { price: itemPriceSecond }) => itemPriceSecond - itemPriceFirst),
				Sorting.PriceHigh,
			);
		} else {
			newSortFunction();
		}
	};

	const dateSortingNew = (): void => {
		if (sort !== Sorting.DateNew) {
			sortFunction(
				[...productListFiltered].sort(
					({ date: itemDateFirst }, { date: itemDateSecond }) => new Date(itemDateSecond).getTime() - new Date(itemDateFirst).getTime(),
				),
				Sorting.DateNew,
			);
		} else {
			newSortFunction();
		}
	};

	const dateSortingOld = (): void => {
		if (sort !== Sorting.DateOld) {
			sortFunction(
				[...productListFiltered].sort(
					({ date: itemDateFirst }, { date: itemDateSecond }) => new Date(itemDateFirst).getTime() - new Date(itemDateSecond).getTime(),
				),
				Sorting.DateOld,
			);
		} else {
			newSortFunction();
		}
	};

	const saveInputMax = (maxRange: React.KeyboardEvent<HTMLInputElement>): void => {
		if (maxRange.key === 'Enter') {
			if (maxRange.currentTarget.value === '') {
				setMaxPriceRange(500000);
			} else {
				setMaxPriceRange(Number(maxRange.currentTarget.value));
			}
		}
	};

	const saveInputMin = (minRange: React.KeyboardEvent<HTMLInputElement>): void => {
		if (minRange.currentTarget.value === '') {
			setMinPrice(0);
		} else {
			setMinPrice(Number(minRange.currentTarget.value));
		}
	};

	return (
		<div className={styles.filterImageAndNameContainer}>
			<div className={styles.sortBy}>Sort by:</div>
			<div className={styles.priceSort}>
				<div>Price Sort:</div>
				<SortButton name={'PriceLow'} sortButtonFunction={priceSortingLow} active={sort === Sorting.PriceLow} />
				<SortButton name={'PriceHigh'} sortButtonFunction={priceSortingHigh} active={sort === Sorting.PriceHigh} />
				<InputSort name={'Max Price'} sortButtonFunction={saveInputMax} />
				<InputSort name={'Min Price'} sortButtonFunction={saveInputMin} />
			</div>
			<div className={styles.dateSort}>
				<div>Date Sort:</div>
				<SortButton name={'DateNew'} sortButtonFunction={dateSortingNew} active={sort === Sorting.DateNew} />
				<SortButton name={'DateOld'} sortButtonFunction={dateSortingOld} active={sort === Sorting.DateOld} />
			</div>
			<Categories />
			<SearchBar />
		</div>
	);
};

export default Filters;
