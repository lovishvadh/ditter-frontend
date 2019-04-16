import baseApi from './baseApi';

class UserService  {
    async login(body) {
        return (await baseApi.post('/users/login', body)).data;
    }

    async signup(body) {
        return (await baseApi.post('/users/signup', body)).data;
    }

    async follow(body) {
        return (await baseApi.post('/users/follow', body)).data;
    }

    async unfollow(body) {
        return (await baseApi.post('/users/unfollow', body)).data;
    }

    async getUserData(username = '') {
       return (await baseApi.get(`/users/data/${username}`)).data;
    }

    async searchUser() {
        await baseApi.post('/users/search');
    }

    async allUsers() {
       return (await baseApi.get(`/users/all`)).data;
    }
}

export default new UserService();
