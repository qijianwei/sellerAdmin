
/* 
* @Author: Qi JianWei
* @Date:   2017-06-16 19:37:16
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-21 13:55:53
*/
import QS from 'qs';
import {API} from'../API';

export default{
    //获取所有的商家类型信息
    getShopTypes(store,$http){
        //ajax请求
       $http.get(API.admin.shopType.list).then((response)=>{
           store.commit('update_APP_shopType',response.data);
       });
    },
    //删除指定ID的商户
    deleteShopType(store,payload){
       return payload.$http.get('http://localhost:8888/admin/shoptype/delete?id='+payload.id);
    },
    //提交新的商家类型
    addShopType(store,payload){
      let config = {
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        };
       return new Promise(function(resolve,reject){
               payload.$http.post('http://localhost:8888/admin/shoptype/add','name='+payload.data.name,config).then((response)=>{
                   // console.log(response);
                    if(!response.data.name){
                        //状态码不为0，数据获取失败，then的第二个参数接收
                        //then的两个参数均为函数
                       reject(response.data)
                    }else{
                       //如果状态码是0,获取数据成功，then的第一个参数接收
                       resolve(response.data);
                      // console.log("成功了"+response.data);
                    }
          });
      
      });
    },

    //编辑指定ID的商户
    editShopType(store,payload){
      //  console.log(payload.data.name);
        let config={
            headers:{'content-type':'application/x-www-form-urlencoded'}
        };
        return new Promise(function(resolve,reject){
            payload.$http.post('http://localhost:8888/admin/shoptype/edit','id='+payload.data.id+'&name='+payload.data.name,config).then((response)=>{
                  //成功还是失败要自己根据返回的状态码判断
                 // console.log(response);
                  if(!response.data.name){
                   //  console.log(22);
                     reject(response.data);
                  }else{
                   // console.log(11);
                     resolve(response.data);
                  }
            });
        });
    }

}