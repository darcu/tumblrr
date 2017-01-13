function jsonp(url) {
  return new Promise((resolve, reject) => {
    const seed = 100000;
    const callbackName = 'jsonp_callback_' + Math.round(seed * Math.random());

    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);

      if (script.error) {
        console.log("script error");
        reject();
      }

      resolve(data.response);
    };
  });
}

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

// key = 4OMa4YDObLv8WC3YqoKZO1SPIgLEQDVIUMgOtoOh6IFFvF3cI9
// url = sagaxux.tumblr.com

const tumblrMaxPage = 3;
const key = "4OMa4YDObLv8WC3YqoKZO1SPIgLEQDVIUMgOtoOh6IFFvF3cI9";
// const blogUrl = (blog) => `https://api.tumblr.com/v2/blog/${blog}/info?api_key=${key}`;
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
