import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  async function submit(e) { e.preventDefault(); const payload = await api('/auth/signup', { method: 'POST', body: JSON.stringify(form) }); login(payload); navigate('/'); }
  return <section><h1>Signup</h1><form onSubmit={submit}><input placeholder='name' onChange={(e)=>setForm({...form,name:e.target.value})}/><input placeholder='email' onChange={(e)=>setForm({...form,email:e.target.value})}/><input placeholder='password' type='password' onChange={(e)=>setForm({...form,password:e.target.value})}/><button>Create</button></form></section>;
}
