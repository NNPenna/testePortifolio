

import Chart from "react-apexcharts";
import React, { useEffect, useState } from 'react';

class Charts extends React.Component{

        constructor(props){
            super(props);

            this.state = {hasChart : false,updtCount : 0 };
            
        }

        componentDidUpdate(prevProps,prevState){
            

            if((prevProps.acao == this.props.acao && (prevProps.acao != undefined )) && (prevProps.chartType == this.props.chartType && (prevProps.chartType != undefined ))){
                if(prevState.chart != this.state.chart && this.state.chart != undefined){
                    this.setState({hasChart : true})
                }
                console.log(this.state.hasChart);
                 
                return(false);
            }  

            if(this.props.chartType == "line"){
                this.setState({
                    chart:{
                        series: [{
                            name: "Valor da Acao",
                            data: getChartData(this.props.acao,"line")
                        }],
                        options: {
                          chart: {
                            height: 350,
                            type: 'line',
                            zoom: {
                              enabled: false
                            }
                          },
                          dataLabels: {
                            enabled: false
                          },
                          stroke: {
                            curve: 'smooth'
                          },
                          grid: {
                            row: {
                              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                              opacity: 0.5
                            },
                          },
                          xaxis: {
                            type: "datetime",
                          }
                        }
                    },updtCount: this.state.updtCount + 1
              
                })
            }else if(this.props.chartType == "candlestick"){
                this.setState({
                    chart: {
                        series: [{
                            data: getChartData(this.props.acao,"candlestick") 
                        }],
                        options:{
                            chart: {
                                type: 'candlestick',
                                height: 350
                            },
                            xaxis: {
                                type: 'datetime'
                            },
                            yaxis: {
                                tooltip: {
                                enabled: false
                                }
                            }
                      }
                    },
                      updtCount: this.state.updtCount + 1
              
                })
            }
        }

        render(){
            return(
            <div className="row">
                <div className="chartHolder">
                    <div className="PortifolioHolder">
                        <Chart options={{}} series={getChartData(this.props.portifolio,"numeroTotalAcao")} type="donut" width="380"/>
                    </div>
                    <div className="ValorAcao"> 
                        {this.state.hasChart ? <Chart options={this.state.chart.options} series={this.state.chart.series} type={this.props.chartType} height={300}/> : <></>}
                    </div>
                </div>
            </div>
        );
    }
}

function getChartData (src, field){
    var aux = [];

    if(field == "candlestick"){
        for(var item of src){
            var auxC = [];

            for(var i = 1; i < 6; i++){
                auxC.push(item[i]);
            }
            
            aux.push({x: new Date(item[0]), y: auxC});
        }
    }else if(field == "line"){
        for(var item of src){
            var auxC = [];

            aux.push({x: new Date(item[0]), y: item[4]});
        }
    }else{
        for(var item of src){
            aux.push(parseFloat(item[field]));
        }
    }

    return aux;

}


export default Charts;