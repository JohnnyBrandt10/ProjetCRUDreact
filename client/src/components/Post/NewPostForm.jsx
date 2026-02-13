/* eslint-disable react-hooks/purity */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestamp } from '../FormatDate';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../../reducers/post.slice';

export default function NewPostForm() {
  const userData = useSelector((state) => state.user.user);
  const [message, setMessage] = useState('');
  const [ispicture, setIsPicture] = useState(null);
  const [video, setIsVideo] = useState('');
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error.postError);

  const handlePicture = (e) => {
    setIsPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setIsVideo('');
  };

  const cancelPost = () => {
    setMessage('');
    setIsPicture(null);
    setIsVideo('');
    setFile('');
  };

  const handlePost = async () => {
    if (message || ispicture || video) {
      const data = new FormData();
      data.append('posterID', userData?._id);
      data.append('message', message);
      if (file) {
        data.append('file', file);
      }
      data.append('video', video);

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert('Veuillez entrer un message');
    }
  };

  useEffect(() => {
    let findLink = message.split(' ');
    for (let i = 0; i < findLink.length; i++) {
      if (
        findLink[i].includes('https://www.yout') ||
        findLink[i].includes('https://yout')
      ) {
        let embed = findLink[i].replace('watch?v=', 'embed/');
        setIsVideo(embed.split('&')[0]);
        findLink.splice(i, 1);
        setMessage(findLink.join(' '));
        setIsPicture('');
      }
    }
  }, [message, video]);

  return (
    <div className="post-container">
      {isEmpty(userData) ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>
                {userData?.following ? userData?.following.length : 0}{' '}
                Abonnement
                {userData?.following && userData?.following.length > 1
                  ? 's'
                  : ''}
              </span>
            </p>
            <p>
              <span>
                {userData?.followers ? userData?.followers.length : 0} Abonne
                {userData?.followers && userData?.followers.length > 1
                  ? 's'
                  : ''}
              </span>
            </p>
          </div>
          <NavLink to="/profile">
            <div className="user-info">
              <img src={userData?.picture} alt="user-pic" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Ecrire un message ou copier le lien de votre video Youtube!"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || ispicture || video ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData?.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData?.pseudo}</h3>
                    </div>
                    <span>{timestamp(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={ispicture} alt="post-pic" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setIsVideo('')}>
                    Supprimer la video
                  </button>
                )}
              </div>
              {!isEmpty(error.message) && <p>{error.message}</p>}
              <div className="btn-send">
                {message || ispicture || video ? (
                  <button className="cancel" onClick={() => cancelPost()}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={() => handlePost()}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
