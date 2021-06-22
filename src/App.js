import './App.css';
import Charts from './Charts'
import Portifolio from './Portifolio';

import * as br from './data/br.json';
import * as pan from './data/pan.json';
import * as vale from './data/vale.json';
import * as portifolioData from './data/portifolio.json';

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  constructor(props){
    super(props); 
    this.state = {
      acoes : {pan : pan.data, br : br.data, vale: vale.data}
    };
  }

  setAcao(a){

    this.setState({acao : this.state.acoes[a],chartType: 'line'});

  }

  changeType(){

    if(this.state.chartType == "line"){
      this.setState({ chartType : "candlestick"});
    }else{
      this.setState({ chartType : "line"});
    }
  }
  

  render(){
    return (
      <>
        <div className="ChartLine">
        <h2 onClick={() => {this.changeType()}}>{this.state.chartType != undefined ? (this.state.chartType == "line" ? "mudar pra Candlestick" : 'mudar pra Line') : ''}</h2>
          <Charts acao={this.state.acao} chartType={this.state.chartType} portifolio={portifolioData.data} />
        </div>
        <div className="Portifolio">
          <Portifolio setAcao={this.setAcao.bind(this)} portifolio={portifolioData.data}/>
        </div>
      </>
    );
  }
}

export default App;
