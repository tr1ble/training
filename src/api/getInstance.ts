import axios from "axios";
import CONFIG from "global/config";

//import { getApiToken } from "features/auth/helpers/authStorage";

export default async function getInstance() {
  //const token = await getApiToken();

  return axios.create({
    baseURL: CONFIG.API_URL,
    headers: {
      "Access-Control-Allow-Origin": '*',
      'X-Requested-With': 'XMLHttpRequest',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
      /* 'Access-Control-Allow-Headers':
        'Origin, Access-Control-Allow-Headers, Content-Type, X-Auth-Token', */
      //Authorization: `Bearer ${token}`,
    }
  });
}
