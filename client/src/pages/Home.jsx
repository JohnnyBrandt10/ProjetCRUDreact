import React, { useContext } from 'react'
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread'
import { UserContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Login from '../components/connection/Login';
import Trends from '../components/Trends';
import Suggestions from '../components/Profile/Suggestions';

export default function Home() {
  const uid = useContext(UserContext);

  return (
    <div className='home'>
      <LeftNav/>
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm/> : <Login signin={true} signup={false} />}
        </div>
        <Thread/>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends/>
            {uid && <Suggestions/>}
          </div>
        </div>
      </div>
    </div>
  )
}
