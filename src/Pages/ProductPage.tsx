import { Link, useParams  } from 'react-router-dom';
import { ProductsDataBackUp } from '../ProductsDataBackUp';
import React, { useState } from 'react';
import NotFoundPage from './NotFoundPage';
import Navbar from '../components/Navbar';
import AddItemProductPage from '../components/AddItemProductPage';
import styles from '../styles/ProductPage/ProductPage.module.scss';

interface product {
    category: string;
    name: string;
    date: string;
    price: number;
    description: string;
    image: string;
    id: number;
}

const ProductPage = () => {

    const { id } = useParams<string>();
    const productData: product[] = ProductsDataBackUp.filter((product: product) => product.id === Number(id));
    const productInfo: product = productData[0];
    const [priceTotal, setPriceTotal] = useState<number>(productInfo.price);
    const [itemAmount, setItemAmount] = useState<number>(1);
    const [allowAdd, setAllowAdd] = useState<boolean>(true);

    const changeAmount = (value: React.FormEvent<HTMLInputElement>) => {
                if(Number(value.currentTarget.value) > 0 && Number(value.currentTarget.value) <= 20 && (Number(value.currentTarget.value) % 1) === 0){
                    setAllowAdd(true);
                    setItemAmount(Number(value.currentTarget.value));
                    setPriceTotal((Number(value.currentTarget.value) * productInfo.price))
        }
        else{
            setAllowAdd(false);
            setPriceTotal(0);
        }
    }              

    if(Number(id) <= ProductsDataBackUp.length && Number(id) >=0){
        return (
            <div className={styles.productPage}>
            <Navbar />
            <div className={styles.webContainerProduct}>
                <div className={styles.productInfo}>
                    <img className={styles.img} src={productInfo.image} alt="Product" /> 
                    <p>{productInfo.name}</p>
                    <p>Category: {productInfo.category}</p>
                    <p>Price: {productInfo.price}₪</p>
                    <span className={styles.descriptionPadding}>Description: {productInfo.description}</span> 
                    <span className={styles.productAmount}>
                        <input className={styles.itemInput} type="number" name='Amount of Item' defaultValue="1"  min="1" max="20" onChange={changeAmount}></input>
                    </span>
                    <span  className={styles.priceOfItem}>Price: {priceTotal}₪</span>
                    <AddItemProductPage
                    id={productInfo.id}
                    image={productInfo.image}
                    description={productInfo.description}
                    name={productInfo.name}
                    price={productInfo.price}
                    itemAmount={itemAmount}
                    allowAdd={allowAdd}
                    />
                    <Link to="/"><span className={styles.linkToHomePage}>Continue shopping :)</span></Link>
                </div>
            </div>
        </div>
        );
    }
    else{
        return(
            <NotFoundPage />
            )
    }
}

export default ProductPage;