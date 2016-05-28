import React, { Component } from 'react';
import RemoveBandConfirmation from './RemoveBandConfirmation';

class Band extends React.Component {
  render() {
    
    let { id, name } = this.props.band

    return (
      <div className="small-12 medium-6 large-3 columns end">
        <p className="no-bottom-margin">
          {name}
        </p>
        <p>
          <RemoveBandConfirmation onDelete={this._handleDelete.bind(this)} />
        </p>
      </div>
    );
  }

  _handleDelete(event) {
    this.props.onDelete(this.props.band);
  }
}

export default Band;
