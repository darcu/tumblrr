import {jsonp} from './helpers';


export const SELECT_BLOG = 'SELECT_BLOG';
export function selectBlog(blog) {
  return {
    type: SELECT_BLOG,
    blog
  };
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(blog) {
  return {
    type: REQUEST_POSTS,
    blog
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(blog, data) {
  return {
    type: RECEIVE_POSTS,
    blog,
    blogInfo: data.blog,
    posts: data.posts,
    totalPosts: data.total_posts,
    receivedAt: Date.now(),
  };
}

const tumblrMaxPage = 10;
const key = "4OMa4YDObLv8WC3YqoKZO1SPIgLEQDVIUMgOtoOh6IFFvF3cI9";

const postsUrl = (blog, offset, limit = tumblrMaxPage) => {
  return `https://api.tumblr.com/v2/blog/${blog}/posts/photo?api_key=${key}&offset=${offset}&limit=${limit}`;
};


export function fetchPosts(blog, offset = 0) {
  return function(dispatch) {
    dispatch(requestPosts(blog));

    return jsonp(postsUrl(blog, offset)).then(blogData => {
      dispatch(receivePosts(blog, blogData));
    });
  };
}
