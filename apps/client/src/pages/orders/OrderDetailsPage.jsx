import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => { api(`/customer/orders/${id}`).then(setOrder); }, [id]);
  return <section><h1>Order Details</h1><pre>{JSON.stringify(order, null, 2)}</pre></section>;
}
