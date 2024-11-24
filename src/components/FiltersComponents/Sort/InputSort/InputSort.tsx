import styles from './InputSort.module.scss';

interface InputSortProps {
	name: string;
	sortButtonFunction: (range: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputSort = ({ name, sortButtonFunction }: InputSortProps): JSX.Element => (
	<input className={styles.rangePriceInput} type='number' placeholder={name} name={name} min='29' max='1299' onKeyDown={sortButtonFunction} />
);

export default InputSort;
