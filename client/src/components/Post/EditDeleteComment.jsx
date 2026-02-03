import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { editComment } from '../../../reducers/post.slice';

export default function EditDeleteComment({ comment, postId }) {
  const [isAuthors, setIsAuthors] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const uid = useContext(UserContext);

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
        dispatch(editComment({ postId: postId, commentId: comment._id, text }));
        setText('');
        setIsEditing(false);
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterID) {
        setIsAuthors(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterID]);

  return (
    <div className="edit-comment">
      {isAuthors && isEditing === false && (
        <span onClick={() => setIsEditing(!isEditing)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {isAuthors && isEditing && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setIsEditing(!isEditing)}>
            Modifier
          </label>
          <br />
          <input
            type="text"
            defaultValue={comment.text}
            onChange={(e) => setText(e.target.value)}
            name="text"
          /><br/>
          <input type="submit" value="Valider" />
        </form>
      )}
    </div>
  );
}
