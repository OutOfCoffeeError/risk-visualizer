import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic';
// import DataTable from './table';
import Navbar from '../components/navbar';
import LineChart from '../components/RiskChart';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

function Index() {
  const Map = dynamic(
    () => import('../components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false 
    } // This line is important. It's what prevents server-side render
  )
  return (<div>
    <Navbar></Navbar>
    <Map />
    </div>)
}

export default Index
