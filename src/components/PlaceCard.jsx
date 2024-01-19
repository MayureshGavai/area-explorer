import React from 'react'
import { AiFillStar } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";




const PlaceCard = ({place, selected, refProp}) => {

    if(selected) refProp?.current?.scrollIntoView({behaviour:'smooth', block:'start'})

  return (
    <div className='w-full py-2 px-3 rounded-xl border-2'>
        <div className='h-40'>
            <img 
                className='w-full h-full object-cover rounded-xl'
                src={ place.photo ? place.photo.images.original.url : 'https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-restaurant.png'}  alt={place?.name} 
            />
        </div>
        <div className='mt-3'>
            <h1 className='font-medium text-xl my-2'> {place?.name} </h1>
            <div className='flex justify-between'>
                <span className='flex items-center'>
                  <AiFillStar className='text-yellow-400 mr-1' /> {place?.rating}
                </span>
                <span>
                    Price Range : {place.price_level ? place.price_level : '$'}
                </span>
            </div>
            
            <div className='my-2'>
                {place?.ranking}
            </div>

            <div className='flex flex-wrap my-1 w-full'>
                {
                    place?.cuisine?.map(({name,idx})=>{
                        return (
                            <span key={idx} className='py-.5 px-2 mr-2 mt-1 rounded-full bg-emerald-600 text-white'>
                                {name}
                            </span>
                        )
                    })
                }
            </div>

            <div className='flex items-start my-2'>
                {/* <HiLocationMarker className='mr-4 text-xl' />  */}
                <FaLocationDot className='mr-2 pt-2'/>
                {place?.address}
            </div>

            <div className='flex items-start my-2'>
                <FaPhoneAlt className='mr-2 pt-2' />
                {place?.phone}
            </div>

            <div className='flex justify-between'>
                <button 
                    className='w-full border hover:bg-emerald-600 hover:text-white mr-2 p-2 rounded-full' 
                    onClick={()=>window.open(place?.web_url, '_blank')}
                >
                    Trip Advisor
                </button>
                <button 
                    className='w-full border hover:bg-emerald-600 hover:text-white ml-2 p-2 rounded-full' 
                    onClick={()=>window.open(place?.website, '_blank')}
                >
                    Website
                </button>
            </div>
        </div>
    </div>
  )
}

export default PlaceCard