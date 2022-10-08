import { usePost } from "./useaxios";

//获取实例下可用的数据库列表
export function getDbList(username,dbnum)(asd){
    let data={
        username:username,
        dbnum:dbnum,
    }
    let api='http://127.0.0.1:8081/api/getdblist'
    let headers={
        'Content-Type': 'multipart/form-data',
    }

    usePost(api,headers,data)
    .then(res=>{
        console.log(res.data.data,res.data.msg)
    })
    .catch(err=>{
        console.log(err)
    })
}