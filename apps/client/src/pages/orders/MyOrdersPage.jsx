import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { api('/customer/orders').then(setOrders); }, []);
  return <section><h1>My Orders</h1>{orders.map(o => <div key={o.id}><Link to={`/orders/${o.id}`}>{o.id}</Link> - {o.status}</div>)}</section>;
}
