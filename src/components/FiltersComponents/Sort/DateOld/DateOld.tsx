import classNames from 'classnames';
import React, { useContext } from 'react';
import { productListDBContext } from '../../../../App';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../DateOld/DateOld.module.scss';

interface Sort {
	priceLow: boolean;
	priceHigh: boolean;
	dateNew: boolean;
	dateOld: boolean;
}

interface DateOldProps {
	sort: Sort;
	setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const DateOld = ({ sort, setSort }: DateOldProps): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const productListFiltered = homePageData.productListFiltered;
	const setProductListFiltered = homePageData.setProductListFiltered;
	const productListData = useContext(productListDBContext);
	const [productListFromContext] = productListData;

	const dateSortingOld = (): void => {
		if (!sort.dateOld) {
			setProductListFiltered(
				[...productListFiltered].sort(
					({ upload_date: itemDateFirst }, { upload_date: itemDateSecond }) => new Date(itemDateFirst).getTime() - new Date(itemDateSecond).getTime(),
				),
			);
			for (const key in sort) {
				sort[key as keyof Sort] = false;
			}
			setSort({ ...sort, dateOld: true });
		} else {
			setProductListFiltered(productListFromContext);
			setSort({ ...sort, dateOld: false });
		}
	};

	return (
		<div className={styles.buttonPadding}>
			<button
				className={classNames({ [styles.buttonActive]: sort.dateOld, [styles.buttonIsntActive]: !sort.dateOld })}
				onClick={dateSortingOld}
			/>
			<div className={styles.filterNames}>
				<div className={styles.filtersButton} onClick={dateSortingOld}>
					Oldest To Newest
				</div>
			</div>
		</div>
	);
};

export default DateOld;
