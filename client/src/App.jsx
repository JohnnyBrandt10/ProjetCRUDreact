import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Trending from './pages/Trending';
import { UserContext } from './components/AppContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';
import { getUser } from '../reducers/user.slice';

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_URL}jwtid`,
        withCredentials: true
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          console.log('no token: ' + err);
        });
    };
    fetchToken();
    if (uid) dispatch(getUser(uid))
  }, [uid]);

  return (
    <UserContext.Provider value={uid}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
