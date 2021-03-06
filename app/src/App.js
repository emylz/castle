import React, { Component } from 'react';
import './App.css';
import hotel from './Component/hotel.json';
import hotel_id from './Component/hotel_id.json';

import relais_logo from './Component/Logo_Relais_et_Chateaux.png';
import michelin_logo from './Component/michelin_logo.jpg';
import bg from './Component/pool_forest.png';

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
            <li> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
        )}
        else if(month!=='2019-' && this.state.price!=='' && this.state.operator!==''){
            let price_string = '';
            for(let i = 3; i < hotel.price.length; i++){
              price_string+=hotel.price[i];
            }
            let price = Number(price_string);
            if(this.state.operator==='>'){
                if(month === dateHotel && price > this.state.price)
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
                      <li><a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
                  )
                }
            }
            else{
              if(month === dateHotel && price < this.state.price)
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
                    <li> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
                )
              }

            }
        }
        else if(month!=='2019-'){
          if(month === dateHotel)
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
                <li><a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
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
                    <li> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
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
                    <li> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> <b>{' date : '}</b> {date} <b>{' price : '}</b> {hotel.price} </li>
                )}
            }
          }
        return null;})

	return (

    <body background={bg}>
      <div className="App" background={bg}>

      <div id="logo" align="center"><img src={relais_logo} height="55" width="55" alt="relais"/>  <img src={michelin_logo} height="55" width="55" alt="michelin"/></div>
      <header align="center"><b><big><big><big>The availabilities of star-rated restaurants and hotels for all the weekends 2019 sorted by price:</big></big></big></b></header>

      <br/><br/>
      <div align="center" id="filter">
       <br/>
       <label> Wich month ?</label><br/>
       <div class="styled-select blue semi-square">
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
       </div>
       <br/><br/>
       <label> Wich price ?</label><br/>
       <div class="styled-select blue semi-square">
        <select onChange={this.onOperatorChange}>
         <option value="">   </option>
         <option value="<"> &lt; </option>
         <option value=">"> &gt; </option>
        </select> {' '}
        </div>
        <br/>
        <input onChange={this.onPriceChange} placeholder="Your price..."/> {' '}
      <br/><br/>
      <button onClick={this.onClickDate} class="button button1"> Sorted by date </button>
      {' '}
      <button onClick={this.onClickPriceAsc} class="button button2"> Sorted by price asc </button>
      {' '}
      <button onClick={this.onClickPriceDesc} class="button button3"> Sorted by price desc </button>
      <br/>
      </div>

      <br/><br/>

	     <ul align="center" id="result">
          <br/>
          {hotelList}
      </ul>
      </div>
      </body>
    );
  }
}


export default App;
