import classNames from 'classnames';
import styles from './SortButton.module.scss';

interface sortButtonProps {
	name: string;
	sortButtonFunction: () => void;
	active: boolean;
}

const sortButton = ({name, sortButtonFunction, active}: sortButtonProps): JSX.Element => (
		<div className={styles.buttonPadding}>
			<button
				className={classNames({ [styles.buttonActive]: active, [styles.buttonIsntActive]: !active })}
				onClick={sortButtonFunction}
			/>
			<div className={styles.filterNames}>
				<div className={styles.filtersButton} onClick={sortButtonFunction}>
					{name}
				</div>
			</div>
		</div>
	)

export default sortButton