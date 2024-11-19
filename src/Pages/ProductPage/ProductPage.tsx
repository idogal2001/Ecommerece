import React, { useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productListDBContext, productDBCategoriesContext } from '../../Context/Context';
import Query from '../../ServerData/Query/Query';
import Navbar from '../../components/Navbar/Navbar';
import AddItemProductPage from '../../components/ProductPageComponents/AddItemProductPage/AddItemProductPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from '../ProductPage/ProductPage.module.scss';
import type { Product } from '../../Interfaces/Product';


const ProductPage = (): JSX.Element => {
	const { id } = useParams<string>();
	const [productListDB, setProductListDB] = useContext(productListDBContext);
	const [, setProductCategories] = useContext(productDBCategoriesContext);

	if(productListDB.length === 0){
		return(<Query setProductCategories={setProductCategories} setProductListDB={setProductListDB} />);
	}

	const productInfo = productListDB.filter((product: Product) => product.id === Number(id))[0];
	if(!productInfo){
		return <NotFoundPage />
	}
	
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [priceTotal, setPriceTotal] = useState<number>(productInfo.price);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [itemAmount, setItemAmount] = useState<number>(1);
	// eslint-disable-next-line react-hooks/rules-of-hooks
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

	return (
		<div className={styles.productPage}>
			<Navbar />
			<div className={styles.webContainerProduct}>
				<div className={styles.productInfo}>
					<img className={styles.img} src={productInfo.imageUrl} alt='Product' />
					<div>{productInfo.name}</div>
					<div>Category: {productInfo.sellerName}</div>
					<div>Price: {productInfo.price}₪</div>
					<div className={styles.descriptionPadding}>Description: {productInfo.description}</div>
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
					<AddItemProductPage product={productInfo} allowAdd={allowAdd} itemAmount={itemAmount} />
					<Link to='/'>
						<div>Continue shopping :)</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
