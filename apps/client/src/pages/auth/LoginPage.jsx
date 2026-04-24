import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault();
    const payload = await api('/auth/login', { method: 'POST', body: JSON.stringify(form) });
    login(payload); navigate('/');
  }
  async function google() {
    const payload = await api('/auth/google', { method: 'POST', body: JSON.stringify({ email: 'google-user@fragrance.local', name: 'Google User' }) });
    login(payload); navigate('/');
  }
  return <section><h1>Login</h1><form onSubmit={submit}><input placeholder='email' onChange={(e)=>setForm({...form,email:e.target.value})}/><input placeholder='password' type='password' onChange={(e)=>setForm({...form,password:e.target.value})}/><button>Login</button></form><button onClick={google}>Google Sign-in</button><Link to='/signup'>Signup</Link> <Link to='/forgot-password'>Forgot Password</Link></section>;
}
