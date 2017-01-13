import React, { PropTypes } from 'react';
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
    // return <a href={typeof to === 'string' ? to : history.createHref(to)} {...props} onClick={this.handleClick} />;
  }

  onChange(ev) {
    // const value = this.value();
    // if (this.props.maxLength && value.length > this.props.maxLength) {
    //   this.setState({error: true});
    //   this.action.runAfter(ACTION_DELAY);
    //   ev.preventDefault();
    //   return;
    // }
    console.log("e", ev.target.value);

    // set state value

  }
}

Input.propTypes = {
  // to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

export default Input;
