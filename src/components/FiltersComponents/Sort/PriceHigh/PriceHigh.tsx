import classNames from 'classnames';
import React, { useContext } from 'react';
import { productListDBContext } from '../../../../App';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../PriceHigh/PriceHigh.module.scss';

interface Sort {
	priceLow: boolean;
	priceHigh: boolean;
	dateNew: boolean;
	dateOld: boolean;
}

interface PriceHighProps {
	sort: Sort;
	setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const PriceHigh = ({ sort, setSort }: PriceHighProps): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const productListFiltered = homePageData.productListFiltered;
	const setProductListFiltered = homePageData.setProductListFiltered;
	const productListData = useContext(productListDBContext);
	const [productListFromContext] = productListData;

	const priceSortingHigh = (): void => {
		if (!sort.priceHigh) {
			setProductListFiltered([...productListFiltered].sort(({ price: itemPriceFirst }, { price: itemPriceSecond }) => itemPriceSecond - itemPriceFirst));
			for (const key in sort) {
				sort[key as keyof Sort] = false;
			}
			setSort({ ...sort, priceHigh: true });
		} else {
			setProductListFiltered(productListFromContext);
			setSort({ ...sort, priceHigh: false });
		}
	};

	return (
		<div className={styles.buttonPadding}>
			<button
				className={classNames({ [styles.buttonActive]: sort.priceHigh, [styles.buttonIsntActive]: !sort.priceHigh })}
				onClick={priceSortingHigh}
			/>
			<div className={styles.filterNames}>
				<div className={styles.filtersButton} onClick={priceSortingHigh}>
					High To Low
				</div>
			</div>
		</div>
	);
};

export default PriceHigh;
