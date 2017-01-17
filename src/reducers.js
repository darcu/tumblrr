import { combineReducers } from "redux";

import {
  SELECT_BLOG,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "./actions";


function selectedBlog(state = "benhaist", action) {
  switch (action.type) {
    case SELECT_BLOG:
      return action.blog;
    default:
      return state;
  }
}

function posts(state = {
  items: [],
}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const lastFetched = state.lastFetched || 0;
      return Object.assign({}, state, {
        blogInfo: action.blogInfo,
        items: state.items.concat(action.posts),
        lastFetched: lastFetched + action.posts.length,
        totalPosts: action.totalPosts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function postsByBlog(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.blog]: posts(state[action.blog], action),
        isFetching: false
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByBlog,
  selectedBlog
});

export default rootReducer;
