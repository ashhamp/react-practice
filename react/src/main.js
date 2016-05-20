import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

$(function() {
  class Title extends React.Component {
    render() {
      return (
        <h1>Bands I like via React</h1>
      );
    }
  }

  class BandsForm extends React.Component {
    render() {
      return (
        <div class="band-form row small-12 medium-6 columns end">
          <form class="new_band" id="new_band" action="/bands" accept-charset="UTF-8" method="post">
            <input name="utf8" type="hidden" value="&#x2713;" />
            <label for="band_name">Name</label>
            <input type="text" name="band[name]" id="band_name" />
            <input type="submit" name="commit" value="Create Band" />
          </form>
        </div>

      );
    }
  }

  class BandsBox extends React.Component {
    render() {
      return (
        <div>
          <Title />
          <BandsForm />
        </div>
      );
    }
  }

  ReactDOM.render(
    <BandsBox />, document.getElementById('all-bands')
  );
});
