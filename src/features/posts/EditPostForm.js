import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postUpdate, selectPostById } from './postsSlice';

export const EditPostForm = ({match}) => {
    const { postId } = match.params;

    const post = useSelector(state => selectPostById(state, postId)) 
   
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();

    // API d'historique de React Router pour passer à la page de publication unique
    // et afficher cette publication
    const history = useHistory();

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if(title && content){
            dispatch(postUpdate({id: postId, title, content}))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <form>
                <h2>Edit post</h2>
                <label htmlFor="postTitle"></label>
                <input 
                    type="text" 
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />

                <label htmlFor="postContent"></label>
                <textarea 
                    name="postContent" 
                    id="postContent"
                    value={content}
                    onChange={onContentChange}
                />

                <button type="button" onClick={onSavePostClicked}>Save post</button>
            </form>
        
        </section>
    );
}

