import React, { useContext } from "react";
import { amountContext, productListContext } from "../App";
import styles from "../styles/ProductPage/ProductPage.module.scss"

interface AddItemProductPageProps {
  id: number;
  image: string;
  description: string;
  name: string;
  price: number;
  itemAmount: number;
  allowAdd: boolean;
}

interface Product {
  id: number;
  image: string;
  description: string;
  name: string;
  price: number;
  amount: number;
}

const AddItemProductPage = ({
  id,
  image,
  description,
  name,
  price,
  itemAmount,
  allowAdd,
}: AddItemProductPageProps) => {
  const amountData = useContext(amountContext);

  if (!amountData) {
    throw new Error("amountContext is not provided");
  }

  const [amount, setAmount] = amountData;

  const productListData = useContext(productListContext);

  if (!productListData) {
    throw new Error("productListContext is not provided");
  }

  const [productNewList, setProductNewList] = productListData;

  const addProduct = (
    id: number,
    image: string,
    description: string,
    name: string,
    price: number,
    itemAmount: number
  ) => {
    const itemInfo: Product = {
      id,
      image,
      description,
      name,
      price,
      amount: itemAmount,
    };

    if (allowAdd) {
      const existingProduct = productNewList.find((product) => product.id === id);
      if (!existingProduct) {
        setProductNewList([...productNewList, itemInfo]);
        setAmount(amount + itemAmount);
      } else {
        if(existingProduct.amount + itemAmount > 20){
          alert("pls less then 20")
        }
        else{
          const updatedProductList: Product[] = productNewList.map((product: Product) => {
            if(product.id === id){
              return {...product, amount: existingProduct.amount + itemAmount};
            }
            else{
              return product;
            }
          })
          setProductNewList(updatedProductList);
          setAmount(amount + itemAmount);
        }
      }
    }
  };

  return (
    <div className={styles.addCartButtonPadding}>
      <button
        className={styles.addCartButton}
        onClick={() => addProduct(id, image, description, name, price, itemAmount)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddItemProductPage;

