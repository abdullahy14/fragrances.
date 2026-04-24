import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function CatalogPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { api('/public/catalog').then(setItems); }, []);
  return <section><h1>Catalog</h1>{items.map(p => <div key={p.id}><Link to={`/products/${p.id}`}>{p.name}</Link> - ${p.price}</div>)}</section>;
}
