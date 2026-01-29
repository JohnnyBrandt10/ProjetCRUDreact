import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../FormatDate';
import { followUser, unfollowUser } from '../../../reducers/user.slice';

export default function FollowHandler({ idToFollow, type }) {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(
      followUser({
        followerId: userData._id,
        idToFollow
      })
    );
  };

  const handleUnFollow = () => {
    dispatch(
      unfollowUser({
        followerId: userData._id,
        idToUnFollow: idToFollow
      })
    );
  };

  const isFollowed =
    !isEmpty(userData?.following) && userData.following.includes(idToFollow);

  return (
    <div>
      {isFollowed ? (
        <span onClick={handleUnFollow}>
          {type === 'suggestion' && (
            <button className="unfollow-btn">
              Suivi
            </button>
          )}
          {type === 'card' && (
            <img src="./img/icons/checked.svg" alt="checked" />
          )}
        </span>
      ) : (
        <span onClick={handleFollow}>
          {type === 'suggestion' && (
            <button className="follow-btn">
              Suivre
            </button>
          )}
          {type === 'card' && <img src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </div>
  );
}
