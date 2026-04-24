import { useState } from 'react';
import { api } from '../../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return <section><h1>Forgot Password</h1><button onClick={()=>api('/auth/forgot-password/request',{method:'POST',body:JSON.stringify({email})})}>Request OTP</button><input placeholder='email' onChange={(e)=>setEmail(e.target.value)} /><input placeholder='otp' onChange={(e)=>setOtp(e.target.value)} /><input placeholder='new password' type='password' onChange={(e)=>setNewPassword(e.target.value)} /><button onClick={()=>api('/auth/forgot-password/verify',{method:'POST',body:JSON.stringify({email,otp,newPassword})})}>Reset</button></section>;
}
