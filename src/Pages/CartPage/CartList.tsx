import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { newProductListContext, amountContext } from '../../App';
import AddItemCartPage from '../../components/CartPageComponents/AddItemCartPage/AddItemCartPage';
import DeleteItemFromCart from '../../components/CartPageComponents/DeleteItemCartPage/DeleteItemCartPage';
import PopUp from '../../components/CartPageComponents/PopUp/PopUp';
import RemoveItemFromCart from '../../components/CartPageComponents/RemoveItemCartPage/RemoveItemFromCart';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../CartPage/CartList.module.scss';
import type { Product } from '../../Product';

const CartList = (): JSX.Element => {
	const productListData = useContext(newProductListContext);
	const [newProductList, setNewProductList] = productListData;
	const amountData = useContext(amountContext);
	const [, setAmount] = amountData;

	const [priceOfList, setPriceOfList] = useState<number>(0);
	const [popUp, setPopUp] = useState<boolean>(false);
	const [popUpList, setPopUpList] = useState<Product[]>([]);

	useEffect(() => {
		const priceTotalData: number = newProductList.reduce((acc: number, product: Product) => acc + product.amount * product.price, 0);
		setPriceOfList(priceTotalData);
	}, [newProductList]);

	const checkOut = (): void => {
		if (newProductList.length !== 0) {
			setPopUp(!popUp);
			setPopUpList(newProductList);
			setNewProductList([]);
			setAmount(0);
			setPriceOfList(0);
		}
	};

	return (
		<>
			<Navbar />
			<div className={styles.webContainerCart}>
				<Link to='/'>
					<div>Continue shopping :)</div>
				</Link>
				<div className={styles.cartListContainer}>
					{newProductList.map((product: Product) => (
						<div className={styles.itemBox} key={product.id}>
							<div className={styles.leftSideCartContainer}>
								<div className={styles.nameDescriptionFlex}>
									<div className={styles.imgPadding}>
										<Link to={`/ProductPage/${product.id}`}>
											<img className={styles.img} alt={`product${product.id}`} src={product.image_url} />
										</Link>
									</div>
									<div className={styles.nameAndDesPadding}>
										<div className={styles.nameAndDes}>
											{product.description} <div className={styles.itemDes}>{product.name}...</div>
										</div>
									</div>
								</div>
							</div>
							<div className={styles.rightSideCartContainer}>
								{product.price * product.amount}₪ {product.amount}
								<AddItemCartPage priceOfList={priceOfList} setPriceOfList={setPriceOfList} id={product.id} />
								<RemoveItemFromCart priceOfList={priceOfList} setPriceOfList={setPriceOfList} id={product.id} />
								<DeleteItemFromCart priceOfList={priceOfList} setPriceOfList={setPriceOfList} id={product.id} />
							</div>
						</div>
					))}
				</div>
				<div>Total Price: {priceOfList}₪</div>
				<button className={styles.checkOutButton} onClick={checkOut}>
					Check Out
				</button>
			</div>
			{popUp && <PopUp productNewList={popUpList} popUp={popUp} setPopUp={setPopUp} />}
		</>
	);
};

export default CartList;
