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

interface DateOldProps{
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}


const DateOld = ({ sort, setSort }: DateOldProps) => {

  const homePageData = useContext(HomePageContext);

  if(!homePageData){
    throw new Error("homePageData is unavavilble");
  }

  const productList = homePageData.productList;
  const setProductList = homePageData.setProductList;

    const dateSortingOld = () => {
      
      if(!sort.dateOld){
        setProductList([...productList].sort(
          ({ date: itemDateFirst }, { date: itemDateSecond }) =>
            new Date(itemDateFirst).getTime() - new Date(itemDateSecond).getTime()
        ));
        setSort({...sort, dateOld: true, priceLow: false, priceHigh: false, dateNew: false})
      }
      else{
        setProductList(ProductsDataBackUp);
        setSort({...sort, dateOld: false})
      }
      };

    return (
      <div className={styles.buttonPadding}>
      <button
        className={classNames({[styles.buttonActive]: sort.dateOld, [styles.buttonIsntActive]: !sort.dateOld})}
        onClick={dateSortingOld}
      >
        </button>
        <div className={styles.filterNames}><span className={styles.filtersButton} onClick={dateSortingOld}>Oldest To Newest</span></div>
      </div>
    )
}

export default DateOld;