import classNames from 'classnames';
import React, { useContext } from 'react';
import { productListDBContext } from '../../../../App';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../PriceLow/PriceLow.module.scss';

interface Sort {
	priceLow: boolean;
	priceHigh: boolean;
	dateNew: boolean;
	dateOld: boolean;
}

interface PriceLowProps {
	sort: Sort;
	setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const PriceLow = ({ sort, setSort }: PriceLowProps): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const productListFiltered = homePageData.productListFiltered;
	const setProductListFiltered = homePageData.setProductListFiltered;
	const productListData = useContext(productListDBContext);
	const [productListFromContext] = productListData;

	const priceSortingLow = (): void => {
		if (!sort.priceLow) {
			setProductListFiltered(
				[...productListFiltered].sort(({ price: itemPriceFirst }, { price: itemPriceSecond }) => itemPriceFirst - itemPriceSecond),
			);
			for (const key in sort) {
				sort[key as keyof Sort] = false;
			}
			setSort({ ...sort, priceLow: true });
		} else {
			setProductListFiltered(productListFromContext);
			setSort({ ...sort, priceLow: false });
		}
	};

	return (
		<div className={styles.buttonPadding}>
			<button
				className={classNames({ [styles.buttonActive]: sort.priceLow, [styles.buttonIsntActive]: !sort.priceLow })}
				onClick={priceSortingLow}
			/>
			<div className={styles.filterNames}>
				<div className={styles.filtersButton} onClick={priceSortingLow}>
					Low To High
				</div>
			</div>
		</div>
	);
};

export default PriceLow;
