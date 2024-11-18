import React, { useContext } from 'react';
import { amountContext, newProductListContext } from '../../../App';
import styles from '../AddItemProductPage/AddItemProductPage.module.scss';
import type { Category } from '../../../Category';
import type { Product } from '../../../Product';

interface AddItemProductPageProps {
	id: number;
	image_url: string;
	description: string;
	name: string;
	price: number;
	itemAmount: number;
	upload_date: string;
	seller_name: string;
	categories: Category[];
	allowAdd: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AddItemProductPage = ({ id, image_url, description, name, price, itemAmount, upload_date, seller_name, categories, allowAdd }: AddItemProductPageProps): JSX.Element => {
	const amountData = useContext(amountContext);
	const [amount, setAmount] = amountData;
	const productListData = useContext(newProductListContext);
	const [newProductList, setNewProductList] = productListData;

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const addProduct = (id: number, image_url: string, description: string, name: string, price: number, itemAmount: number, upload_date: string, seller_name: string, categories: Category[]): void => {
		const itemInfo: Product = {
			id,
			image_url,
			description,
			name,
			price,
			seller_name,
			upload_date,
			categories,
			amount: itemAmount,
		};

		if (allowAdd) {
			const existingProduct = newProductList.find(product => product.id === id);
			if (!existingProduct) {
				setNewProductList([...newProductList, itemInfo]);
				setAmount(amount + itemAmount);
			} else {
				if (existingProduct.amount + itemAmount > 20) {
					alert('pls less then 20');
				} else {
					const updatedProductList: Product[] = newProductList.map((product: Product) => {
						if (product.id === id) {
							return { ...product, amount: existingProduct.amount + itemAmount }
						} else {
							return product;
						}
					});
					setNewProductList(updatedProductList);
					setAmount(amount + itemAmount);
				}
			}
		}
	};

	return (
		<div className={styles.addCartButtonPadding}>
			<button className={styles.addCartButton} onClick={() => addProduct(id, image_url, description, name, price, itemAmount, upload_date, seller_name, categories)}>
				Add To Cart
			</button>
		</div>
	);
};

export default AddItemProductPage;
