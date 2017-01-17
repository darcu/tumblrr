/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Input from '../Input';
import Link from '../Link';
import { selectBlog } from '../../src/actions';

import s from './Header.css';

class Header extends React.Component {
  static propTypes = {
    selectedBlog: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(args) {
    super(...args);
    this.selectBlog = this.selectBlog.bind(this);
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`mdl-layout-title ${s.title}`} to="/">
            React Static Boilerplate
          </Link>
          <Input
            className={s.input}
            value={this.props.selectedBlog}
            onChange={this.selectBlog}
            placeholder="enter a blog"
          />
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }

  selectBlog(newBlog) {
    this.props.dispatch(selectBlog(newBlog));
  }

}

function mapStateToProps(state) {
  return {
    selectedBlog: state.selectedBlog
  };
}

export default connect(mapStateToProps)(Header);
// export default Header;
