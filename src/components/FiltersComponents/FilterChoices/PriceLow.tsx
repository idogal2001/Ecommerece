import React, { useContext } from "react";
import styles from "../../../styles/Filters/Filter.module.scss";
import { HomePageContext } from "../../../Pages/HomePage";
import { ProductsDataBackUp } from "../../../ProductsDataBackUp";
import classNames from "classnames";

interface Sort{
  priceLow: boolean,
  priceHigh: boolean,
  dateNew: boolean,
  dateOld: boolean
}

interface PriceLowProps{
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const PriceLow = ({ sort, setSort }: PriceLowProps) => {

  const homePageData = useContext(HomePageContext);

  if(!homePageData){
    throw new Error("homePageData is unavavilble");
  }

  const productList = homePageData.productList;
  const setProductList = homePageData.setProductList;

    const priceSortingLow = () => {
      if(!sort.priceLow){
        setProductList([...productList].sort(
          ({ price: itemPriceFirst }, { price: itemPriceSecond }) =>
            itemPriceFirst - itemPriceSecond
        ));
        setSort({...sort, priceLow: true, priceHigh: false, dateNew: false, dateOld: false})
      }
      else{
        setProductList(ProductsDataBackUp);
        setSort({...sort, priceLow: false})
      }
      };
      
    return (
        <div className={styles.buttonPadding}>
        <button
          className={classNames({[styles.buttonActive]: sort.priceLow, [styles.buttonIsntActive]: !sort.priceLow})}
          onClick={priceSortingLow}
        >
          </button>
        <div className={styles.filterNames}><span className={styles.filtersButton} onClick={priceSortingLow}>Low To High</span></div>
      </div>
    )
}

export default PriceLow;