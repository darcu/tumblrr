import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    return (
      <input
        className={cx("input", this.props.className)}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        value={this.props.value}
      />
    );
  }

  onChange(ev) {
    this.props.onChange(ev.target.value);
  }
}

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
