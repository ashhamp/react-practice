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
      $(this._name).val('');
    }
  }



  class Band extends React.Component {
    render() {
      return (
        <div className="small-12 medium-6 large-3 columns end">
          <p className="no-bottom-margin">
            {this.props.band.name}
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

  ReactDOM.render(
    <BandBox />, document.getElementById('all-bands')
  );
});
