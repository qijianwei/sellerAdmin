<template>
<div class="gridlist-demo-container">
  <mu-grid-list class="gridlist-demo">
    <mu-sub-header>相册展示</mu-sub-header>
    <mu-grid-tile v-for="tile, index in list" :key="index">
      <img :src="'http://localhost:8888/'+tile.path" @click="showDelete(index)"/>
      <span slot="title">{{tile.description}}</span>

    </mu-grid-tile>
  </mu-grid-list>
  <mu-dialog :open="dialog.open" title="Dialog" @close="dialog.open=false">
       是否确定删除
      <mu-flat-button slot="actions" @click="dialog.open=false" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="deletePic" label="确定"/>
   </mu-dialog>
</div>

</template>

<script>
export default {
  data () {
    return {  
      shopId:'',
      popup:{
           open:false,
           position:'top',
           overlay:false,
           message:'',
           error:true
        },
      dialog:{
         open:false
      },
      data:{
         id:'',
         index:-1
      }
     
    }
  },
  methods:{
     showDelete(index){
        this.data.index=index;
        this.dialog.open=true;

     },
      deletePic(){
         this.$store.dispatch('deletePic',{
             $http:this.$http,
             data:{
                 id:this.shopId,
                 gid:this.data.index
             }
         }).then((response)=>{
             if(response.data.code){
                  this.showPopup(true,"删除相册失败",1000); 
             }else{
                this.showPopup(false,"删除相册成功",1000);
                 this.$store.dispatch('getShop',this.$http);
             }
             this.dialog.open=false;
         })
      },
      //提示框
       showPopup(type, message, time) {
          console.log(1213);
            this.popup.error = type;
            this.popup.message = message;
            this.popup.open = true;
            setTimeout(() => {
                this.popup.open = false;
            }, time);
        }
 },
 created(){
      this.$store.dispatch('getShop',this.$http);
 },
  computed:{
      list(){
       // console.log(this.$route.params.id)
          let _this=this;
          this.shopId=_this.$route.params.id;
          //console.log(this.shopId);
          /*console.log(  this.$store.getters.APP_shop.filter(function(item){
                 return item._id==_this.$route.params.id;
          })[0].gallery);*/
          return this.$store.getters.APP_shop.filter(function(item){
                 return item._id==_this.$route.params.id;
          })[0].gallery;
      }
  }


}
</script>


<style>
 .gridlist-demo-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.gridlist-demo{
  width: 500px;
  height: 450px;
  overflow-y: auto;
}

</style>

