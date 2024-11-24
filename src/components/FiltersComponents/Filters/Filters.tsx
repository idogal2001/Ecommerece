import React, { useContext, useState } from 'react';
import { HomePageContext, highestPriceContext } from '../../../Context/Context';
import Categories from '../Categories/CategoriesList/CategoriesList';
import styles from '../Filters/Filters.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import InputSort from '../Sort/InputSort/InputSort';
import SortButton from '../Sort/SortButton/SortButton';
import type { Product } from '../../../Interfaces/Product';

export enum Sorting {
	PriceLow = 'priceLow',
	PriceHigh = 'priceHigh',
	DateNew = 'dateNew',
	DateOld = 'dateOld',
}

interface ProductList {
	name: string;
	sortingFunction: (products: Product[]) => Product[];
}

const SortRecord: Record<Sorting, ProductList> = {
	dateNew: {
		name: 'dateNew',
		sortingFunction: (products: Product[]): Product[] =>
			[...products].sort(
				({ date: itemDateFirst }, { date: itemDateSecond }) => new Date(itemDateSecond).getTime() - new Date(itemDateFirst).getTime(),
			),
	},
	dateOld: {
		name: 'dateOld',
		sortingFunction: (products: Product[]): Product[] =>
			[...products].sort(
				({ date: itemDateFirst }, { date: itemDateSecond }) => new Date(itemDateFirst).getTime() - new Date(itemDateSecond).getTime(),
			),
	},
	priceHigh: {
		name: 'priceHigh',
		sortingFunction: (products: Product[]): Product[] =>
			[...products].sort(({ price: itemPriceFirst }, { price: itemPriceSecond }) => itemPriceSecond - itemPriceFirst),
	},
	priceLow: {
		name: 'priceLow',
		sortingFunction: (products: Product[]): Product[] =>
			[...products].sort(({ price: itemPriceFirst }, { price: itemPriceSecond }) => itemPriceFirst - itemPriceSecond),
	},
};

const Filters = (): JSX.Element => {
	const { highestPrice } = useContext(highestPriceContext);
	const { setMaxPriceRange, setMinPriceRange } = useContext(HomePageContext);
	const [currentSort, setCurrentSort] = useState<Sorting | null>(null);

	const saveInputMax = (maxRange: React.KeyboardEvent<HTMLInputElement>): void => {
		setMaxPriceRange(
			maxRange.key === 'Enter' ? (maxRange.currentTarget.value === '' ? highestPrice : Number(maxRange.currentTarget.value)) : highestPrice,
		);
	};

	const saveInputMin = (minRange: React.KeyboardEvent<HTMLInputElement>): void => {
		setMinPriceRange(minRange.key === 'Enter' ? (minRange.currentTarget.value === '' ? 0 : Number(minRange.currentTarget.value)) : 0);
	};

	return (
		<div className={styles.filterImageAndNameContainer}>
			<div className={styles.sortBy}>Sort by:</div>
			<div className={styles.priceSort}>
				Price Sort:
				<SortButton
					name={SortRecord.priceLow.name}
					sortButtonFunction={SortRecord.priceLow.sortingFunction}
					isSorted={currentSort === Sorting.PriceLow}
					setCurrentSort={setCurrentSort}
				/>
				<SortButton
					name={SortRecord.priceHigh.name}
					sortButtonFunction={SortRecord.priceHigh.sortingFunction}
					isSorted={currentSort === Sorting.PriceHigh}
					setCurrentSort={setCurrentSort}
				/>
				<InputSort name='Max Price' sortButtonFunction={saveInputMax} />
				<InputSort name='Min Price' sortButtonFunction={saveInputMin} />
			</div>
			<div className={styles.dateSort}>
				Date Sort:
				<SortButton
					name={SortRecord.dateNew.name}
					sortButtonFunction={SortRecord.dateNew.sortingFunction}
					isSorted={currentSort === Sorting.DateNew}
					setCurrentSort={setCurrentSort}
				/>
				<SortButton
					name={SortRecord.dateOld.name}
					sortButtonFunction={SortRecord.dateOld.sortingFunction}
					isSorted={currentSort === Sorting.DateOld}
					setCurrentSort={setCurrentSort}
				/>
			</div>
			<Categories />
			<SearchBar />
		</div>
	);
};

export default Filters;
