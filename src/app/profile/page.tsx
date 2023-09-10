'use client';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const ProfilePage = () => {

  const [data,setData] = useState<any>(null)
  
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout Succesful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };


 
  useEffect(()=>{
    const getUserDetials = async ()=>{
      const response = await axios.get('/api/users/me')
      console.log("res: ",response.data);
      const tokenData:any = response
      setData({
        username:tokenData.username,
        email:tokenData.email,
        role:tokenData.isAdmin,

      })
    }
    getUserDetials()
  },[])
  return (
    <div className="flex flex-col items-center  h-screen w-screen  overflow-x-hidden">
      <header className="flex items-center justify-around w-full h-20 sticky top-0 left-0 ">
        <h1 className="text-3xl">Profile page</h1>
        <nav>
          <ul>
            <li>
              <button
                className="border border-gray-500 text-black bg-orange-500 p-2"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
            <li>
             {data !== null &&
             <div>
              <h1>{data.username}</h1>
              <h1>{data.email}</h1>
              <h1>{!data.isAdmin ? "User":'Admin'  }</h1>

             </div>
}
             </li>
            <li>
        
              </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default ProfilePage;
