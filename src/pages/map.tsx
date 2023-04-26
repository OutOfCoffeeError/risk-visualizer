//map.tsx
import { MapContainer, Marker, Popup, Circle, TileLayer, useMapEvents, useMapEvent, useMap, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../app/globals.css'
// import {iconPerson} from './icon';
import ic from '../public/high-sev.png';
import L from 'leaflet';
import { LatLng, LatLngBounds } from 'leaflet';
import React, { useState, useEffect } from 'react';
import Dropdown from '../components/dropdown';
// import DataTable from './table';
import { AgGridReact } from 'ag-grid-react';
import CellButton from '../components/cellbutton';
import Popup2 from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import LineChart from '../components/RiskChart';



const duckIcon = new L.Icon({
    iconUrl: './marker-red.png',
    iconRetinaUrl: './marker-red.png',
    iconAnchor: new L.Point(0, 0),
    popupAnchor: new L.Point(16, 0),
    iconSize: new L.Point(32, 32),
    className: 'hi-sev'
});

const sheetURL = 'https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/gviz/tq?tqx=out:json&tq&gid=681415175';

let riskData: any[];
let mapRef: any;
let options: number[];
function SetViewOnClick()
{
    const map = useMapEvent('click', (e) =>
    {
        map.setView(e.latlng, map.getZoom(), {
            animate: true,
        })
    })

    return null
}

const Map = () =>
{
    mapRef = React.createRef();
    const [data, setData] = useState<any[]>([]);
    const [assets, setAssets] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [bCategories, setBCategories] = useState<string[]>([]);
    const [gridData, setGridData] = useState<any[]>([]); 
    const [selectedValue, setSelectedValue] = useState('2030');
    const [columnDefs] = useState([
        { field: 'asset', filter: 'agTextColumnFilter', sortable: true },
        { field: 'category', filter: 'agTextColumnFilter', sortable: true },
        { field: 'rating', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'riskFactor', filter: 'agTextColumnFilter', width: 500, cellRenderer: CellButton }
    ]);
    useEffect(() =>
    {
        fetchData();
    }, []);

    const fetchData = async (): Promise<void> =>
    {
        const response = await fetch(sheetURL);
        const textData = await response.text();
        riskData = convertToJSON(textData);
        handleDropdownChange(selectedValue);
        initChartData(riskData)
    };

    const initChartData = (riskData: any) => {

    }

    const convertToJSON = (data: string) =>
    {
        let jsonData = JSON.parse(data.substring(47).slice(0, -2));
        console.log(jsonData);
        let headers: string[] = [];
        jsonData.table.cols.forEach((heading: any) =>
        {
            if (heading.label) {
                headers.push(heading.label);
            }
        });
        console.log(headers);
        let sheetJson: any[] = [];
        let yearsSet = new Set<number>();
        let locationSet = new Set<string>();
        let assetSet = new Set<string>();
        let bCategorySet = new Set<string>();
        jsonData.table.rows.forEach((rowData: any) =>
        {
            const row: any = {};
            headers.forEach((ele, ind) =>
            {
                row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
            });
            let latLng = new LatLng(row['Lat'], row['Long']);
            let decade = row['Year'];
            let assetName = row['Asset Name'];
            let bCategory = row['Business Category'];
            yearsSet.add(decade);
            locationSet.add(row['Lat']+','+row['Long']);
            assetSet.add(assetName);
            bCategorySet.add(bCategory);

            sheetJson.push({ 'latlng': latLng, 'asset': assetName, 'category': bCategory, 'rating': row['Risk Rating'], 'riskFactor': row['Risk Factors'], 'decade': decade });
        });
        console.log(sheetJson);
        options = Array.from(yearsSet.values());
        setAssets(Array.from(assetSet.values()));
        setLocations(Array.from(locationSet.values()));
        setBCategories(Array.from(bCategorySet.values()));
        return sheetJson;
    }

    const Markers = () =>
    {
        const mapRef = useMap();
        const map = useMapEvents({
            moveend(e)
            {
                console.log(mapRef.getBounds());
                console.log(selectedValue);
                const currDecadeMarkers = riskData.filter((m: any) =>
                    m['decade'] == selectedValue
                );
                // setGridData(currDecadeMarkers);
                const markersInBounds = currDecadeMarkers.filter((m: any) =>
                    mapRef.getBounds().contains(m['latlng']) && m['decade'] == selectedValue
                );
                console.log(markersInBounds);
                setData(markersInBounds);
            },
        })
        return (<div></div>);
    }

    const getRiskColor = (rating: number): string =>
    {
        if (rating < 0.1) {
            return '#4ff72d';
        } else if (rating < 0.2) {
            return '#baf72d';
        } else if (rating < 0.4) {
            return '#e3f72d';
        } else if (rating < 0.6) {
            return '#f7d52d';
        } else if (rating < 0.8) {
            return '#f7992d';
        } else if (rating < 0.9) {
            return '#f76a2d';
        } else {
            return '#f7452d';
        }
    }

    function handleDropdownChange(newValue: string)
    {
        setSelectedValue(newValue);
        const markers = riskData.filter((m: any) =>
            m['decade'] == selectedValue
        );
        console.log(markers);
        setData(markers);
        setGridData(markers);
    }
    const chartData = {
        labels: ['2030', '2040', '2050','2060', '2070'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Locations',
                data: [
                    3, 4, 2,1,5
                ],
                // you can set indiviual colors for each bar
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
            },
            {
              label: 'Asset',
              data: [
                  1,2,8,5,3
              ],
              // you can set indiviual colors for each bar
              borderColor: 'rgb(87, 54, 255)',
              backgroundColor: 'rgba(87, 54, 255, 0.5)',
              borderWidth: 1,
          },
          {
            label: 'Business Class',
            data: [
               3,7,2,1,9
            ],
            // you can set indiviual colors for each bar
            borderColor: 'rgb(48, 255, 76)',
            backgroundColor: 'rgba(48, 255, 76, 0.5)',
            borderWidth: 1,
        }
        ]
      };

    return (
        <div>
            <Dropdown options={options} onChange={handleDropdownChange} />
            <p>Selected value: {selectedValue}</p>
            <MapContainer ref={mapRef} preferCanvas={false} center={[46.1351, -60.1831]} zoom={6} scrollWheelZoom={false} style={{ height: 600, width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((item: any, index: number) => (
                    <div key={index}>
                        {/* <Marker position={[item.latlng.lat, item.latlng.lng]} icon={duckIcon}>
                            <Popup>
                                <strong>Asset Name: </strong>{item.asset} <br />
                                <strong>Business Category:</strong> {item.category}
                            </Popup>
                        </Marker> */}
                        <CircleMarker eventHandlers={{
                            mouseover: (event) => event.target.openPopup(),
                        }}
                        opacity={0} color={getRiskColor(item.rating)} center={[item.latlng.lat, item.latlng.lng]} radius={7} >
                            <Popup>
                                <strong>Asset Name: </strong>{item.asset} <br />
                                <strong>Business Category:</strong> {item.category}
                            </Popup>
                        </CircleMarker>
                    </div>
                ))}
                <Markers />
                <SetViewOnClick />
            </MapContainer>
            {/* <DataTable data={data}></DataTable> */}
            <div className="ag-theme-alpine justify-center	" style={{height: 500, width: 1000}}>
                <AgGridReact className='mt-6 ml-6'
                pagination={true}
                rowData={gridData}
                columnDefs={columnDefs}>
            </AgGridReact>
           </div>
           {assets.length > 0 && <LineChart 
                                chartData={chartData} 
                                assetOptions={assets}
                                locOptions={locations}
                                businessOptions={bCategories}
                                decades={options}/>
            }
        </div>
    )
}

export default Map