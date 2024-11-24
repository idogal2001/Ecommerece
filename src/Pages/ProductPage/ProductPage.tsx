import { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productListDBContext, productDBCategoriesContext, highestPriceContext } from '../../Context/Context';
import Query from '../../ServerData/Query/Query';
import Navbar from '../../components/Navbar/Navbar';
import AddItemProductPage from '../../components/ProductPageComponents/AddItemProductPage/AddItemProductPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from '../ProductPage/ProductPage.module.scss';
import type { Product } from '../../Interfaces/Product';

const ProductPage = (): JSX.Element => {
    const { id } = useParams<string>();
    const { setHighestPrice } = useContext(highestPriceContext);
    const { productListDB, setProductListDB } = useContext(productListDBContext);
    const { setProductCategories } = useContext(productDBCategoriesContext);

    const productInfo = productListDB.find((product: Product) => product.id === Number(id));

    const [itemAmount, setItemAmount] = useState<number>(1);
    const [allowAdd, setAllowAdd] = useState<boolean>(true);
    const [priceTotal, setPriceTotal] = useState<number>(productInfo?.price ?? 0);

    useEffect(() => {
        if (productInfo) {
            setPriceTotal(itemAmount * productInfo.price);
        }
    }, [itemAmount, productInfo]);

    if (productListDB.length === 0) {
        return <Query setProductCategories={setProductCategories} setProductListDB={setProductListDB} setHighestPrice={setHighestPrice} />;
    }

    const changeAmount = (e: React.FormEvent<HTMLInputElement>): void => {
        const value = Number(e.currentTarget.value);

        if (value > 0 && value <= 20 && value % 1 === 0) {
            setAllowAdd(true);
            setItemAmount(value);
        } else {
            setAllowAdd(false);
            setPriceTotal(0);
        }
    };

    if (!productInfo) {
        return <NotFoundPage />;
    }

    return (
        <div className={styles.productPage}>
            <Navbar />
            <div className={styles.webContainerProduct}>
                <div className={styles.productInfo}>
                    <img className={styles.img} src={productInfo.imageUrl} alt="Product" />
                    {productInfo.name}
                    <div>Category: {productInfo.sellerName}</div>
                    <div>Price: {productInfo.price}₪</div>
                    <div className={styles.descriptionPadding}>Description: {productInfo.description}</div>
                    <div className={styles.productAmount}>
                        <input
                            className={styles.itemInput}
                            type="number"
                            name="Amount of Item"
                            defaultValue="1"
                            min="1"
                            max="20"
                            onChange={changeAmount}
                        />
                    </div>
                    <div className={styles.priceOfItem}>Price: {priceTotal}₪</div>
                    <AddItemProductPage product={productInfo} allowAdd={allowAdd} itemAmount={itemAmount} />
                    <Link to="/">Continue shopping :)</Link>
                </div>
            </div>
        </div>
    );
};



export default ProductPage;
