import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, postAdded } from './postsSlice';

export default function AddPostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const users = useSelector(state => state.users)

    const dispatch= useDispatch();

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value)

    const usersOptions = users.map(user =>(
        <option  key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
        if(canSave){
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({title, content, user:userId}))
                setTitle('')
                setContent('')
                setUserId('')
            }catch(err){
                console.error('Failed to save the post: ' , err);
            }finally{
                setAddRequestStatus('idle')
            }
        }
    } 

    return (
        <section>
            <form >
                <label htmlFor= "postTitle">Post Title:</label>
                <input 
                    type= "text" 
                    id= "postTitle"
                    name= "postTitle"
                    value= {title}
                    onChange= {onTitleChange}
                    
                />

                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>


                <label htmlFor= "postContent">Content:</label>
                <textarea 
                    id= "postContent" 
                    name= "postContent"
                    value= {content}
                    onChange= {onContentChange}
                />

                <button type="button" onClick= {onSavePostClicked}  disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )
}
