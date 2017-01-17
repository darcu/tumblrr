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

export {
  debounce,
  jsonp
};
