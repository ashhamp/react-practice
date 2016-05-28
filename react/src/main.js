import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import BandBox from './components/BandBox';

$(function() {

  ReactDOM.render(
    <BandBox />, document.getElementById('all-bands')
  );
});
