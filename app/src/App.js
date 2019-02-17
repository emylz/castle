import React, { Component } from 'react';
import './App.css';
import hotel from './Component/hotel.json';
import hotel_id from './Component/hotel_id.json';

var choice = [];
var idHotel = [];

class App extends Component {

  constructor(){
    super();
    this.state =  {
      data:hotel.sort((a,b) => (a.price.length > b.price.length) ? 1 : ((a.price.length < b.price.length) ? -1: ((a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)))),
      url:hotel_id
    }
  }

  price_month(month){
    for(let i = 0; i < this.state.data.length; i++)
    {
      if(this.state.data[i].month === month)
      {
        choice.push(this.state.data.hotel[i]);
      }
    }
    for(let i = 0; i < this.state.url.length; i++)
    {
      for(let j = 0; j < choice.length; j++)
      {
        if(choice[j].id === this.state.url[i].id)
        {
            idHotel.push(this.state.url[i]);
        }
      }
    }
    choice.sort((a,b) => (a.price >= b.price) ? 1 : -1);
    return choice;
  }

 render() {

   var hotelList = this.state.data.map(hotel => {
        let url = '';
        for(let i = 0; i < this.state.data.length; i++)
        {
          if(hotel.id === this.state.url[i].id)
          {
            url = this.state.url[i].url;
            break;
          }
        }
        let date = '';
        for(let i = 0; i < 10; i++) date += hotel.date[i];
        return (
            <li> <b> {' url : '}</b> <a href={url}>{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
        )
   })

	return (
      <div className="App">

      <header align="center"><b><big><big><big>This is the cheaper hotels of the week_end of the year 2019 </big></big></big></b></header>
      <br/><br/>

      <br/><br/>

	     <ul>
          {hotelList}
        </ul>




      </div>
    );
  }
}


export default App;
