import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { decryptPassword, encryptPassword } from '../config/commonFunctions/decryptPassword';

export const PracticeQuePalletApi = async (payLoads) => { 
  
  const BASE_API_URL = process.env.REACT_APP_API_URL;
  const encryString = decryptPassword(payLoads);
  const updatedQueryString = encryString.replace("sortingType=descending", "sortingType=ascending");   
  const payLoadsNew = encryptPassword(updatedQueryString); 

  const payload = {
    payLoads: payLoadsNew,
    dev: 10,
    platform: "android",
    app_flag: 11,
    app_type: "mycoach",
    client_id: 5480,
    version: 93,
    device_id: "587831233a4827f7",
    device_details: "MANUFACTURER=samsung MODEL=SM-E225F RELEASE=13 SDK=TIRAMISUDevice Id TP1A.220624.014",
    user_type: 0,
    user_idd: 496956,
    user_id: 496956,
    beta_idd: 496956,
    beta_id: 496956,
    cms_id: 496956,
    sortingType: "ascending"
  };

  const queryString = new URLSearchParams(payload).toString();

  try {
    const response = await axios.post(`${BASE_API_URL}/app/api/practiceQuePalletApiGeneric.php`, queryString, {
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
