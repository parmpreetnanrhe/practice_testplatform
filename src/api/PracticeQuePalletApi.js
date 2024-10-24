import axios from 'axios';
import { decryptPassword, encryptPassword } from '../config/commonFunctions/decryptPassword';
import {URLString} from "../config/commonFunctions/getQueryStringParams.js"
import {urlStringObj} from "../config/commonFunctions/getQueryStringParams.js"

export const PracticeQuePalletApi = async (payLoads, getURLString) => { 

  let BASE_API_URL = process.env.REACT_APP_API_URL + '/app/api/practiceQuePalletApiGeneric.php';  
  console.log('getURLString', getURLString)
  let payLoadsNew;
  if (getURLString?.domainType == 2) {
    console.log('getURLString', getURLString)
    BASE_API_URL = process.env.REACT_APP_MONGO_URL;
    payLoadsNew = payLoads;
  } else {
    const encryString = decryptPassword(payLoads);
    const updatedQueryString = encryString.replace("sortingType=descending", "sortingType=ascending");
    payLoadsNew = encryptPassword(updatedQueryString);
  }
  const {clientId,userId} = getURLString; 

  const payload = {
    payLoads: payLoadsNew,
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
    sortingType: "ascending",
    jwtToken:urlStringObj.jwtToken
  };

  const queryString = new URLSearchParams(payload).toString();

  try {
    const response = await axios.post(`${BASE_API_URL}`, queryString, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error so it can be handled elsewhere
  }
}
