import styles from './CartPageButton.module.scss';
import type { Product } from '../../../Interfaces/Product';

interface CartPageButtonProps {
    product: Product;
	name: string;
	buttonFunction: (product: Product) => void;
}

const CartPageButton = ({ product, name, buttonFunction }: CartPageButtonProps): JSX.Element => (
		<button className={styles.itemButton} onClick={() => buttonFunction(product)}>
			{name}
		</button>
	);
export default CartPageButton;
