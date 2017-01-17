import { fetchPosts } from './helpers';


export const SELECT_BLOG = 'SELECT_BLOG';
export function selectBlog(blog) {
  // debouncedFetchPosts(blog);
  return {
    type: SELECT_BLOG,
    blog
  };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export function requestPosts(blog, lastFetched) {
  return async function(dispatch, getState) {
    dispatch({ type: REQUEST_POSTS, blog });

    try {
      const data = fetchPosts(blog, lastFetched);


      dispatch({
        type: RECEIVE_POSTS,
        blog,
        blogInfo: data.blog,
        posts: data.posts,
        totalPosts: data.total_posts,
        receivedAt: Date.now(),
      });
    } catch (e) {
      console.log("shiet", e);
    }

    // fetchPosts();
  };
}
