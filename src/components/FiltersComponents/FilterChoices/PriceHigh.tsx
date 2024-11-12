import React, { useContext } from "react"
import styles from "../../../styles/Filters/Filter.module.scss";
import { HomePageContext } from "../../../Pages/HomePage";
import classNames from "classnames";
import { ProductsDataBackUp } from "../../../ProductsDataBackUp";

interface Sort{
  priceLow: boolean,
  priceHigh: boolean,
  dateNew: boolean,
  dateOld: boolean
}

interface PriceHighProps{
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const PriceHigh = ({ sort, setSort }: PriceHighProps) => {

  const homePageData = useContext(HomePageContext);

  if(!homePageData){
    throw new Error("homePageData is unavavilble");
  }

  const productList = homePageData.productList;
  const setProductList = homePageData.setProductList;


    const priceSortingHigh = () => {
      if(!sort.priceHigh){
        setProductList([...productList].sort(
          ({ price: itemPriceFirst }, { price: itemPriceSecond }) =>
            itemPriceSecond - itemPriceFirst
        )
      );
        setSort({...sort, priceHigh: true, priceLow: false, dateNew: false, dateOld: false})
      }
      else{
        setProductList(ProductsDataBackUp);
        setSort({...sort, priceHigh: false})
      }
    };
      
    return (
      <div className={styles.buttonPadding}>
      <button
        className={classNames({[styles.buttonActive]: sort.priceHigh, [styles.buttonIsntActive]: !sort.priceHigh})}
        onClick={priceSortingHigh}
      >
        </button>
          <div className={styles.filterNames}><span className={styles.filtersButton} onClick={priceSortingHigh}>High To Low</span></div>
        </div>
    )
}

export default PriceHigh;