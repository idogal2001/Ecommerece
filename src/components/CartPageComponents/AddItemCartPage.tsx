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

interface AddItemCartPageProps {
    priceOfList: number;
    setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
    id: number;
}

const AddItemCartPage = ({ priceOfList, setPriceOfList, id}: AddItemCartPageProps) => {

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

    const addingItem = (id: number) => {
        const currentProduct = productNewList.find((product: Product) => product.id === id);
        if(currentProduct){
            if(currentProduct.amount === 20){
                alert("If you need to buy more then 20 please come to the store in person! Sorry!")
            }
            else{
                const updatedProductList: Product[] = productNewList.map((product: Product) => {
                    if(product.id === id){
                      return {...product, amount: currentProduct.amount + 1};
                    }
                    else{
                      return product;
                    }
                  })
                    setPriceOfList(priceOfList + currentProduct.price);
                    setAmount(amount + 1)
                    setProductNewList(updatedProductList);
            }
        }
    }
    
    return(
        <button className={styles.itemButton} onClick={() => addingItem(id)}>+</button>
    )
}

export default AddItemCartPage;