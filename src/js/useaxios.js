import axios from "axios";

axios.defaults.timeout=10000
axios.defaults.baseURL='http://192.168.37.149:8081'

export function usePost(api,headers={},data={}){                     
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            url:api,
            headers:headers,
            data:data,
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    });
}
