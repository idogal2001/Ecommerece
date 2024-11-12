import React from "react";
import { useContext } from "react";
import { amountContext, productListContext } from "../../App";
import styles from "../../styles/CartPage/CartPage.module.scss";

interface Product {
    id: number;
    image: string;
    description: string;
    name: string;
    price: number;
    amount: number;
  }

interface DelteItemFromCart {
    priceOfList: number;
    setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
    id: number;
}

const DelteItemFromCart = ({ priceOfList, setPriceOfList, id}: DelteItemFromCart) => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [amount, setAmount] = amountData;

    const productListData = useContext(productListContext);

    if (!productListData) {
      throw new Error("productListContext is not provided");
    }
  
    const [productNewList, setProductNewList] = productListData;

    const removeItem = (id: number) => {
        const itemInfo: Product | undefined = productNewList.find((product) => product.id === id)
        if(itemInfo){
            const removedAmount: number = itemInfo.amount;
            const filteredProductList: Product[] = productNewList.filter((product) => product.id !== id)
            setAmount(amount - removedAmount);
            setPriceOfList(priceOfList - removedAmount * itemInfo.price);
            setProductNewList(filteredProductList);
        }
    }

    return(
        <button className={styles.itemButton} onClick={() => removeItem(id)}>X</button>
    )
}

export default DelteItemFromCart;