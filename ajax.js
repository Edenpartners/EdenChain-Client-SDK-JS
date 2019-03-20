/*
    Ajax utilities
*/

import axios from 'axios';

// export instance.  
export const axInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});


// for convinient, response is modified.
axInstance.interceptors.response.use((response => {
    if (response.data.error)
    {     
      return {
        ...response,
        isSuccess: false
      }
    }
    else
      return {
        ...response,
        isSuccess: true
      }
  }),
    (error => {
      let result = {
        isSuccess: false
      }
         
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return {
          ...result,
          request: error.request,
          status: error.response.status,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return {
          ...result,
          request: error.request,
          status: null,
          data: null
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        return {
          ...result,
          request: null,
          status: null,
          data: null
        }
      }
      // return Promise.reject(error);
  }));
  

  