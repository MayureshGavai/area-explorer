import React, { createRef, useContext, useEffect, useState } from 'react'
import { Autocomplete } from '@react-google-maps/api';
import PlaceCard from './PlaceCard';
import Header from './Header';
import {MagnifyingGlass} from 'react-loader-spinner'
import { IoSearch } from "react-icons/io5";



const LocationList = ({onLoad, onPlaceChanged ,isLoading, childClicked, places, type, setType, rating, setRating}) => {

    // const [type, setType] = useState('restaurants');
    // const [rating, setRating] = useState('');

    const [elRefs, setElRefs] = useState([]);   

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);

    // const places = [
    //     {name : 'asas'},
    //     {name : 'tyui'},
    //     {name : 'cvb'},
    //     {name : 'ikm'},
    //     {name : 'wert'},
    //     {name : 'iop'},
    //     {name : 'nbx'},
    // ]
  
  return (
    <div className='flex flex-col w-full overflow-y-scroll md:w-1/3'>
      <Header/>
            <Autocomplete onLoad={onLoad}  onPlaceChanged={onPlaceChanged}>
                <div className='mx-4 mt-2 p-2 rounded-md border flex items-center justify-between'>
                    <input className='outline-none w-full' type="text" placeholder='Search' />
                    <IoSearch />
                </div>
            </Autocomplete>
        <div className='py-4 px-4  w-full flex items-center'>
                {/* <h1 className='font-semibold text-xl'>See Place Around You</h1> */}
                <div className='flex mx-2 items-center'>
                    <label htmlFor="">Type</label>
                    <select className='ml-2 p-1 border rounded-md ' name="type" value={type} onChange={(e)=>setType(e.target.value)}>
                        <option value="restaurants">Restaurants</option>
                        <option value="hotels">Hotels</option>
                        <option value="attractions">Attractions</option>
                    </select>
                </div>
                <div className='flex mx-2 items-center'>
                    <label htmlFor="">Rating</label>
                    <select className='ml-2 p-1 border rounded-md ' name="rating" value={rating} onChange={(e)=>setRating(e.target.value)}>
                        <option value="">All</option>
                        <option value="3">Above 3.0</option>
                        <option value="4">Above 4.0</option>
                        <option value="4.5">Above 4.5</option>
                    </select>
                </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 p-3'>
            {
                isLoading ? (
                    <div className='h-screen flex items-center justify-center'>
                        <MagnifyingGlass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="magnifying-glass-loading"
                            wrapperStyle={{}}
                            wrapperClass="magnifying-glass-wrapper"
                            glassColor="#c0efff"
                            color="#047857"
                        />
                    </div>
                ) : (
                    <>
                        {
                    places && places.map((place,idx)=>{
                        return (
                            <React.Fragment key={idx} ref={elRefs[idx]}>
                                <PlaceCard 
                                    place={place}
                                    selected = {Number(childClicked) === idx}
                                    refProp = {elRefs[idx]}
                                    />
                            </React.Fragment>
                        )
                    })
                }
                    </>
                )
                    
            }
        </div>
    </div>
  )
}

export default LocationList