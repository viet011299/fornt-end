import axiosClient from "./axiosClient";
const url = '/building';
class BuildingApi {
    getAll = (params) => {
   
        return axiosClient.get(url, { params });
    };
    create = (body)=>{
      
        return axiosClient.post(url,body);
    }
    edit = (id,body)=>{
        
        return axiosClient.put(`${url}/${id}`,body);
    }
    delete = (id,body)=>{
        return axiosClient.delete(`${url}/${id}`,body);
    }
    
    read = (id)=>{
        return axiosClient.get(`${url}/${id}`);
    }
}
const buildingApi = new BuildingApi();
export default buildingApi;