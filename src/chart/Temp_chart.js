import React, { Component } from 'react';
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';

class Temp_chart extends Component{
    state = {
        list:[]
    }
    static defaultProps ={
        list:[],
        date:[],
        temp:[],
        moist:[],
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.date !== this.props.date && nextProps.date.length !== this.props.date.length;
    }
    componentDidUpdate(){

    }
    render(){

        const data = {
            showLabel: true,
            typeShow: { bar: true },
            labels: this.props.date,
            datasets: [{
                type:'line',
                label:'기온 정보(°C)',
                data: this.props.temp,
                borderColor: 'rgba(50,50,230,0.5)',
                backgroundColor: 'rgba(80,120,230,0.2)',
                borderWidth: 1,
                pointRadius: 10,
                pointHoverRadius: 15,
                pointBackgroundColor: 'transparent',    //#609ACF
                pointBorderWidth: 0,
                spanGaps: false,
                },{
                type:'bar',
                label:'습도 정보(%)',
                data: this.props.moist,
                borderColor: 'rgba(230,50,50,0.5)',
                backgroundColor: 'rgba(230,120,80,0.2)',
                hoverBackgroundColor: 'rgba(230,50,0,0.2)',
                borderWidth: 1,
                spanGaps: false,
                }
            ] 
        }
        
        return (
            <Bar data={data} options={{ responsive: true, plugins:{ display: true }}} legend={{display:true}}/>
            
            );
    }
}

export default Temp_chart;