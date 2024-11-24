import classNames from 'classnames';
import { useContext } from 'react';
import { HomePageContext, productListDBContext } from '../../../../Context/Context';
import styles from './SortButton.module.scss';
import type { Product } from '../../../../Interfaces/Product';
import type { Sorting } from '../../Filters/Filters';
import type { Dispatch, SetStateAction } from 'react';

interface SortButtonProps {
	name: string;
	sortButtonFunction: (products: Product[]) => Product[];
	isSorted: boolean;
	setCurrentSort: Dispatch<SetStateAction<Sorting | null>>;
}

const onSort = (setCurrentSort: Dispatch<SetStateAction<Sorting | null>>, isSorted: boolean, name: string): void => {
	if (isSorted) {
		setCurrentSort(null);
	} else {
		setCurrentSort(name as Sorting);
	}
};

const SortButton = ({ name, sortButtonFunction, isSorted, setCurrentSort }: SortButtonProps): JSX.Element => {
	const { productListFiltered, setProductListFiltered } = useContext(HomePageContext);
	const {productListDB} = useContext(productListDBContext);

	const sortFunction = (): void => {
		setProductListFiltered(isSorted ? productListDB : sortButtonFunction(productListFiltered));
		onSort(setCurrentSort, isSorted, name);
	};

	return (
		<div className={styles.buttonPadding}>
			<button className={classNames({ [styles.buttonActive]: isSorted, [styles.buttonIsntActive]: !isSorted })} onClick={sortFunction} />
				<div className={styles.filterNames} onClick={sortFunction}>{name}</div>
		</div>
	);
};

export default SortButton;
