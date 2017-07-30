<template>
  <div>
     <mu-raised-button label="列表" class="demo-raised-button" :primary="focus=='list'"
                      @click="tab('list')"/>
     <mu-raised-button label="添加" class="demo-raised-button" :primary="focus=='add'"
                      @click="tab('add')"/>
       <div class="listContent" v-if="focus=='list'">
          <mu-table multiSelectable enableSelectAll @rowSelection="rowSelection">
              <mu-thead>
                <mu-tr>
                  <mu-th tooltip="ID">商户头像</mu-th>
                  <mu-th tooltip="名称">商户名称</mu-th>
                  <mu-th tooltip="名称">商品</mu-th>
                  <mu-th tooltip="状态">操作</mu-th>
                </mu-tr>
              </mu-thead>
              <mu-tbody>
                <mu-tr  :key="" v-for="list in goodList">
                  <mu-td>
                    <img v-if="list.cover" style="width: 100px; height: 60px;" :src="'http://localhost:8888/'+ list.cover" alt="">
                 </mu-td>
                  <mu-td>{{list.name}}</mu-td>
                   <mu-td>{{list.shop.name}}</mu-td>
                  <mu-td>   
                      <mu-raised-button label="编辑" class="demo-raised-button" secondary @click.native.stop="showEditGood(list)" />
                      <mu-raised-button label="商品图" class="demo-raised-button" secondary @click.native.stop="showUploadPic(list._id)"/>
                  </mu-td>
                </mu-tr>
              </mu-tbody>
            </mu-table>
            <mu-raised-button label="批量删除" class="demo-raised-button" :primary="focus=='list'"
                      @click.native.stop="deleteGood"/>
     </div>
      <div class=" " v-if="focus=='add'">
         <form>
            <h4>类别名称</h4>
            <p>
                <mu-text-field label="商品名称" labelFloat v-model="addGoodData.goodname"/><br/>
            </p>
            <mu-select-field v-model="addGoodData.id" :labelFocusClass="['label-foucs']" label="选择商户类型">
                <mu-menu-item v-for="(text,index) in datalist" :key="index" :value="index" :title="text.name" />
            </mu-select-field><br/>
            <p>
                <mu-raised-button class="demo-raised-button" label="添加" secondary @click="addGood"/>
            </p>
         </form>
    </div>
    <mu-popup :position="popup.position" :overlay="popup.overlay" :popupClass="{'demo-popup-top': true, error: popup.error}" :open="popup.open">
            {{popup.message}}
    </mu-popup>
    <mu-dialog :open="dialog.open" title="修改菜名" @close="dialog.open=false">
            <form>
                <h4>类别名称</h4>
                <p>
                    <mu-text-field v-model="editGood.name" label="修改商品名称" labelFloat/>
                </p>
            </form>
            <mu-flat-button slot="actions" primary @click="editGood1" label="确定"/>
     </mu-dialog>
          <mu-dialog :open="dialog2.open"  @close="dialog2.open=false">
     
              <mu-grid-list class="gridlist-demo" v-show=" uploadData.uploadFileUrl" :cols="12">
                    <mu-sub-header>图片展示</mu-sub-header>
                    <mu-grid-tile :cols="12">
                       <img :src="uploadData.uploadFileUrl"/>
                    </mu-grid-tile>
              </mu-grid-list>
              <p>
               <input type="file" @change="changeFileUrl">
              </p>

          <mu-flat-button slot="actions" primary @click="uploadFile" label="确定"/>
     </mu-dialog>
</div>

</template>



