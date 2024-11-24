import styles from '../CategoriesList/CategoriesList.module.scss';
import CategoryButton from '../CategoryButton/CategoryButton';

const Categories = (): JSX.Element => (
	<div className={styles.categories}>
		Categories:
		<CategoryButton />
	</div>
);

export default Categories;
