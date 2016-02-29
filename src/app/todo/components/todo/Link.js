import React, { PropTypes, Component } from 'react';

export default class Link extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.onClick();
  };

  render() {
    const { active, children } = this.props;

    if (active) {
      return <span>{children}</span>;
    }

    return (
      <a href="#" onClick={this.onClick}>{children}</a>
    );
  }
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};