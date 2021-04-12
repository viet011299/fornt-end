import axiosClient from "./axioxClient";

class BuildingApi {
    getAll = (params) => {
        const url = '/building';
        return axiosClient.get(url, { params });
    };
    create = (body)=>{
        const url = '/building';
        return axiosClient.post(url,body);
    }
    edit = (id,body)=>{
        const url = `/building/${id}`;
        return axiosClient.put(url,body);
    }
    delete = (id,body)=>{
        const url = `/building/${id}`;
        return axiosClient.delete(url,body);
    }
    read = (id)=>{
        const url = `/building/${id}`;
        return axiosClient.get(url);
    }
}
const buildingApi = new BuildingApi();
export default buildingApi;