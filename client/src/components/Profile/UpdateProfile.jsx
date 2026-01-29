import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../../reducers/user.slice';
import { dateParser } from '../FormatDate';
import FolloeHandler from './FolloeHandler';

export default function UpdateProfile() {
  const [bio, setBio] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdateBio = (e) => {
    e.preventDefault();
    dispatch(updateBio({ userId: userData._id, bio }));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profile de {userData?.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profile</h3>
          <img src={userData?.picture} alt="user-pic" />
          <UploadImg />
          {/* <p>{errors.maxsize}</p>
            <p>{errors.format}</p> */}
        </div>
        <div className="right-part">
          <div className="bio-update">
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userData?.bio}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier le bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData?.bio}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <button onClick={handleUpdateBio}>Valider</button>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Annuler
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le: {dateParser(userData?.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>
            Abonnements :{' '}
            {userData?.following ? userData?.following.length : 0}{' '}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnes :{' '}
            {userData?.followers ? userData?.followers.length : 0}{' '}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FolloeHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnes</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FolloeHandler
                            idToFollow={user._id}
                            type={'suggestion'}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
