import classNames from 'classnames';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { amountContext, cartProductListContext} from '../../Context/Context';
import CartPageButton from '../../components/CartPageComponents/CartPageButton/CartPageButton';
import PopUp from '../../components/CartPageComponents/PopUp/PopUp';
import Navbar from '../../components/Navbar/Navbar';
import styles from '../CartPage/CartList.module.scss';
import type { Product } from '../../Interfaces/Product';

const CartList = (): JSX.Element => {
	const [cartProductList, setCartProductList] = useContext(cartProductListContext);
	const [amount, setAmount] = useContext(amountContext);
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

	const changingProduct = (product: Product, amountPr: number): void => {
		const updatedProductList: Product[] = cartProductList.map((cartProduct: Product) => {
			if (product === cartProduct) {
				return { ...cartProduct, amount: amountPr };
			} else {
				return cartProduct;
			}
		});
		setCartProductList(updatedProductList);
	};

	const addingItem = (product: Product): void => {
		if (product.amount === 20) {
			alert('If you need to buy more then 20 please come to the store in person! Sorry!');
		} else {
			changingProduct(product, product.amount + 1);
		}
	};

	const removingItem = (product: Product): void => {
		if (product.amount === 1) {
			removeItemFromCartList(product);
		} else {
			changingProduct(product, product.amount - 1);
		}
	};

	const removeItemFromCartList = (pr: Product): void => {
		if (pr) {
			const filteredProductList: Product[] = cartProductList.filter(product => product !== pr);
			setCartProductList(filteredProductList);
		}
	};

	const buttonConfig = [
		{ name: '+', action: addingItem},
		{name: '-', action: removingItem},
		{name: 'X', action: removeItemFromCartList},
	]

	return (
		<>
			<Navbar />
			<div className={styles.webContainerCart}>
				<Link to='/'>
					<div>Continue shopping :)</div>
				</Link>
				<div className={styles.cartListContainer}>
					{cartProductList.map((product: Product) => (
						<div className={styles.itemBox} key={product.id}>
							<div className={styles.leftSideCartContainer}>
								<div className={styles.nameDescriptionFlex}>
									<div className={styles.imgPadding}>
										<Link to={`/ProductPage/${product.id}`}>
											<img className={styles.img} alt={`product${product.id}`} src={product.imageUrl} />
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
								{buttonConfig.map((button): JSX.Element => (<CartPageButton key={button.name} product={product} name={button.name} buttonFunction={button.action}/>))}
							</div>
						</div>
					))}
				</div>
				<div>Total Price: {priceOfList}₪</div>
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