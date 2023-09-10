'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [ loading, setLoading] = useState(false)


  
  const router = useRouter()

  const onLogin = async () => {
      try {
        setLoading(true)
        const response = await axios.post('/api/users/login',user)
        console.log("login success",response.data);
        router.push('/profile')
        
  
      } catch (error:any) {
        console.log("error in sign page: ",error.message);
        
        
      }finally{
        setLoading(false)
      }
    };
  
  
  


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length >0 ){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  
  
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen w-screen overflow-x-hidden ">
      <h1>{loading? "Processing":"Login page"}</h1>
      <hr />

  <label htmlFor='email'>email</label>
      <input 
      className='p-2 border-2 border-gray-500 text-black'
      id='email'
      type='text'
      value={user.email}
      onChange={(e)=> setUser({...user,email:e.target.value})}
      placeholder='email'
      />

<label htmlFor='password'>password</label>
      <input 
      className='p-2 border-2 border-gray-500 text-black'
      id='password'
      type='text'
      value={user.password}
      onChange={(e)=> setUser({...user,password:e.target.value})}
      placeholder='password'
      />
      

      <button  onClick={onLogin}
      className='p-2 text-white border border-gray-500 bg-black'>
Login here
      </button>
      <Link href={'/signup'}>visit Signup page</Link>
    </div>
  );
};

export default Login;
