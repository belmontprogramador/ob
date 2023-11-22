import React from 'react';
import ReactApexChart from 'react-apexcharts';
 
/**
 * props:
 * - data
 */
export default function Chart(props) {
 
    const options = {
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }
 
    const series = [{
        data: props.data
    }]
 
    return (
        <ReactApexChart options={options} series={series} type="candlestick" width={640} height={480} />
    )
}
