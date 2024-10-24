import axios from 'axios';
import {urlStringObj} from "../config/commonFunctions/getQueryStringParams.js"

export const FetchQuestionDataApi = async (payLoads,getURLString) => { 

  let BASE_API_URL = process.env.REACT_APP_API_URL+'/app/api/practiceQueDataFetchApiGeneric.php';  
  if (getURLString?.domainType == 2) {
     BASE_API_URL = process.env.REACT_APP_MONGO_URL; 
  }
  const {clientId,userId} = getURLString; 

 
  const payload = {
    dev: 10,
    platform: "android",
    app_flag: 11,
    app_type: "mycoach",
    client_id: clientId,
    version: 93,
    device_id: "587831233a4827f7",
    device_details: "MANUFACTURER=samsung MODEL=SM-E225F RELEASE=13 SDK=TIRAMISUDevice Id TP1A.220624.014",
    user_type: 0,
    user_idd: userId,
    user_id: userId,
    beta_idd: userId,
    beta_id: userId,
    cms_id: userId,
    jwtToken:urlStringObj.jwtToken,
    payLoads // Adding payLoads dynamically to the payload,
  };
  const queryString = Object.keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&');
 
  try {
    const response = await axios.post(
      `${BASE_API_URL}`,
      queryString,
      { 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }, 
      }
    );
    // Return the data instead of setting state
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error so it can be handled elsewhere
  }
};
