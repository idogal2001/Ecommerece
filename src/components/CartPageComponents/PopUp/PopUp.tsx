import CartProductList from '../CartContainer/CartProductList';
import styles from '../PopUp/PopUp.module.scss';
import type { Product } from '../../../Interfaces/Product';

interface PopUpProps {
	productNewList: Product[];
	popUp: boolean;
	setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp = ({ productNewList, popUp, setPopUp }: PopUpProps): JSX.Element => (
	<div className={styles.popUpBackground}>
		<div className={styles.popUp}>
			<div className={styles.checkOutBox}>
			<CartProductList productList={productNewList} popUpCondition={true}/>
			</div>
		</div>
		<div className={styles.checkOutButtonPadding}>
			<button className={styles.checkOutButton} onClick={() => setPopUp(!popUp)}>
				Close!
			</button>
		</div>
	</div>
);

export default PopUp;
