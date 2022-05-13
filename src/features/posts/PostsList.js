import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from '../../components/Spinner';
import PostAuthor from './PostAuthor'
import { fetchPosts, selectAllPosts } from './postsSlice';
import Reactionbutton from './ReactionButton';
import TimeAgo from './TimeAgo';

let PostExcerpt = ({ post }) => {
  return(
    <article className='post-excerpt' key={post.id}>
      <h3>{post.title}</h3>

      <PostAuthor userId= {post.user} />

      <TimeAgo timestamp={post.date} />

      <p className='post-content'> {post.content.substring(0,100)}</p>

      <Reactionbutton post={post}/>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View post
      </Link>
    </article>
  )
}

PostExcerpt = React.memo(PostExcerpt)

export default function PostsList() {
  const dispatch= useDispatch()

  const posts= useSelector(selectAllPosts)

  const postStatus = useSelector(state => state.posts.status) 

  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if(postStatus === 'idle'){
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  let content

  if (postStatus === 'loading'){
    content = <Spinner text='Loading ...' />
    
  } else if (postStatus === 'succeeded'){
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    
    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed'){
    content= <div>{error}</div>
  }

  return (   
    <section className="posts-list">
        <h2>Posts</h2>
        {content}
    </section> 
  )
}
