import React from "react";
import { useContext } from "react";
import { amountContext, productListContext } from "../../App";
import styles from '../../styles/Global.module.scss';

interface AddProductProps {
    id: number
    image: string;
    description: string;
    name: string;
    price: number;
  }
  
  interface Product {
    id: number;
    image: string;
    description: string;
    name: string;
    price: number;
    amount: number;
  }

const AddProduct = ({  id, image, description, name, price }: AddProductProps) => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [amount, setAmount] = amountData;

    const productListData = useContext(productListContext);

    if (!productListData) {
      throw new Error('productListContext is not provided');
    }

    const [productNewList, setProductNewList] = productListData;

    const addProduct = (
        product: Product[],
        setProduct: React.Dispatch<React.SetStateAction<Product[]>>,
        id: number,
        image: string,
        description: string,
        name: string,
        price: number
      ) => {    
        const currentProduct = productNewList.find((product: Product) => product.id === id);
        if (!currentProduct) {
          const productData: Product = {id, image, description, name, price, amount: 1}
          setProductNewList([...productNewList, productData]);
          setAmount(amount + 1);
        }
        else if (currentProduct.amount < 20) {
          const productData: Product[] = productNewList.map((item) => item.id === id ? { ...item, amount: item.amount + 1 } : item)
          setProductNewList(productData)
          setAmount(amount + 1);
        }  else {
              alert("please choose less then 20 products");
            }
          };

    return(
        <div className={styles.addCartButtonFlex}>
        <button
          className={styles.addCartButtonProductPage}
          onClick={() =>
            addProduct(
              productNewList,
              setProductNewList,
              id,
              image,
              description,
              name,
              price
            )
          }
        >
          add to cart
        </button>
      </div>
    )
}

export default AddProduct;