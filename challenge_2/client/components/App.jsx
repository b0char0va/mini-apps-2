import React from 'react';
// import Chart from './../../node_modules/chart.js';
import Chart from 'chart.js';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            label: [],
        };
        this.drawChart = this.drawChart.bind(this);
    }

    componentDidMount(){
        fetch('/prices')
            .then(res => res.json())
            .then(data => {
                const parsedData = JSON.parse(data.body);
                const prices = Object.values(parsedData.bpi);
                const label = Object.keys(parsedData.bpi);
                this.setState({
                    data: prices,
                    label: label
                }, ()=> this.drawChart())
            })
            .catch(err => console.log(err))
    }

    drawChart(){
        const ctx = document.getElementById("myChart").getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.state.label,
                datasets: [{
                    label: 'Bitcoin prices',
                    data: this.state.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true
                    }],
                    yAxes: [{
                        display: true
                    }],
                }
            }
        });
    }

    render(){
        return(
            <div className='parent'>
                <canvas id="myChart" width="400" height="200"></canvas>
            </div>
        )
    }
}

export default App;