import React, { Component } from 'react';
import './App.css';

var request = require("request-promise");
var cheerio = require('cheerio');

const michelin = require('./michelin');





class App extends Component {


 render() {



	return (
      <div className="App">

		<table/>

		<button id ='btn_1'type="button" >Hotel from relais&chateau</button>{'   '}
		<button id='btn_2' type="button" >Hotels with stars restaurant</button>{'   '}
		<button  id='btn_3' type="button">Success</button>

      </div>
    );
  }
}


export default App;




