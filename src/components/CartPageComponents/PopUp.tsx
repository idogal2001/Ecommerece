import React from "react"
import styles from '../../styles/CartPage/PopUp.module.scss'

interface Product {
    id: number;
    image: string;
    description: string;
    name: string;
    price: number;
    amount: number;
  }

interface PopUpProps {
    productNewList: Product[];
    popUp: boolean;
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp = ({ productNewList, popUp, setPopUp }: PopUpProps) => {

    const checkOut =() => {
        setPopUp(!popUp);
    }

    return(
        <div className={styles.popUpBackground}>
        <div className={styles.popUp}>
        <p className={styles.checkOutBox}>
        {productNewList.map((product: Product) => (
        <div className={styles.itemBox} key={product.id}><div className={styles.imgPadding}><img className={styles.img} alt = {`product${product.id}`} src = {product.image}></img></div><div className={styles.nameAndDesPadding}><div className={styles.nameAndDes}>{product.name} <div className={styles.itemDes}>{product.description}... </div></div><div className={styles.price}>{product.price * product.amount}{'₪'}</div></div></div>
        ))}
        </p>
        </div>
        <div className={styles.checkOutButtonPadding}><button className={styles.checkOutButton} onClick={checkOut}>Close!</button></div>
    </div>
    )
}

export default PopUp;