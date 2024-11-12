import React from "react";
import CategoryButton from "./FilterChoices/CategoryButton";
import styles from "../../styles/Filters/Filter.module.scss"

const Categories = () => {

return (
    <div className={styles.categories}>
    <p>Categories:</p>
    <CategoryButton />
  </div>
    )
}


export default Categories;