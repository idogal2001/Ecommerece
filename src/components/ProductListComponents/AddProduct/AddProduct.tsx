import React, { useContext } from 'react';
import { amountContext, newProductListContext } from '../../../App';
import styles from '../../GlobalProductBox/Global.module.scss';
import type { Category } from '../../../Category';
import type { Product } from '../../../Product';

// eslint-disable-next-line @typescript-eslint/naming-convention
const AddProduct = ({ id, image_url, description, name, price, upload_date, seller_name, categories}: Product): JSX.Element => {
	const amountData = useContext(amountContext);
	const [amount, setAmount] = amountData;
	const productListData = useContext(newProductListContext);
	const [productNewList, setProductNewList] = productListData;

	const addProduct = (
		product: Product[],
		setProduct: React.Dispatch<React.SetStateAction<Product[]>>,
		id: number,
		image: string,
		description: string,
		name: string,
		price: number,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		upload_date: string,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		seller_name: string,
		categories: Category[],
	): void => {
		const currentProduct = productNewList.find((product: Product) => product.id === id);
		if (!currentProduct) {
			const productData: Product = { id, image_url, description, name, upload_date, seller_name, price, categories, amount: 1 };
			setProductNewList([...productNewList, productData]);
			setAmount(amount + 1);
		} else if (currentProduct.amount < 20) {
			const productData: Product[] = productNewList.map(item => (item.id === id ? { ...item, amount: item.amount + 1 } : item));
			setProductNewList(productData);
			setAmount(amount + 1);
		} else {
			alert('please choose less then 20 products');
		}
	};

	return (
		<div className={styles.addCartButtonFlex}>
			<button
				className={styles.addCartButtonProductPage}
				onClick={() => addProduct(productNewList, setProductNewList, id, image_url, description, name, price, upload_date, seller_name, categories)}
			>
				add to cart
			</button>
		</div>
	);
};

export default AddProduct;
