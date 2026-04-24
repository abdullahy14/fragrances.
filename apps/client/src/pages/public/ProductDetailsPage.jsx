import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => { api(`/public/products/${id}`).then(setProduct); }, [id]);
  if (!product) return <p>Loading...</p>;
  return <section><h1>{product.name}</h1><p>{product.description}</p><p>${product.price}</p></section>;
}
