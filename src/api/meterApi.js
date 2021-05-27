import axiosClient from "./axiosClient";
const url = '/meter';
const queryString = require('query-string');
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

    read = (meterId,query) => {
        
        return axiosClient.get(`${url}/${meterId}?${queryString.stringify(query)}`);
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