import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../FormatDate';
import FollowHandler from './FolloeHandler';

export default function Suggestions() {
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.user.users);

  const shuffledOnce = useRef(null);

  const friendsHint = useMemo(() => {
    if (isEmpty(usersData) || isEmpty(userData?._id)) return [];

    if (!shuffledOnce.current) {
      const notFriends = usersData.filter(
        (user) =>
          user._id !== userData._id &&
          !user.followers.includes(userData._id)
      );

      shuffledOnce.current = [...notFriends].sort(
        // eslint-disable-next-line react-hooks/purity
        () => 0.5 - Math.random()
      );
    }

    let limit = 0;
    const h = window.innerHeight;

    if (h > 780) limit = 5;
    else if (h > 720) limit = 4;
    else if (h > 615) limit = 3;
    else if (h > 540) limit = 1;

    return shuffledOnce.current.slice(0, limit);
  }, [usersData, userData]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>

      {friendsHint.length === 0 ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint.map((user) => (
            <li className="user-hint" key={user._id}>
              <img src={user.picture} alt="user-pic" />
              <p>{user.pseudo}</p>
              <FollowHandler
                idToFollow={user._id}
                type="suggestion"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
