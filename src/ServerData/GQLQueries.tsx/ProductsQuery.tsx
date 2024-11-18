import { gql } from '@apollo/client';

export const products = gql`
	query {
		products {
			id
			name
			upload_date
			description
			price
			seller_name
			image_url
			categories {
				id
				name
			}
		}
	}
`;
