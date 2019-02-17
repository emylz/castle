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
      if(this.state.data[i].month == month)
      {
        choice.push(this.data.hotel[i]);
      }
    }
    for(let i = 0; i < this.url.data.length; i++)
    {
      for(let j = 0; j < choice.length; j++)
      {
        if(choice[j].id == this.url.data[i].id)
        {
            idHotel.push(this.url.data[i]);
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
          if(hotel.id == this.state.url[i].id)
          {
            url = this.state.url[i].url;
            break;
          }
        }
        let date = '';
        for(let i = 0; i < 10; i++) date += hotel.date[i];

        return (
            <li> {' url : '} <a href={url}>{url}</a> {' date : '} {date} {' price : '} {hotel.price} </li>
        )
   })

	return (
      <div className="App">

	     <ul>
          {hotelList}
        </ul>


        <form /*method="post" action=""*/>
          <p>
            <label for="choice">Which month do you want ?</label><br />
            <select name="date" id="date_">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </p>
          <button> select </button>
        </form>

      </div>
    );
  }
}


export default App;
