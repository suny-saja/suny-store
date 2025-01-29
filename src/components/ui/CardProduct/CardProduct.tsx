import * as React from 'react';
import styles from './CardProduct.module.scss';

interface CardProductProps {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  onAddToCart: (id: number) => void;
}

export const CardProduct: React.FC<CardProductProps> = ({
  id,
  title,
  price,
  category,
  image,
  onAddToCart,
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.category}>{category}</p>
        <p className={styles.price}>${price}</p>
        <button
          className={styles.addToCartButton}
          onClick={() => onAddToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
