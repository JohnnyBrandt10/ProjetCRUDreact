import React from 'react';
import LeftNav from '../LeftNav';
import { useSelector } from 'react-redux';
import UploadImg from './UploadImg';

export default function UpdateProfile() {
  const userData = useSelector(state => state.user.user);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profile de {userData?.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
            <h3>Photo de profile</h3>
            <img src={userData?.picture} alt="user-pic" />
            <UploadImg/>
            {/* <p>{errors.maxsize}</p>
            <p>{errors.format}</p> */}
        </div>
      </div>
    </div>
  );
}
