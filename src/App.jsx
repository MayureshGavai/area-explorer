import React, { useEffect, useState } from 'react'
import Map from './components/Map'
import LocationList from './components/LocationList';
import { fetchPlaceData } from './utils/api';

const App = () => {

  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [childClicked, setChildClicked] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  // Current Location 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  // Filterise on Rating
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  // Data fetching
  useEffect(()=> {
    console.log(bounds)
    setIsLoading(true)
    fetchPlaceData(type, bounds.sw, bounds.ne)
      .then((data)=>{
        setPlaces(data.filter((place)=>place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setRating('')
        setIsLoading(false)
        console.log(data)
      })
  },[coords,bounds, type])

  const onLoad = (autoC) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <div className='w-full h-full flex justify-between'>
      <LocationList
        onLoad = {onLoad}
        onPlaceChanged = {onPlaceChanged}
        isLoading = {isLoading}
        childClicked = {childClicked}
        places = {filteredPlaces.length ? filteredPlaces : places}
        type= {type}
        setType = {setType}
        rating = {rating}
        setRating = {setRating}
      />
      <Map
        coords={coords}
        setCoords={setCoords}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
        setChildClicked = {setChildClicked}
      />
    </div>
  )
}

export default App