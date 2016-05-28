import React, { Component } from 'react';

class RemoveBandConfirmation extends React.Component {
  constructor() {
    super();
    this.state = {
      showConfirm: false
    };
  }

  render() {
    let confirmNode;
    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this._confirmDelete.bind(this)}>Yes </a> - or - <a href="" onClick={this._toggleConfirmMessage.bind(this)}> No</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>Delete band?</a>;
    }
      return (
        <span>{confirmNode}</span>
    );
  }

  _toggleConfirmMessage(e) {
    e.preventDefault();

    this.setState({
      showConfirm: !this.state.showConfirm
    });
  }

  _confirmDelete(e) {
    e.preventDefault();
    this.props.onDelete();
  }
}

export default RemoveBandConfirmation;
