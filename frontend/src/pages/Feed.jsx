import {useState} from 'react'
import CreatePostModal from '../components/CreatePostModal';
import {fetchFeed} from '../redux/slices/postSlice'
import { useSelector, useDispatch } from 'react-redux';
import '../styles/feedStyle.css'
import { useEffect } from 'react';
import PostCard from '../components/PostCard';

export const Feed = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const dispatch = useDispatch();
  const {posts, loading, error} = useSelector((state)=>state.post);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch, showCreatePostModal]);

  return (
    <div className='container'>
      <div className="feed-page">
        <div className="create-post">
          <button type='button' onClick={() =>setShowCreatePostModal(true)}>Create Post</button>
        </div>
      </div>
      <div className="feed-posts">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading posts</p>}
        {!loading && !error && posts.length === 0 && <p>No posts available</p>}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {showCreatePostModal && <CreatePostModal onClose={() => setShowCreatePostModal(false)} />}
    </div>
  )
}
