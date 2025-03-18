import React from 'react';
import Product from '../Home/Product'; 

const ProductList: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Awesome Product 1',
      imageUrl: '/images/product1.jpg', 
      price: 29.99,
      description: 'This is a fantastic product with amazing features.',
    },
    {
      id: 2,
      name: 'Another Great Item',
      imageUrl: '/images/product2.jpg',
      price: 49.50,
      description: 'You will love this item.  It solves all your problems!',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          imageUrl={product.imageUrl}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductList;