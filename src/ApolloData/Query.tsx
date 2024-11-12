import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface product {
  id: number;
  name: string;
  image_url: string;
  description: string;
  price: number;
  category: string;
}

const products = gql`
  query {
    products {
      id
      name
      upload_date
      description
      price
      seller_name
      image_url
      status
      categories {
        id
        name
      }
    }
  }
`;

const Query = () => {
  const { loading, error, data } = useQuery(products);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.products.map((product: product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <img src={product.image_url} alt={product.name} />
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Seller: {product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Query;