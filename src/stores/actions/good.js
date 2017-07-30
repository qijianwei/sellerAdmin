/* 
* @Author: Qi JianWei
* @Date:   2017-06-21 15:40:49
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-22 13:09:52
*/
import {API} from '../API';
import QS from 'qs';
export default{
    //获取商品信息
    getGood(store, $http) {
        $http.get(API.admin.goods.list ).then((response) => {
            //ajax请求以后，通知mutation更新数据
            store.commit('update_APP_good', response.data);
        });
    },

    addGood(store,{$http,data}){
     
       return $http({
                 method:'post',
                 url:API.admin.goods.add,
                 data:QS.stringify(data)
             });
       
    },
    //编辑食品
     editGood1(store,{$http,data}){
       // console.log(1);
          return $http({
               method:'post',
               url:API.admin.goods.edit,
               data:QS.stringify(data)
          });
     },
     //删除商品
     deleteGood(store,{$http,data}){
             return $http({
                method:'get',
                url:API.admin.goods.delete,
                params:data
             });
     },
     uploadFile(store,{$http,data}){
       // console.log(111);
          let fm=new FormData();
          fm.append('id',data.id);
          fm.append('cover',data.cover);
        // console.log(data.id);
            return $http({
                 method:'post',
                 url:API.admin.goods.cover,
                 data:fm
            });
     } 

}