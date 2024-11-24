import classNames from 'classnames';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { amountContext, cartProductListContext } from '../../Context/Context';
import CartProductList from '../../components/CartPageComponents/CartContainer/CartProductList';
import PopUp from '../../components/CartPageComponents/PopUp/PopUp';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../CartPage/CartList.module.scss';
import type { Product } from '../../Interfaces/Product';

const CartList = (): JSX.Element => {
	const { cartProductList, setCartProductList } = useContext(cartProductListContext);
	const { amount, setAmount } = useContext(amountContext);
	const [priceOfList, setPriceOfList] = useState<number>(0);
	const [popUp, setPopUp] = useState<boolean>(false);
	const [popUpList, setPopUpList] = useState<Product[]>([]);

	useEffect(() => {
		const priceTotalData: number = cartProductList.reduce((acc: number, product: Product) => acc + product.amount * product.price, 0);
		setPriceOfList(priceTotalData);
		setAmount(cartProductList.reduce((acc: number, product: Product) => acc + product.amount, 0));
	}, [amount, cartProductList, setAmount]);

	const checkOut = (): void => {
		if (cartProductList.length !== 0) {
			setPopUp(!popUp);
			setPopUpList(cartProductList);
			setCartProductList([]);
			setAmount(0);
			setPriceOfList(0);
		}
	};

	return (
		<>
			<Navbar />
			<div className={styles.webContainerCart}>
				<Link to='/'>Continue shopping :)</Link>
				<div className={styles.cartListContainer}>
					<CartProductList productList={cartProductList} popUpCondition={false}/>
				</div>
				Total Price: {priceOfList}₪
				<button
					className={classNames({ [styles.checkOutButtonActive]: priceOfList !== 0, [styles.checkOutButtonIsntActive]: priceOfList === 0 })}
					onClick={checkOut}
				>
					Check Out
				</button>
			</div>
			{popUp && <PopUp productNewList={popUpList} popUp={popUp} setPopUp={setPopUp} />}
		</>
	);
};

export default CartList;
