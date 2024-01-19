import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import '../App.css'
import { FaLocationDot } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";



// const Marker = ({ lat, lng, text }) => (
//   <div style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}>
//     <div
//       style={{
//         color: 'white',
//         background: 'red',
//         padding: '10px 15px',
//         display: 'inline-flex',
//         textAlign: 'center',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: '100%',
//         zIndex: '12'
//       }}
//     >
//       {text}
//     </div>
//   </div>
// );

const AnyReactComponent = ({ text, image, rating }) => 
      <div className="flex flex-col justify-start p-2 w-28 rounded-md bg-white border cursor-pointer">
        <div className='h-14'>
          <img className='w-full h-full object-cover rounded-md' src={image} alt="{text}" />
        </div>
        <h1 className='text-sm font-semibold px-1 my-1'>{text}</h1>
        <div className='flex items-center text-sm px-1'>
          <AiFillStar className='text-yellow-400 mr-1' /> {rating}
        </div>
        
      </div>;




const Map = ({coords, setCoords, setBounds, places, setChildClicked}) => {

  return (
    
    <div  className='h-screen w-2/3 sticky top-0 z-10 hidden md:block'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAP_KEY}}
        defaultCenter={{lat: 19.076090, lng: 72.877426}}
        center={coords}
        defaultZoom={15}
        onChange={(e) => {
          console.log(e)
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {places.length && places?.map((place,idx)=>{
          return (
            // <Marker 
            //   key={idx}
            //   lat={Number(place.latitude)}
            //   lng={Number(place.longitude)} 
            //   text={place?.name}
            // >
            //   <FaLocationDot className='z-10 text-red-600'/>
            // </Marker>

            <AnyReactComponent
              key={idx}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              text={place?.name}
              image={place.photo ? place.photo.images.large.url : 'https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png'}
              rating={place?.rating}
              onClick={(e)=>setChildClicked(e)}
            />

            // <div 
            //   key={idx}
            //   lat={Number(place.latitude)}
            //   lng={Number(place.longitude)}
            //   // style={{width:'20px', position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },}}
            //   className='marker'
            // >
            //   <h1 className='p-1 bg-white text-black'>{place?.name}</h1>
            // </div>
          )
        })}
        
      </GoogleMapReact>
    </div>
  )
}

export default Map