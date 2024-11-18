import classNames from 'classnames';
import React, { useContext } from 'react';
import { productListDBContext } from '../../../../App';
import { HomePageContext } from '../../../../Pages/HomePage/HomePage';
import styles from '../DateNew/DateNew.module.scss';


interface Sort {
	priceLow: boolean;
	priceHigh: boolean;
	dateNew: boolean;
	dateOld: boolean;
}

interface DateNewProps {
	sort: Sort;
	setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const DateNew = ({ sort, setSort }: DateNewProps): JSX.Element => {
	const homePageData = useContext(HomePageContext);
	const productListFiltered = homePageData.productListFiltered;
	const setProductListFiltered = homePageData.setProductListFiltered;
	const productListData = useContext(productListDBContext);
	const [productListFromContext] = productListData;

	const dateSortingNew = (): void => {
		if (!sort.dateNew) {
			setProductListFiltered(
				[...productListFiltered].sort(
					({ upload_date: itemDateFirst }, { upload_date: itemDateSecond }) => new Date(itemDateSecond).getTime() - new Date(itemDateFirst).getTime(),
				),
			);
			for (const key in sort) {
				sort[key as keyof Sort] = false;
			}
			setSort({ ...sort, dateNew: true });
			
		} else {
			setProductListFiltered(productListFromContext);
			setSort({ ...sort, dateNew: false });
		}
	};

	return (
		<div className={styles.buttonPadding}>
			<button
				className={classNames({ [styles.buttonActive]: sort.dateNew, [styles.buttonIsntActive]: !sort.dateNew })}
				onClick={dateSortingNew}
			/>
			<div className={styles.filterNames}>
				<div className={styles.filtersButton} onClick={dateSortingNew}>
					Newest To Oldest
				</div>
			</div>
		</div>
	);
};

export default DateNew;
