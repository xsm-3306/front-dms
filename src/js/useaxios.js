import axios from "axios";

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
