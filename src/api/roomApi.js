import axiosClient from "./axiosClient";
const url = '/room';
class RoomApi {
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
const roomApi = new RoomApi();
export default roomApi;