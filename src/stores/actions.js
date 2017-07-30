/* 
* @Author: Qi JianWei
* @Date:   2017-06-16 19:37:16
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-22 14:23:35
*/
import ShopTypeAction from './actions/ShopType.js';
import ShopAction from './actions/Shop.js';
import goodAction from './actions/good.js';

export default{
   ...ShopTypeAction,
   ...ShopAction,
   ...goodAction
}