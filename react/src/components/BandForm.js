import React, { Component } from 'react';

class BandForm extends React.Component {
  render() {
    return (
      <div className="band-form row small-12 medium-6 columns end">
        <form className="new_band" onSubmit={this._handleSubmit.bind(this)}>
          <input placeholder="Band Name" ref={(input) => this._name = input} />
          <input type="submit" name="commit" value="Add Band" />
        </form>
      </div>
    );
  }
  _handleSubmit(event) {
    event.preventDefault();

    let name = this._name;

    if (!this._name.value.trim()) {
      alert("Please enter a band name");
      return
    }

    this.props.addBand(name.value);
    $(this._name).val('');
  }
}

export default BandForm;
