'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  const [userExist, setUserExist] = useState(false)

  const router = useRouter()  

  
  const onSignup = async () => {
 

    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup',user)
      console.log("signup success",response.data);
      router.push('/login')
      

    } catch (error:any) {
      console.log("error in sign page: ",error.message);
    
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])


  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen w-screen overflow-x-hidden ">
      {/* <h1 className='text-red-500 text-2xl font-semibold border border-white mb-10'>{userExist && "user already exist please Sign Up"}</h1> */}
      <h1>{loading ? "processing":"Signup"}</h1>
      
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 border-2 border-gray-500 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border-2 border-gray-500 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border-2 border-gray-500 text-black"
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />

      <button
        onClick={onSignup}
        className="p-2 text-white border border-gray-500 bg-black"
      >
        {buttonDisabled ? "No Signup":"Signup here"}
      </button>
      <Link href={'/login'}>visit login page</Link>
    </div>
  );
};

export default Signup;
