import React, { useContext } from 'react';
import { amountContext, newProductListContext } from '../../../App';
import styles from '../AddItemCartPage/AddItemCartPage.module.scss';
import type { Product } from '../../../Product';

interface AddItemCartPageProps {
	priceOfList: number;
	setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
	id: number;
}

const AddItemCartPage = ({ priceOfList, setPriceOfList, id }: AddItemCartPageProps): JSX.Element => {
	const amountData = useContext(amountContext);
	const [amount, setAmount] = amountData;
	const productListData = useContext(newProductListContext);
	const [newProductList, setNewProductList] = productListData;

	const addingItem = (id: number): void => {
		const currentProduct = newProductList.find((product: Product) => product.id === id);
		if (currentProduct) {
			if (currentProduct.amount === 20) {
				alert('If you need to buy more then 20 please come to the store in person! Sorry!');
			} else {
				const updatedProductList: Product[] = newProductList.map((product: Product) => {
					if (product.id === id) {
						return { ...product, amount: currentProduct.amount + 1 };
					} else {
						return product;
					}
				});
				setPriceOfList(priceOfList + currentProduct.price);
				setAmount(amount + 1);
				setNewProductList(updatedProductList);
			}
		}
	};

	return (
		<button className={styles.itemButton} onClick={() => addingItem(id)}>
			+
		</button>
	);
};

export default AddItemCartPage;
