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

import { fetchPosts } from '../actions';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import s from './styles.css';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    document.title = 'Tumblrr';
    this.fetchPosts(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBlog !== this.props.selectedBlog) {
      this.fetchPosts(nextProps);
    }
  }

  render() {
    return (
      <Layout className={s.content}>
        <Input className={s.input} placeholder="tumblr name" />
        <ul className={s.list}>
          {this.props.posts.map((post, i) =>
            <li className={s.post} key={i}>
              {post.photos.map(this.renderPhoto)}
              <span className={s.title}>
                <a href={post.post_url}>{post.summary}</a> by {post.blog_name}
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
}

HomePage.propTypes = {
  selectedBlog: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  lastFetched: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedBlog, postsByBlog } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts,
    blogInfo,
    lastFetched,
    totalPosts
  } = postsByBlog[selectedBlog] || {
    isFetching: true,
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

