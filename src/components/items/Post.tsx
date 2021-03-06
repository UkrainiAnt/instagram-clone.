import React, {useState, useEffect} from 'react'
import { IPost } from '../../types'
import PostFooter from './post/PostFooter'
import PostForm from './post/PostForm'

import PostHeader from './post/PostHeader'

import PostSkeleton from './post/PostSkeleton'

import LikeAnimation from '../pure/LikeAnimation'

import { db } from '../../../firebase'

import { useSelector } from 'react-redux'

import { onSnapshot, query, collection, orderBy, setDoc, doc, serverTimestamp, deleteDoc, DocumentData } from '@firebase/firestore'

const Post: React.FC<{post: IPost}> = ({post}) => {
  const user = useSelector((state: any) => state.user.user)

  const [comments, setCommetns] = useState<DocumentData[]>([])
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState<DocumentData[]>([])

  const [loadedImage, setloadedImage] = useState(false)

  useEffect(() => 
    onSnapshot(
      query(
        collection(db, 'posts', post.id, 'comments'),
        orderBy("timestamp", 'desc')
      ),
      (snapshot) =>  {setCommetns(snapshot.docs)}
    )
  , [db, post.id])

  useEffect(() => onSnapshot(
    collection(db, 'posts', post.id, 'likes'), (snapshot) => setLikes(snapshot.docs)

  ) , [db, post.id])

  useEffect(() => {
    setLiked(
      (likes.findIndex(like => like.data().userId === user?.uid) )!== -1
    )
  }, [likes, db])

  useEffect(() => {
    setLiked(
      (likes.findIndex(like => like.data().userId === user?.uid) )!== -1
    )
  }, [])

  const likePost = async () => {

    const data = {
      username: user.displayName,
      userId: user.uid,
      timestamp: serverTimestamp(),
      userImage: user.photoURL
    }
    const docRef = doc(db, 'posts', post.id, 'likes', user.uid)

    if (liked) {
      await deleteDoc(docRef)
    }
    else {
      await setDoc(docRef, data)
    }
  }

  return (
    <div className='mb-5'>
      
      { !loadedImage &&  <PostSkeleton /> }

     <div className={ !loadedImage ? 'opacity-0 absolute' : 'opacity-100 relative' }>
      <PostHeader postId={post.id + ' ' + post.uid} userImg={post.userImg} username={post.username} />

      <div className='relative'>
        <LikeAnimation likeFunction={likePost} />
        <img onLoad={() => setloadedImage(true)} src={post.img} className='object-cover w-full' alt="" />
      </div>
    

      <PostFooter post={post} likes={likes} liked={liked} comments={comments} likePost={likePost} >
        <div className='mt-6'>
        <PostForm id={post.id} />
        </div>
      </PostFooter>
     </div>  

    </div>
  )
}

export default Post
