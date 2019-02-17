import React, { Component } from 'react';
import './App.css';
import hotel from './Component/hotel.json';
import hotel_id from './Component/hotel_id.json';

var choice = [];
var idHotel = [];
var sortHotel = [];

var min = 0;

class App extends Component {

  constructor(){
    super();
    this.state =  {
      data:hotel
    }
    this.url = {
      data:hotel_id
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
   var hotelList = choice.map(hotel => {
        let url = '';
        for(let i = 0; i < idHotel.length; i++)
        {
          if(idHotel[i].id == hotel.id)
          {
            url = idHotel[i].url;
            break;
          }
        }

        return (
            <li> {' url : '} {url} {' date : '} {hotel.month} {' price : '} {hotel.price} </li>
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
