import React from 'react';

const UserProfilePage = ({ params }: any) => {
  return (
    <div
      className="flex flex-col items-center justify-center
     h-screen w-screen gap-5 overflow-x-hidden "
    >
      <h1>Profile</h1>
      <hr />
      <h3>Profile page</h3>
      <p className='p-2 bg-orange-500 text-black ml-3'>{params.id}</p>
    </div>
  );
};

export default UserProfilePage;
