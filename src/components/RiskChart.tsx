import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import Dropdown from "./dropdown";

interface ChartProps
{
    chartData: any;
    assetOptions: string[];
    locOptions: string[];
    businessOptions: string[];
    decades: number[];
}

function LineChart(props: ChartProps)
{
    
    const [assetOptions] = useState(props.assetOptions);
    const [selectedAsset, setSelectedAssetValue] = useState(props?.assetOptions?.[0] ?? '');

    const [locOptions] = useState(props.locOptions);
    const [selectedLoc, setSelectedLocValue] = useState(props && props.locOptions ? props.locOptions[0] : '');

    const [businessOptions] = useState(props.businessOptions);
    const [selectedBusiness, setSelectedBusinessValue] = useState(props && props.businessOptions ? props.businessOptions[0] : '');

    function handleAssetChange(newValue: string)
    {   
        alert(newValue);
        setSelectedAssetValue(newValue);
        // props.onChange(newValue);
    }
    function handleLocChange(newValue: string)
    { 
        alert(newValue);
        setSelectedLocValue(newValue);
        // props.onChange(newValue);
    }
    function handleBusinessChange(newValue: string)
    { 
        alert(newValue);
        setSelectedBusinessValue(newValue);
        // props.onChange(newValue);
    }
    return (
        <div>
           <label className='ml-3'>Asset Name:</label>
           <Dropdown options={assetOptions} onChange={handleAssetChange} />
           <label className='ml-3'>Location Coordinates:</label>
           <Dropdown options={locOptions} onChange={handleLocChange} />
           <label className='ml-3'>Business Category</label>
           <Dropdown options={businessOptions} onChange={handleBusinessChange} />
        <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Line Chart</h2>
            <Line
                data={props.chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Risk Levels over time"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
        </div>
    );
}
export default LineChart;