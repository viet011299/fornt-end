import axiosClient from "./axiosClient";
const url = '/meter';
class MeterApi {
    getAll = (params) => {
        return axiosClient.get(url, { params });
    };
    create = (body) => {

        return axiosClient.post(url, body);
    }
    edit = (id, body) => {
        return axiosClient.put(`${url}/${id}`, body);
    }
    delete = (id, body) => {
        return axiosClient.delete(`${url}/${id}`, body);
    }

    read = (meterId) => {
        return axiosClient.get(`${url}/${meterId}`);
    }

    getBuildings = () => {
        return axiosClient.get(`/buildings${url} `);
    }
    getAllMeterRom = () => {
        return axiosClient.get(`/get-all${url} `);
    }
}
const meterApi = new MeterApi();
export default meterApi;