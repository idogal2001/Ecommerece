import React, { useState } from "react";
import Categories from "../Categories";
import SearchBar from "../SearchBar";
import PriceLow from "./PriceLow";
import PriceHigh from "./PriceHigh";
import DateOld from "./DateOld";
import DateNew from "./DateNew";
import InputMax from "./InputMax";
import InputMin from "./InputMin";
import styles from "../../../styles/Filters/Filter.module.scss";

const Filters = () => {
  const [sort, setSort] = useState({
    priceLow: false,
    priceHigh: false,
    dateNew: false,
    dateOld: false
  });

    return (
        <div className={styles.filterImageAndNameContainer}>
      <h3 className={styles.sortBy}>Sort by:</h3>
        <div className={styles.priceSort}>
        <p>Price Sort:</p>
        <PriceLow sort={sort} setSort={setSort}/>
        <PriceHigh sort={sort} setSort={setSort}/>
        <InputMax />
        <InputMin />
      </div>
      <div className={styles.dateSort}>
        <p>Date Sort:</p>
        < DateNew sort={sort} setSort={setSort}/>
        <DateOld sort={sort} setSort={setSort}/>
      </div>
        <Categories />
        <SearchBar />
        </div>
    )
}

export default Filters;