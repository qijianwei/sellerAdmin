/* 
* @Author: Qi JianWei
* @Date:   2017-06-16 15:19:16
* @Last Modified by:   Qi JianWei
* @Last Modified time: 2017-06-22 14:30:17
*/

export default{
      UI_open_toggle(state){
        state.UI.open=!state.UI.open;
      },
      update_APP_shopType(state,data){
         state.APP.shopType=data;
      },
      update_APP_shop(state,data){
         state.APP.shop=data;
      },
       update_APP_good(state,data){
         state.APP.good=data;
      },

}