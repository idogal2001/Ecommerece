import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import React from 'react';
import { productListContext, amountContext } from '../App';
import AddItemCartPage from '../components/CartPageComponents/AddItemCartPage';
import RemoveItemFromCart from '../components/CartPageComponents/RemoveItemFromCart';
import DeleteItemFromCart from '../components/CartPageComponents/DeleteItemCartPage';
import PopUp from '../components/CartPageComponents/PopUp';
import styles from '../styles/CartPage/CartPage.module.scss'

interface Product {
    id: number;
    image: string;
    description: string;
    name: string;
    price: number;
    amount: number;
  }
  
const CartList = () => {

    const productListData = useContext(productListContext);

    if (!productListData) {
      throw new Error("productListContext is not provided");
    }
  
    const [productNewList, setProductNewList] = productListData;

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [, setAmount] = amountData;

    const [priceOfList, setPriceOfList] = useState<number>(0);
    const [popUp, setPopUp] = useState<boolean>(false)
    const [popUpList, setPopUpList] = useState<Product[]>([]);


    useEffect(() => {
        const priceTotalData: number = productNewList.reduce((acc: number, product: Product) => {return acc + product.amount * product.price;}, 0)
        setPriceOfList(priceTotalData);
    }, [])

    const checkOut =() => {
        if(productNewList.length !== 0){
            setPopUp(!popUp);
            setPopUpList(productNewList)
            setProductNewList([]);
            setAmount(0);
            setPriceOfList(0);
        }
    }

    return (
        <>
        <Navbar />
        <div className={styles.webContainerCart}>
            <Link to="/"><span className={styles.linkToHomePage}>Continue shopping :)</span></Link>
            <div className={styles.cartListContainer}>
            {productNewList.map((product: Product) => (
                <span className={styles.itemBox} key={product.id}>
                    <span className={styles.leftSideCartContainer}>
                        <div className={styles.nameDescriptionFlex}><div className={styles.imgPadding}><Link to={`/ProductPage/${product.id}`}><img className={styles.img} alt = {`product${product.id}`} src = {product.image}></img></Link></div><div className={styles.nameAndDesPadding}><div className={styles.nameAndDes}>{product.name} <div className={styles.itemDes}>{product.description}...</div></div></div></div>
                    </span>
                        <span className={styles.rightSideCartContainer}>{product.price * product.amount}₪ {product.amount}
                            <AddItemCartPage 
                            priceOfList={priceOfList}
                            setPriceOfList={setPriceOfList}
                            id={product.id}
                            />
                            <RemoveItemFromCart 
                            priceOfList={priceOfList}
                            setPriceOfList={setPriceOfList}
                            id={product.id}
                            />
                            <DeleteItemFromCart 
                            priceOfList={priceOfList}
                            setPriceOfList={setPriceOfList}
                            id={product.id}
                            />
                        </span>
                </span>
            ))}
            </div>
            <span>Total Price: {priceOfList}₪</span>   
            <button className={styles.checkOutButton} onClick={checkOut}>Check Out</button>
        </div>
        {popUp && (
        <PopUp productNewList={popUpList} popUp={popUp} setPopUp={setPopUp}/>
        )}
        </>
    )
}

export default CartList;