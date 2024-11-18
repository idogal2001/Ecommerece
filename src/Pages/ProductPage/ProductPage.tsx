import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productListDBContext } from '../../App'; 
import Navbar from '../../components/Navbar/Navbar';
import AddItemProductPage from '../../components/ProductPageComponents/AddItemProductPage/AddItemProductPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from '../ProductPage/ProductPage.module.scss';
import type { Product } from '../../Product';

const ProductPage = (): JSX.Element => {
	const { id } = useParams<string>();

	const productListData = useContext(productListDBContext);
	const [productListDB] = productListData;
	const productData = productListDB.filter((product: Product) => product.id === Number(id));
	const productInfo: Product = productData[0]; 
	const [priceTotal, setPriceTotal] = useState<number>(productInfo.price);
	const [itemAmount, setItemAmount] = useState<number>(1);
	const [allowAdd, setAllowAdd] = useState<boolean>(true);

	const changeAmount = (value: React.FormEvent<HTMLInputElement>): void => {
		if (Number(value.currentTarget.value) > 0 && Number(value.currentTarget.value) <= 20 && Number(value.currentTarget.value) % 1 === 0) {
			setAllowAdd(true);
			setItemAmount(Number(value.currentTarget.value));
			setPriceTotal(Number(value.currentTarget.value) * productInfo.price);
		} else {
			setAllowAdd(false);
			setPriceTotal(0);
		}
	};

	if (productData.length > 0) {
		return (
			<div className={styles.productPage}>
				<Navbar />
				<div className={styles.webContainerProduct}>
					<div className={styles.productInfo}>
						<img className={styles.img} src={productInfo.image_url} alt='Product' />
						<div>{productInfo.description}</div>
						<div>Category: {productInfo.seller_name}</div>
						<div>Price: {productInfo.price}₪</div>
						<div className={styles.descriptionPadding}>Description: {productInfo.name}</div>
						<div className={styles.productAmount}>
							<input
								className={styles.itemInput}
								type='number'
								name='Amount of Item'
								defaultValue='1'
								min='1'
								max='20'
								onChange={changeAmount}
							/>
						</div>
						<div className={styles.priceOfItem}>Price: {priceTotal}₪</div>
						<AddItemProductPage
							id={productInfo.id}
							image_url={productInfo.image_url}
							description={productInfo.description}
							name={productInfo.name}
							price={productInfo.price}
							itemAmount={itemAmount}
							upload_date={productInfo.upload_date}
							seller_name={productInfo.seller_name}
							categories={productInfo.categories}
							allowAdd={allowAdd}
						/>
						<Link to='/'>
							<div>Continue shopping :)</div>
						</Link>
					</div>
				</div>
			</div>
		);
	} else {
		return <NotFoundPage />;
	}
};

export default ProductPage;