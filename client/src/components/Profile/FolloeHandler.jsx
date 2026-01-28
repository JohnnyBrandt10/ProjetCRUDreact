import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../FormatDate';
import { followUser, unfollowUser } from '../../../reducers/user.slice';

export default function FollowHandler({ idToFollow }) {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser({
      followerId: userData._id,
      idToFollow
    }));
  };

  const handleUnFollow = () => {
    dispatch(unfollowUser({
      followerId: userData._id,
      idToUnFollow: idToFollow
    }));
  };

  const isFollowed =
    !isEmpty(userData?.following) &&
    userData.following.includes(idToFollow);

  return (
    <div>
      {isFollowed ? (
        <button onClick={handleUnFollow} className="unfollow-btn">
          Suivi
        </button>
      ) : (
        <button onClick={handleFollow} className="follow-btn">
          Suivre
        </button>
      )}
    </div>
  );
}

