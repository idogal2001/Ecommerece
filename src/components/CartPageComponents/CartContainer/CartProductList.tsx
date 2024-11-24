import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { cartProductListContext } from '../../../Context/Context';
import CartPageButton from '../CartPageButton/CartPageButton';
import styles from './CartProductList.module.scss';
import type { Product } from '../../../Interfaces/Product';

interface CartProductListProps {
	productList: Product[];
	popUpCondition: boolean;
}

export enum Actions {
	AddItem = 'addItem',
	RemoveItem = 'removeItem',
	RemoveItemFromCart = 'removeItemFromCart',
}

interface ProductAction {
	actionFunction: (products: Product) => void;
}

const CartProductList = ({ productList, popUpCondition }: CartProductListProps): JSX.Element => {
	const { cartProductList, setCartProductList } = useContext(cartProductListContext);

	const ActionRecord: Record<Actions, ProductAction> = {
		addItem: {
			actionFunction: (product: Product): void => {
				if (product.amount === 20) {
					alert('If you need to buy more then 20 please come to the store in person! Sorry!');
				} else {
					changingProduct(product, product.amount + 1);
				}
			},
		},
		removeItem: {
			actionFunction: (product: Product): void => {
				if (product.amount === 1) {
					ActionRecord.removeItemFromCart.actionFunction(product);
				} else {
					changingProduct(product, product.amount - 1);
				}
			},
		},
		removeItemFromCart: {
			actionFunction: (productRemoved: Product): void => {
				if (productRemoved) {
					const filteredProductList: Product[] = cartProductList.filter(product => product !== productRemoved);
					setCartProductList(filteredProductList);
				}
			},
		},
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

	const buttonConfig = [
		{ name: '+', action: ActionRecord.addItem.actionFunction },
		{ name: '-', action: ActionRecord.removeItem.actionFunction },
		{ name: 'X', action: ActionRecord.removeItemFromCart.actionFunction },
	];

	return (
		<div>
			{productList.map((product: Product) => (
				<div className={styles.itemBox} key={product.id}>
					<div className={styles.leftSideCartContainer}>
						<div className={styles.nameDescriptionFlex}>
							<div className={styles.imgPadding}>
								{popUpCondition ? (
									<img className={styles.img} alt={`product${product.id}`} src={product.imageUrl} />
								) : (
									<Link to={`/ProductPage/${product.id}`}>
										<img className={styles.img} alt={`product${product.id}`} src={product.imageUrl} />
									</Link>
								)}
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
						{popUpCondition
							? null
							: buttonConfig.map(
									(button: { name: string; action: (product: Product) => void }): JSX.Element => (
										<CartPageButton key={button.name} product={product} name={button.name} buttonFunction={button.action} />
									),
							  )}
					</div>
				</div>
			))}
		</div>
	);
};
export default CartProductList;
