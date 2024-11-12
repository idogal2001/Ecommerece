import React, { useContext } from "react";
import styles from "../../../styles/Filters/Filter.module.scss";
import { HomePageContext } from "../../../Pages/HomePage";


const InputMin = () => {

  const homePageData = useContext(HomePageContext);

  if(!homePageData){
    throw new Error("homePageData is unavavilble");
  }

  const setMinPrice = homePageData.setMinPrice;
    
    const saveInputMin = (minRange: React.KeyboardEvent<HTMLInputElement>) => {
        if (minRange.key === "Enter") {
            setMinPrice(Number(minRange.currentTarget.value));
        }
      };

    return (
        <input
        className={styles.rangePriceInput}
        type="number"
        placeholder="Min Price"
        name="Min Price"
        onKeyDown={saveInputMin}
      />
    )
}

export default InputMin;