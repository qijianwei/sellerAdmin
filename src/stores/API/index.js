/* 
* @Author: Qi JianWei
* @Date:   2017-06-21 13:40:33
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-22 16:25:04
*/

const H='http://localhost:8888/';
//常量命名不能冲突，所以不能export const H
export const HOST=H;
export const API={
    admin:{
         shopType:{
              list:H+'admin/shoptype',
              add:H+'admin/shoptype/add'
         },
         shop: {
            list: H + 'admin/shop',
            add: H + 'admin/shop/add',
            uploadCover: H + 'admin/shop/cover',
            uploadPic:H+'admin/shop/gallery',
            deletePic:H+'admin/shop/gallery/delete'

        },
        goods:{
           list:H+'admin/goods',
           add:H+'admin/goods/add',
           edit:H+'admin/goods/edit',
           delete:H+'admin/goods/delete',
           cover:H+'admin/goods/cover'
        }
    }
}