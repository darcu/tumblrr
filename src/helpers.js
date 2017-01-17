

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const self = this;
    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(self, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(self, ...args);
    }
  };
}

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const seed = 100000;
    const callbackName = 'jsonp_callback_' + Math.round(seed * Math.random());

    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    console.log("script", script);

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


const debounceWait = 1000;

const tumblrMaxPage = 10;
const key = "4OMa4YDObLv8WC3YqoKZO1SPIgLEQDVIUMgOtoOh6IFFvF3cI9";

const postsUrl = (blog, offset, limit = tumblrMaxPage) => {
  return `https://api.tumblr.com/v2/blog/${blog}/posts/photo?api_key=${key}&offset=${offset}&limit=${limit}`;
};


export async function fetchPosts(blog, offset = 0) {
  return function() {
    return jsonp(postsUrl(blog, offset)).then((blogData) => ({ blog, blogData })).catch((e) => console.log("err", e));
  };
}

export const debouncedFetchPosts = debounce(fetchPosts, debounceWait);

