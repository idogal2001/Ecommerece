import React, { useContext }  from "react";
import { ProductsCategory } from "../../../ProductsCategory";
import styles from "../../../styles/Filters/Filter.module.scss";
import { HomePageContext } from "../../../Pages/HomePage";

const CategoryButton = () => {

    const homePageData = useContext(HomePageContext);

    if(!homePageData){
      throw new Error("homePageData is unavavilble");
    }
  
    const categories = homePageData.categories;
    const setCategories = homePageData.setCategories;

    const addCategory = (category: string) => {
        let categoriesList = [...categories];
        if(categories.includes(category)){
            categoriesList = categories.filter((element) => element !== category);
        }
          else{
            categoriesList = [...categoriesList, category];
          }
          
          setCategories(categoriesList);
    }

return(
    <div className={styles.buttonCategoriesPadding}>
    {ProductsCategory.map((category) => (
    <div className={styles.buttonPadding} key={category}>
    <input
    type="checkbox"
    checked={categories.includes(category)}
    onChange={() => addCategory(category)}
    />
<div className={styles.filterNames}><span className={styles.filtersButton} onClick={() => addCategory(category)}>{category}</span></div>
</div>
    ))}
</div>
    )
}

export default CategoryButton;