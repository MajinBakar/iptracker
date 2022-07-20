import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import Axios from 'axios';
import L from "leaflet";
import mark from '../assets/img/icon-location.svg'

const apiURL = 'https://geo.ipify.org/api/v1?apiKey='
const apiKey = process.env.REACT_APP_API_KEY;


const Home = () => {
  const [input, setInput] = useState('')
  const [city, setCity] = useState('')
  const [ip, setIp] = useState('')
  const [region, setRegion] = useState('')
  const [timezone,setTimezone] = useState('')
  const [isp,setIsp] = useState('')
  const [lat,setLat] = useState(40.8054)
  const [lng,setLng] = useState(-74.0241)

  const blackIcon = L.icon({
    iconUrl: mark,
    iconSize: [23, 28],
    iconAnchor: [12, 14],
    popupAnchor: [0, 0],
});
 
  const handleChange = (event) => {
    setInput(event.target.value)
    event.target.reset()
  }

  const onSubmit = (e) => {
    e.preventDefault();
    Axios.get(apiURL+apiKey+'&ipAddress='+input+'&domain='+input).then((res) => {
      setCity(res.data.location.city);
      setIp(res.data.ip);
      setRegion(res.data.location.region);
      setTimezone(res.data.location.timezone);
      setIsp(res.data.isp);
      setLat(res.data.location.lat);
      setLng(res.data.location.lng);
      
    
    });
  }

  function UpdateMapCentre(props) {
    const map = useMap();
    map.panTo(props.mapCentre);
    return null;
  }

  useEffect(() => {
    Axios.get(apiURL+apiKey).then((res) => {
      setCity(res.data.location.city);
      setIp(res.data.ip);
      setRegion(res.data.location.region);
      setTimezone(res.data.location.timezone);
      setIsp(res.data.isp);
      setLat(res.data.location.lat);
      setLng(res.data.location.lng)
    
    });
  }, [])
 
  return (
    <div className='flex flex-col font-Rubik h-screen w-screen overflow-x-hidden '>
        <div className='flex flex-col items-center h-[22rem] w-screen bg-hero-pattern bg-cover'>
            <h1 className=' text-white text-2xl text-center pt-4 font-medium tracking-wide'>IP Address Tracker</h1>
            <div className='flex pt-6 sm:pt-8'>
                <form className='flex w-screen justify-center'>
                <input type="text" onChange={handleChange} className='w-[80%] sm:w-[26rem] h-12 rounded-l-md border-0 pl-2 sm:px-5 focus:outline-0' placeholder='Search for any IP address or domain'/>
                <button type='submit' onClick={onSubmit} className='flex h-12 w-12 bg-black rounded-r-md justify-center items-center cursor-pointer hover:bg-[#343333] transition-all duration-300 ease-in-out'>
                <svg className='h-4 w-3'><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>            
                </button>
                </form>
            </div>
            <div className='absolute flex flex-col sm:flex-row top-40 w-[90%] sm:w-[95%] lg:w-5/6 sm:h-40 rounded-md bg-slate-50 pt-1 pb-2 sm:py-6 px-5 font-Rubik z-[999] drop-shadow-2xl'>
                <div className='sm:w-1/4 pl-0 sm:pl-1 lg:pl-2 pb-1 sm:pb-0 text-center sm:text-start'>
                <h2 className='font-medium text-xs sm:text-sm text-gray-600'>IP ADDRESS</h2>
                <p className='md:text-xl xl:text-2xl font-medium sm:pt-3'>{ip}</p>
                </div>
                <div className='sm:w-1/4 relative pb-1 sm:pb-0 sm:pl-2 lg:pl-6 text-center sm:text-start'>
                <h2 className='font-medium text-sm text-gray-600 sm:before:content-[""] sm:before:absolute sm:before:left-0 sm:before:w-[0.10rem] sm:before:h-[5.5rem] sm:before:bottom-0 sm:before:top-0 sm:before:my-auto sm:before:bg-slate-300'>LOCATION</h2>
                <p className='md:text-xl xl:text-2xl font-medium sm:pt-3'>{city},<br />{region}</p>
                </div>
                <div className='sm:w-1/4 sm:pl-2 lg:pl-6 pb-1 sm:pb-0 relative text-center sm:text-start'>
                <h2 className='font-medium text-sm text-gray-600 sm:before:content-[""] sm:before:absolute sm:before:left-0 sm:before:w-[0.10rem] sm:before:h-[5.5rem] sm:before:bottom-0 sm:before:top-0 sm:before:my-auto sm:before:bg-slate-300'>TIMEZONE</h2>
                <p className='md:text-xl xl:text-2xl font-medium sm:pt-3'>UTC{timezone}</p>
                </div>
                <div className='sm:w-1/4 sm:pl-2 lg:pl-6 relative text-center sm:text-start'>
                <h2 className='font-medium text-sm text-gray-600 sm:before:content-[""] sm:before:absolute sm:before:left-0 sm:before:w-[0.10rem] sm:before:h-[5.5rem] sm:before:bottom-0 sm:before:top-0 sm:before:my-auto sm:before:bg-slate-300'>ISP</h2>
                <p className='md:text-xl xl:text-2xl font-medium sm:pt-3'>{isp}</p>
                </div>
            </div>

          </div>    
        <div  className='flex basis-full w-screen'>
        <MapContainer
      center={[lat,lng]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <UpdateMapCentre mapCentre={[lat,lng]} />
            <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
 
      <Marker position={[lat,lng]} draggable={false} animate={true} icon={blackIcon}>
      </Marker>
    </MapContainer>
        
        </div>
        
    </div>
  )
}

export default Home