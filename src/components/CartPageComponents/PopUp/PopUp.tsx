import React from 'react';
import styles from '../PopUp/PopUp.module.scss';
import type { Product } from '../../../Product';

interface PopUpProps {
	productNewList: Product[];
	popUp: boolean;
	setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp = ({ productNewList, popUp, setPopUp }: PopUpProps): JSX.Element => {
	const checkOut = (): void => {
		setPopUp(!popUp);
	};

	return (
		<div className={styles.popUpBackground}>
			<div className={styles.popUp}>
				<div className={styles.checkOutBox}>
					{productNewList.map((product: Product) => (
						<div className={styles.itemBox} key={product.id}>
							<div className={styles.imgPadding}>
								<img className={styles.img} alt={`product${product.id}`} src={product.image_url}/>
							</div>
							<div className={styles.nameAndDesPadding}>
								<div className={styles.nameAndDes}>
									{product.description} <div className={styles.itemDes}>{product.name}... </div>
								</div>
								<div className={styles.price}>
									{product.price * product.amount}
									{'₪'}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.checkOutButtonPadding}>
				<button className={styles.checkOutButton} onClick={checkOut}>
					Close!
				</button>
			</div>
		</div>
	);
};

export default PopUp;
