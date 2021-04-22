import axiosClient from "./axiosClient";
const url = '/users';
class UserApi {

    login = (body) => {
        return axiosClient.post(`${url}/login`, body);
    }
}
const userApi = new UserApi();
export default userApi;