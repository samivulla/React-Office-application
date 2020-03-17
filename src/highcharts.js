import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'samivulla'
    },
    series: [
        {
            data: [1, 2, 3, 4, 5, 6]
        }
    ]
};
export class highcharts extends Component {
    render() {
        return (
            <div style={{width:'20%'}}>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        )
    }
}

export default highcharts
