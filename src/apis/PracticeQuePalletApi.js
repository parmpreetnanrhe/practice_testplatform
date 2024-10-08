import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const PracticeQuePalletApi = async (payLoads) => { 

  const payload = {
    payLoads: payLoads,
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
  };
  const queryString = Object.keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&');

  try {
    const response = await axios.post(
      'app/api/practiceQuePalletApiGeneric.php',
      queryString,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        }, 
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error so it can be handled elsewhere
  }

}
