import axios from 'axios';
import LocalStorage, { Keys, } from '../utils/localStorage';

function addAuthTokenToRequest(headers) {
  const token = LocalStorage.get(Keys.jwtToken);
  if (token) {
    return Object.assign({}, headers || {}, {
      Authorization: `${token}`,
    });
  }
  return headers || {};
}


class ApiBase {
  constructor() {
    this.ditterAxios = axios.create({
      baseURL: 'https://ditter-backend.herokuapp.com/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });
  }

  get(path, params = {}, headers = {}) {
    return this.ditterAxios.get(path, {
      params,
      headers: addAuthTokenToRequest(headers),
    }).catch((err) => {
      return err;
    });
  }

  post(path, data = {}, params = {}, headers = {}) {
    return this.ditterAxios.post(path, data, {
      params,
      headers: addAuthTokenToRequest(headers),
    }).catch( (err) => {
        return err;}
    );
  }
}

export default new ApiBase();
