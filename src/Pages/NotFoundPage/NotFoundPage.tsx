import { Link } from 'react-router-dom';

const NotFoundPage = (): JSX.Element => (
	<>
		404 Not Found
		<Link to='/'>Home</Link>
	</>
);

export default NotFoundPage;
