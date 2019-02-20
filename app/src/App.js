import React, { Component } from 'react';
import './App.css';
import hotel from './Component/hotel.json';
import hotel_id from './Component/hotel_id.json';

import relais_logo from './Component/Logo_Relais_et_Chateaux.png';
import michelin_logo from './Component/michelin_logo.jpg';

var choice = [];
var idHotel = [];

class App extends Component {

  constructor(){
    super();
    this.state =  {
      data:hotel.sort((a,b) => (a.price.length > b.price.length) ? 1 : ((a.price.length < b.price.length) ? -1: ((a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)))),
      url:hotel_id,
      price:'',
      month:'',
      operator:''
    }
  }

  onPriceChange = e =>{
    this.setState({price:e.target.value});
  }

  onOperatorChange = e =>{
    this.setState({operator:e.target.value});
  }

  onMonthChange = e =>{
    this.setState({month:e.target.value});
  }

  onClickDate = ()=>{
    this.setState({data:hotel.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))});
  }

  onClickPriceAsc = ()=>{
    this.setState({data:hotel.sort((a,b) => (a.price.length > b.price.length) ? 1 : ((a.price.length < b.price.length) ? -1: ((a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))))});
  }

  onClickPriceDesc = ()=>{
    this.setState({data:hotel.sort((a,b) => (a.price.length < b.price.length) ? 1 : ((a.price.length > b.price.length) ? -1: ((a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))))});
  }

  /*price_month(month){
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
  }*/

 render() {

   var hotelList = this.state.data.map(hotel => {
        let url = '';
        let month = '2019-'+this.state.month;
        let dateHotel ='';
        for(let i = 0; i < 7; i++) dateHotel += hotel.date[i];

        if(month==='2019-' && (this.state.price==='' || this.state.operator==='')){
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
        )}
        else if(month!=='2019-' && (this.state.price!=='' || this.state.operator!=='')){
            let price_string = '';
            for(let i = 3; i < hotel.price.length; i++){
              price_string+=hotel.price[i];
            }
            let price = Number(price_string);
            if(this.state.operator==='>'){
                if(month == dateHotel && price > this.state.price)
                {
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
                }
            }
            else{
              if(month == dateHotel && price < this.state.price)
              {
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
              }

            }
        }
        else if(month!=='2019-'){
          if(month == dateHotel)
          {
            for(let i = 0; i < 7; i++) dateHotel += hotel.date[i];
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
            )}
          }
        else if(this.state.price!=='' && this.state.operator !== ''){
            let price_string = '';
            for(let i = 3; i < hotel.price.length; i++){
              price_string+=hotel.price[i];
            }
            let price = Number(price_string);
            if(this.state.operator==='>')
            {
              if(price > this.state.price)
              {
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
                )}
            }
            else
            {
              if(price < this.state.price)
              {
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
                )}
            }
          }
        })

	return (
      <div className="App">

      <div align="center"><img src={relais_logo} height="55" width="55"/>  <img src={michelin_logo} height="55" width="55"/></div>
      <header align="center"><b><big><big><big>The availabilities of star-rated restaurants and hotels for all the weekends 2019 sorted by price:</big></big></big></b></header>

      <br/><br/>
      <div align="center">
       <label> Wich month ?</label><br/>
        <select onChange={this.onMonthChange}>
         <option value=""></option>
         <option value="01">January</option>
         <option value="02">February</option>
         <option value="03">March</option>
         <option value="04">April</option>
         <option value="05">May</option>
         <option value="06">June</option>
         <option value="07">July</option>
         <option value="08">August</option>
         <option value="09">September</option>
         <option value="10">October</option>
         <option value="11">November</option>
         <option value="12">December</option>
       </select>{' '}
       <br/><br/>
       <label> Wich price ?</label><br/>
        <select onChange={this.onOperatorChange}>
         <option value="">   </option>
         <option value="<"> &lt; </option>
         <option value=">"> &gt; </option>
        </select> {' '}
        <input onChange={this.onPriceChange}/> {' '}
      </div>
      <br/><br/>

      <div align="center">
      <button onClick={this.onClickDate}> Sorted by date </button>
      {' '}
      <button onClick={this.onClickPriceAsc}> Sorted by price asc </button>
      {' '}
      <button onClick={this.onClickPriceDesc}> Sorted by price desc </button>
      </div>

      <br/><br/>

	     <ul>
          {hotelList}
      </ul>




      </div>
    );
  }
}


export default App;
