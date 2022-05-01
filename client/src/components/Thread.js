import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import { isEmpty } from "../components/Utils";
import PostCard from "./PostCard";

const Thread = () => {
  const [count, setCount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(postsData[0]) &&
          postsData
            .sort((a, b) => a - b)
            .map((post) => {
              return <PostCard post={post} key={post.id} />;
            })}
      </ul>
    </div>
  );
};

export default Thread;
