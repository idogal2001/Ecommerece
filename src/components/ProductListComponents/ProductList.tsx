import { Link } from "react-router-dom";
import React, { useContext } from "react";
import AddProduct from "./AddProduct";
import styles from '../../styles/Global.module.scss';
import { HomePageContext } from "../../Pages/HomePage";

const ProductList = () => {

  const homePageData = useContext(HomePageContext);

  if (!homePageData) {
    throw new Error('amountContext is not provided');
  }

  const search = homePageData.search;
  const categoryFilter = homePageData.categories;
  const maxPriceRange = homePageData.maxPriceRange;
  const minPriceRange = homePageData.minPrice;
  let productList = homePageData.productList;

    productList = productList.filter(({ name: itemName }) => {
    if (search === undefined) {
      return true;
    } else {
      let count = 0;
      for (let i = 0; i < search.length; i++) {
        if (itemName.length < search.length) {
          return false;
        }
        if (search[i].toLowerCase() === itemName[i].toLowerCase()) {
          count++;
        }
      }
      if (count === search.length) {
        return true;
      }
      return false;
    }
  });

  if (productList.length === 0) {
    return <h1 className={styles.notInStock}>Not in stock</h1>;
  }

  if (minPriceRange != undefined) {
    productList = productList.filter(
      ({ price: itemPrice }) => itemPrice >= minPriceRange
    );
  }
  if (maxPriceRange != undefined) {
    productList = productList.filter(
      ({ price: itemPrice }) => itemPrice <= maxPriceRange
    );
  }

  if (categoryFilter.length > 0) {
    productList = productList.filter(({ category: itemCategory }) =>
      categoryFilter.includes(itemCategory)
    );
  }

  return (
    <div className={styles.productList}>
      {productList.map((product) => (
        <div className={styles.productBox} key={product.id}>
          <Link to={`/ProductPage/${product.id}`}>
          <div className={styles.imageContainer}>
            <p>
              <img
                className={styles.image}
                alt={`product${product.id}`}
                src={product.image}
              ></img>
            </p>
          </div>
          </Link>
          <p className={styles.productName}>Name: {product.name}</p>
          <p>Date: {product.date}</p>
          <p>Price: {product.price}₪</p>
          <p className={styles.description}>description: {product.description}</p>
          <AddProduct 
          id={product.id} 
          image={product.image} 
          description={product.description}
          name={product.name}
          price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;