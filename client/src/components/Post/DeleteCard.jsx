import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../../reducers/post.slice'

export default function DeleteCard({id}) {
    const dispatch = useDispatch()
    const deleteArticle = () => {
        dispatch(deletePost({ postId: id }))
    }

  return (
    <div onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
            deleteArticle()
        }
    }}>
        <img src="./img/icons/trash.svg" alt="delete" />
    </div>
  )
}
