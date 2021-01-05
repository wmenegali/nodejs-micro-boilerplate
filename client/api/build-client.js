import axios from 'axios';

export default ({req}) => {
  if (typeof window === 'undefined') {
    // We're on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local', 
      headers: req.headers
    });
  } else {
    // Browser
    return axios.create();
  }
};