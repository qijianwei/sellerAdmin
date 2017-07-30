/* 
* @Author: Qi JianWei
* @Date:   2017-06-19 16:37:53
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-25 01:29:07
*/
import {API} from '../API';
import QS from 'qs';

export default{
    //获取所有的商家类型信息
    getShop(store,$http){
        //ajax请求
       $http.get('http://localhost:8888/admin/shop').then((response)=>{
           store.commit('update_APP_shop',response.data);
       });
    },
    //添加商户
     addShop(store,payload){
          let config = {
               headers: {'content-type': 'application/x-www-form-urlencoded'}
              };
        return new Promise(function(resolve,reject){
               payload.$http.post('http://localhost:8888/admin/shop/add','name='+payload.name+'&type='+payload.type+'&phone='+payload.phone+'&address='+payload.address+'&description='+payload.description,config).then((response)=>{
                           if(response.data.code){
                               reject(response.data);
                           }else{
                              resolve(response.data);
                           }
                 });
         });
    },
    //删除商户
    deleteShop(store,payload){
    
        return payload.$http.get('http://localhost:8888/admin/shop/delete?id='+payload.id);
    
    },
     //编辑指定ID的商户
    editShop(store,payload){
      //  console.log(payload.data.name);
        let config={
            headers:{'content-type':'application/x-www-form-urlencoded'}
        };
        //console.log(payload);
        return new Promise(function(resolve,reject){
            payload.$http.post('http://localhost:8888/admin/shop/edit','id='+payload.data.id+'&name='+payload.data.name+'&type='+payload.data.type+'&phone='+payload.data.phone+'&address='+payload.data.address+'&description='+payload.data.description,config).then((response)=>{
                  //成功还是失败要自己根据返回的状态码判断
                  console.log(response);
                  if(!response.data.name){
                   //  console.log(22);
                     reject(response.data);
                  }else{
                   // console.log(11);
                     resolve(response.data);
                  }
            });
        });
    },
    //上传图片
    uploadFile(store,payload){
       //console.log(axios);
       //console.log(Qs);
      // console.log(payload.cover);
       var formdata = new FormData();
       formdata.append('id',payload.id);
       formdata.append('cover',payload.cover);

      // console.log(qs.stringfy(formdata));
     //  console.log(payload.Id);
       //console.log(qs.stringfy(formdata));
     /*  return payload.$http.post('http://localhost:8888/admin/shop/cover',formdata,{
             methods:'post',
             headers:{'content-type': 'application/x-www-form-urlencoded'},
  
        });
      */
        let config={
            headers:{'content-type':'application/x-www-form-urlencoded'}
        };
        //console.log(payload);
        return   payload.$http.post('http://localhost:8888/admin/shop/cover',formdata,config);
          
    },
      //上传相册
    uploadPics(store,{$http,data}){
      //console.log('hahaha');
     // console.log(data);
        let fm=new FormData();
        fm.append('id',data.id);
        for(let i=0;i<data.pic.length;i++){
           fm.append('description',data.description[i]);
           fm.append('pic',data.pic[i]);
        }
       
        //return $http()
          return $http({
                 method:'post',
                 url:API.admin.shop.uploadPic,
                 data:fm
            });

     },
     deletePic(store,{$http,data}){
      console.log(QS.stringify(data));
         return $http({
             method:'get',
             url:API.admin.shop.deletePic,
             params:data
         });
     }
}