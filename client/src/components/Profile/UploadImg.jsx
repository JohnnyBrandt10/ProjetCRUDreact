import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPicture } from '../../../reducers/user.slice'

export default function UploadImg() {
    const [file, setFile] = useState()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.user)
    const handlePicture = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("name", userData.pseudo)
        data.append("userId", userData._id)
        data.append("file", file)

        dispatch(uploadPicture({data, id: userData._id}))
    }

  return (
    <form action="" onSubmit={handlePicture} className='upload-pic'>
        <label htmlFor="file">Changer l’image</label>
        <input type="file" name='file' id='file' accept='.jpg, .jpeg, .png' onChange={(e) => setFile(e.target.files[0])} /><br/>
        <input type="submit" value="Modifier" />
    </form>
  )
}
