import React, { useContext } from 'react';
import { amountContext, newProductListContext } from '../../../App';
import styles from '../DeleteItemCartPage/DeleteItemCartPage.module.scss'
import type { Product } from '../../../Product';

interface DelteItemFromCartProps {
	priceOfList: number;
	setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
	id: number;
}

const DelteItemFromCart = ({ priceOfList, setPriceOfList, id }: DelteItemFromCartProps): JSX.Element => {
	const amountData = useContext(amountContext);
	const [amount, setAmount] = amountData;
	const productListData = useContext(newProductListContext);
	const [newProductList, setNewProductList] = productListData;

	const removeItem = (id: number): void => {
		const itemInfo: Product | undefined = newProductList.find(product => product.id === id);
		if (itemInfo) {
			const removedAmount: number = itemInfo.amount;
			const filteredProductList: Product[] = newProductList.filter(product => product.id !== id);
			setAmount(amount - removedAmount);
			setPriceOfList(priceOfList - removedAmount * itemInfo.price);
			setNewProductList(filteredProductList);
		}
	};

	return (
		<button className={styles.itemButton} onClick={() => removeItem(id)}>
			X
		</button>
	);
};

export default DelteItemFromCart;
