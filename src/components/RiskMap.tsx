// import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMapEvent, useMap, CircleMarker } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
// import '../app/globals.css'
// import L from 'leaflet';
// import { LatLng } from 'leaflet';
// import React, { useState, useEffect } from 'react';
// import Dropdown from '../components/dropdown';
// import { getRiskColor } from '../commonUtils';

// import 'reactjs-popup/dist/index.css';

// interface MapProps
// {
//     markerData: any[];
// }

// let riskData: any[];
// let mapRef: any;
// let options: number[];

// const RiskMap = (props: MapProps) =>
// {

//     mapRef = React.createRef();
//     const [data, setData] = useState<any[]>(props.markerData);
//     const [selectedValue, setSelectedValue] = useState('2030');
//     const [isMounted, setIsMounted] = React.useState(false);
//     function handleDropdownChange(newValue: string)
//     {
//         setSelectedValue(newValue);
//         const markers = riskData.filter((m: any) =>
//             m['decade'] == selectedValue
//         );
//         setData(markers);
//     }

//     function SetViewOnClick()
//     {
//         const map = useMapEvent('click', (e) =>
//         {
//             map.setView(e.latlng, map.getZoom(), {
//                 animate: true,
//             })
//         })
//         return null
//     }

//     const Markers = () =>
//     {
//         const mapRef = useMap();
//         const map = useMapEvents({
//             moveend(e)
//             {
//                 console.log(mapRef.getBounds());
//                 const currDecadeMarkers = riskData.filter((m: any) =>
//                     m['decade'] == selectedValue
//                 );
//                 const markersInBounds = currDecadeMarkers.filter((m: any) =>
//                     mapRef.getBounds().contains(m['latlng']) && m['decade'] == selectedValue
//                 );
//                 setData(markersInBounds);
//             },
//         })
//         return (<div></div>);
//     }

//     return (
//         <div className='bg-white w-1/2 h-1/2 mt-2 ml-2 rounded-md'>
//             <label className='ml-3'>Decade: </label>
//             <Dropdown options={options} onChange={handleDropdownChange} />
//             <div className='text-center font-bold text-xl'>{selectedValue}</div><hr></hr>
//             <div className='mt-3 ml-3 mr-3 mb-4'>
//                 {isMounted && <MapContainer minZoom={3} ref={mapRef} preferCanvas={true} center={[46.1351, -90.1831]} zoom={2} style={{ height: 450, width: "100%" }}>
//                     <TileLayer noWrap={true}
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     {data.map((item: any, index: number) => (
//                         <div key={index}>
//                             {/* <Marker position={[item.latlng.lat, item.latlng.lng]} icon={fontAwesomeIcon}>
//                                         <Popup>
//                                             <strong>Asset Name: </strong>{item.asset} <br />
//                                             <strong>Business Category:</strong> {item.category}
//                                         </Popup>
//                                     </Marker> */}
//                             <CircleMarker fill={true} fillOpacity={100} fillColor={getRiskColor(item.rating)} eventHandlers={{
//                                 mouseover: (event) => event.target.openPopup(),
//                             }}
//                                 color={getRiskColor(item.rating)}
//                                 center={[item.latlng.lat, item.latlng.lng]} radius={9} >
//                                 <Popup>
//                                     <strong>Asset Name: </strong>{item.asset} <br />
//                                     <strong>Business Category:</strong> {item.category}
//                                 </Popup>
//                             </CircleMarker>
//                         </div>
//                     ))}
//                     <Markers />
//                     <SetViewOnClick />
//                 </MapContainer>}
//             </div>
//         </div>
//     )

// }

// export default RiskMap;