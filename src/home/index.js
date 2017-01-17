/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchPosts, selectBlog } from '../actions';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import {debounce} from '../helpers';

import s from './styles.css';

const debounceWait = 1000;

class HomePage extends React.Component {
  static propTypes = {
    selectedBlog: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    lastFetched: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.selectBlog = this.selectBlog.bind(this);
  }

  componentDidMount() {
    document.title = 'Tumblrr';
    this.fetchPosts(this.props);
    this.debounceFetch = debounce(this.fetchPosts, debounceWait);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBlog !== this.props.selectedBlog) {
      this.debounceFetch(nextProps);
    }
  }

  render() {
    return (
      <Layout className={s.content}>
        <Input
          className={s.input}
          value={this.props.selectedBlog}
          onChange={this.selectBlog}
          placeholder="enter a blog"
        />
        <ul className={s.list}>
          {this.props.posts.map((post, i) =>
            <li className={s.post} key={i}>
              {post.photos.map(this.renderPhoto)}
              <span className={s.title}>
                <a href={post.post_url}>{post.summary}</a> on {moment(post.date).format("Do MMM YYYY")}
              </span>
            </li>
          )}
        </ul>
        <a href="#" onClick={this.handleRefreshClick}>Load more</a>
        <p>
          <br /><br />
        </p>
      </Layout>
    );
  }

  renderPhoto(photo) {
    const url = photo.original_size.url;
    return <img key={url} className={s.post_img} alt={photo.caption} src={url} />;
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.fetchPosts(this.props);
  }

  fetchPosts(props) {
    const { dispatch, selectedBlog, lastFetched } = props;
    dispatch(fetchPosts(selectedBlog, lastFetched));
  }

  selectBlog(newBlog) {
    this.propsdispatch(selectBlog(newBlog));
  }
}

function mapStateToProps(state) {
  const { isFetching = false, selectedBlog, postsByBlog } = state;
  const {
    lastUpdated,
    items: posts,
    blogInfo,
    lastFetched,
    totalPosts
  } = postsByBlog[selectedBlog] || {
    items: []
  };

  return {
    selectedBlog,
    posts,
    isFetching,
    lastUpdated,
    blogInfo,
    lastFetched,
    totalPosts
  };
}

export default connect(mapStateToProps)(HomePage);
