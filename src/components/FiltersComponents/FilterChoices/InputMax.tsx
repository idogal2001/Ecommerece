import React, { useContext } from "react";
import styles from "../../../styles/Filters/Filter.module.scss";
import { HomePageContext } from "../../../Pages/HomePage";

const InputMax = () => {
  
  const homePageData = useContext(HomePageContext);

  if(!homePageData){
    throw new Error("homePageData is unavavilble");
  }

  const setMaxPriceRange = homePageData.setMaxPriceRange;
  
    const saveInputMax = (maxRange: React.KeyboardEvent<HTMLInputElement>) => {
        if (maxRange.key === "Enter") {
          setMaxPriceRange(Number(maxRange.currentTarget.value));
        }
      };

    return (
        <input
        className={styles.rangePriceInput}
        type="number"
        placeholder="Max Price"
        name="Max Price"
        onKeyDown={saveInputMax}
      />
    )
}

export default InputMax;