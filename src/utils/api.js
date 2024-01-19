import axios from "axios";

// const {data : {data}} = await axios(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{


export const fetchPlaceData = async ( type, sw, ne) => {
    try {
        const {data : {data}} = await axios(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
            params:{
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
            },
            headers:{
                'x-rapidapi-key' : import.meta.env.VITE_TRAVEL_API,
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            },
        })
        return data 
    }catch(error){
        console.log(error)
    }
}

// const options = {
//     method: 'GET',
//     url: 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary',
//     params: {
//       bl_latitude: '11.847676',
//       bl_longitude: '108.473209',
//       tr_longitude: '109.149359',
//       tr_latitude: '12.838442',
//       limit: '30',
//       currency: 'USD',
//       subcategory: 'hotel,bb,specialty',
//       adults: '1'
//     },
//     headers: {
//       'X-RapidAPI-Key': '34847b1ee6mshfd0ea5ea8ac5b45p1926d1jsnc4cd47254e0f',
//       'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//     }
//   };
  
  
//   export const fetchPlaceData = async () => {
//       try {
//           const response = await axios.request(options);
//           console.log(response.data);
//       } catch (error) {
//           console.error(error);
//       }
      
// }