<script>
export default{
   name:'goods',
   data:function(){
       return {
          focus:'list',
          arr:[],
          dialog:{
             open:false
          },
          dialog2:{
            open:false
          },
          addGoodData:{
                goodname:'',
                id:''
          },
          popup:{
               open:false,
               position:'top',
               overlay:false,
               message:'',
               error:true
           },
          editGood:{
             name:'',
             id:'',
             shop:''

          },
           uploadData:{
            uploadFileUrl:'',  //图片地址
            Id:'',
            uploadFile:''
          }
       }
   },
   created(){
       this.$store.dispatch('getShop',this.$http);
       this.$store.dispatch('getGood',this.$http);
   },
   methods:{
      tab(name){
         this.focus=name;
         this.$store.dispatch('getGood',this.$http);
      },
      addGood(){
        //console.log(this.datalist[this.addGoodData.id]);
          this.$store.dispatch('addGood',{
             $http:this.$http,
             data:{
                name:this.addGoodData.goodname,
                shop:this.datalist[this.addGoodData.id]._id
             }
          }).then((response)=>{
             if(response.data.code){
               this.showPopup(true,"添加失败",1000); 
            }else{
               this.showPopup(false,"添加成功",1000); 
               this.$store.dispatch('getGood',this.$http);
            }
          });
      },
      showEditGood(list){
          
           this.editGood.name=list.name;
           this.editGood.id=list._id;
           this.editGood.shop=list.shop._id;
           this.dialog.open=true;
      },
      //编辑商品
      editGood1(){
        //console.log(this.editGood);

        this.$store.dispatch('editGood1',{
             $http:this.$http,
             data:this.editGood
        }).then((response)=>{

            if(response.data.code){
               this.showPopup(true,"编辑失败",1000); 
            }else{
               this.showPopup(false,"编辑成功",1000); 
               this.$store.dispatch('getGood',this.$http);
            }
            this.dialog.open=false;
        });
      },
      //展示上传图片界面
      showUploadPic(id){
        this.dialog2.open=true;
        this.uploadData.id=id;
       //console.log(id);
      },
      //input载入图片时触发
      changeFileUrl(e){
          var fr = new FileReader();
          this.uploadData.uploadFile=e.target.files[0]; //要发送的对象
          fr.onload=()=>{
              this.uploadData.uploadFileUrl=fr.result;//预览用的
          }
          fr.readAsDataURL(this.uploadData.uploadFile);
      },
      uploadFile(){

         this.$store.dispatch('uploadFile',{
            $http:this.$http,
            data:{
               id:this.uploadData.id,
               cover:this.uploadData.uploadFile
            }
         }).then((response)=>{
             if(response.data.code){
                this.showPopup(true,"图片上传失败",1000); 
             }else{
                this.showPopup(false,"图片上传成功",1000); 
               this.$store.dispatch('getGood',this.$http);
             }
             this.dialog2.open=false;
         });
      },
      //批量删除商户
    deleteGood(){
    console.log(this.arr.join(','));
      this.$store.dispatch('deleteGood',{
           $http:this.$http,
           data:{id:this.arr.join(',')}
       }).then((response)=>{
             console.log(response);
             if(response.data.code){
               this.showPopup(true,response.data.message,1000);       
           }else{
              this.showPopup(false,"删除成功",1000);
              this.$store.dispatch('getGood',this.$http);

           }
         
       });
    },
       //监测选框变动情况
     rowSelection(selectedRowsIndex){
    //console.log(selectedRowsIndex);
       //console.log(this.datalist)
       this.arr=[];
       //console.log(this.goodList);
       this.goodList.forEach((item,index)=>{
            if(selectedRowsIndex.includes(index)){
                  this.arr.push(item._id);
            }
       });
        console.log(this.arr);
     },
      showPopup(type, message, time) {
            this.popup.error = type;
            this.popup.message = message;
            this.popup.open = true;
            setTimeout(() => {
                this.popup.open = false;
            }, time);
        }

   },
   computed:{
       //从getters获取数据
        goodList(){
           return this.$store.getters.APP_good;
        },
        datalist(){
             let data=this.$store.getters.APP_shop;
             for(let i=0;i<data.length;i++){
                  if(!data[i].cover){
                      data[i].cover="public/uploads/shop/SC01C10.jpg";
                  }
             }
        
         return data;
        }
   }
}

</script>

<style>
   .demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
.error {
    background: red ;
    color: white ;
}

</style>