import React, { useContext } from 'react';
import { UserContext } from '../components/AppContext';
import { useSelector } from 'react-redux';
import LeftNav from '../components/LeftNav';
import { isEmpty } from '../components/FormatDate';
import Card from '../components/Post/Card';
import Trends from '../components/Trends';
import Suggestions from '../components/Profile/Suggestions';

export default function Trending() {
  const uid = useContext(UserContext);
  const trends = useSelector((state) => state.trend.trends);

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {!isEmpty(trends[0]) &&
            trends.map((post) => <Card key={post._id} post={post} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {uid && <Suggestions/>}
        </div>
      </div>
    </div>
  );
}
