import baseApi from './baseApi';

class DitterService  {
    async postNewDitter(body) {
       return (await baseApi.post('ditters/add', body)).data;
    }

    async getFeed(username) {
        if(username) {
            return (await baseApi.get(`/ditters/feed/${username}`)).data;
        }
       return (await baseApi.get('/ditters/feed')).data;
    }
}

export default new DitterService();