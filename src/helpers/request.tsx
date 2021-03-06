import axios from 'axios';

const agent = axios.create({
  baseURL: 'https://9574efaf.ngrok.io/',// 192.168.1.101:3000  10.10.3.28:3000  https://775835db.ngrok.io/ https://jsonplaceholder.typicode.com/
  headers: {
    'Content-Type': 'application/json'
  }
});

const send = ( method: any, url:string, data?:object, params?:string, token?:string, responseType?:any ): any => {
  const headers = token ? {
    Authorization: `Bearer ${token}`
  } : {};
  return agent.request({
    method,
    url,
    headers,
    data,
    params,
    responseType: responseType || 'json'
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx.
      throw new Error(error.response.data.error);
    } else if (error.request) {
      // The request was made but no response was received.
      throw new Error('OOPS');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('OOPS');
    }
  });
};

export default { send }