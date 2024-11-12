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

interface DateNewProps{
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const DateNew = ({ sort, setSort }: DateNewProps) => {

  const homePageData = useContext(HomePageContext);

  if(!homePageData){
    throw new Error("homePageData is unavavilble");
  }

  const productList = homePageData.productList;
  const setProductList = homePageData.setProductList;

    const dateSortingNew = () => {
      if(!sort.dateNew){
        setProductList([...productList].sort(
          ({ date: itemDateFirst }, { date: itemDateSecond }) =>
            new Date(itemDateSecond).getTime() - new Date(itemDateFirst).getTime()
        ));
        setSort({...sort, dateNew: true, priceLow: false, priceHigh: false, dateOld: false})
      }
      else{
        setProductList(ProductsDataBackUp);
        setSort({...sort, dateNew: false})
      }
      };

    return (
        <div className={styles.buttonPadding}>
      <button
        className={classNames({[styles.buttonActive]: sort.dateNew, [styles.buttonIsntActive]: !sort.dateNew})}
        onClick={dateSortingNew}
      >
        </button>
          <div className={styles.filterNames}><span className={styles.filtersButton} onClick={dateSortingNew}>Newest To Oldest</span></div>
        </div>
    )
}

export default DateNew;