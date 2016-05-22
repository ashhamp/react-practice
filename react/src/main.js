import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

$(function() {
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
    }
  }



  class Band extends React.Component {
    render() {
      return (
        <li>
          {this.props.band.name}
          <a href="#" onClick={this._handleDelete.bind(this)}>
            Delete
          </a>
        </li>
      );
    }

    _handleDelete(event) {
      event.preventDefault();
      if (confirm('Are you sure?')) {
        this.props.onDelete(this.props.band);
      }
    }
  }


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
            <ul>
              {bands}
            </ul>
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
      const band = {
        id: this.state.bands.length + 1,
        name
      };
      this.setState({ bands: this.state.bands.concat([band]) });
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

  ReactDOM.render(
    <BandBox />, document.getElementById('all-bands')
  );
});
