import React, { Component } from 'react';
import Band from './Band';
import BandForm from './BandForm';

class BandBox extends React.Component {

  constructor() {
    super();

    this.state = {
      bands: []
    };
  }

  componentWillMount() {
    this._fetchBands();
  }

  render() {
    const bands = this._getBands();

    return (
      <div className="band-box">
        <h1>Bands I like. Powered by React</h1>
        <BandForm addBand={this._addBand.bind(this)} />
        <div>
          <h3>{this._getBandsTitle(bands.length)}</h3>
        </div>
        <div>
          {bands}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._timer = setInterval(
      () => this._fetchBands(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _fetchBands() {
    $.ajax({
      method: 'GET',
      url: '/api/bands',
      success: (bands) => {
        this.setState({ bands })
      }
    });
  }

  _getBandsTitle(bandCount) {
    if (bandCount === 0) {
      return "I don't like any bands yet";
    } else if (bandCount === 1) {
      return 'I like 1 band';
    } else {
      return `I like ${bandCount} bands`;
    }
  }

  _addBand(name) {
    const band = { name };

    $.ajax({
      method: 'POST',
      url: '/api/bands',
      data: { band },
      success:(newBand => {
        this.setState({ bands: this.state.bands.concat([newBand]) });
      })
    });
  }

  _getBands() {
    return this.state.bands.map((band) => {
      return (
        <Band
          key={band.id}
          band={band}
          onDelete={this._deleteBand.bind(this)} />

      );
    });

  }

  _deleteBand(band) {

    $.ajax({
      method: 'DELETE',
      url: `/api/bands/${band.id}`
    });

    const bands = [...this.state.bands];
    const bandIndex = bands.indexOf(band);

    bands.splice(bandIndex, 1);

    this.setState({ bands });
  }
}

export default BandBox;
