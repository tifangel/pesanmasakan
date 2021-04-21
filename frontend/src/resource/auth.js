const { defaultAPIURL } = require("../config");

export const getMyProfile = async () =>
  new Promise(async (resolve, reject) => {    
    try {
      const token = localStorage.getItem('token')
      let response = await fetch(`${defaultAPIURL}/myprofile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      response = response.json()

      resolve(response);
    } catch (e) {
      reject(e);
    }
  });

export const loginwarung = async (data) =>
  new Promise(async (resolve, reject) => {    
    try {
      let response = await fetch(`${defaultAPIURL}/getpenjual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      response = response.json()

      resolve(response)
    } catch (e) {
      reject(e);
    }
  });

export const loginuser = async (data) =>
  new Promise(async (resolve, reject) => {    
    try {
      let response = await fetch(`${defaultAPIURL}/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      response = response.json()

      resolve(response)
    } catch (e) {
      reject(e);
    }
  });