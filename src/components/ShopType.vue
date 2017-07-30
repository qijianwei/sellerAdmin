<template>
  <div>
    <mu-raised-button label="列表" class="demo-raised-button" :primary="focus=='list'"
                      @click="tab('list')"/>
    <mu-raised-button label="添加" class="demo-raised-button" :primary="focus=='add'"
                      @click="tab('add')"/>
    <div class="listContent" v-if="focus=='list'">
      <mu-table multiSelectable enableSelectAll @rowSelection="rowSelection" :allRowsSelected="allRowsSelected" >
        <mu-thead>
          <mu-tr>
            <mu-th tooltip="ID">ID</mu-th>
            <mu-th tooltip="名称">名称</mu-th>
            <mu-th tooltip="状态">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="list in datalist" :key="list._id">
            <mu-td>{{list._id}}</mu-td>
            <mu-td>{{list.name}}</mu-td>
            <mu-td>
                <mu-raised-button label="删除" class="demo-raised-button" secondary @click.native.stop="deleteShopType(list._id)"/>
                <mu-raised-button label="编辑" class="demo-raised-button" secondary @click.native.stop="showEditShopType(list)" />
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-raised-button label="批量删除" class="demo-raised-button" :primary="focus=='list'"
                      @click.native.stop="deleteAllShopType"/>
    </div>
    <div class=" " v-if="focus=='add'">
         <form>
            <h4>类别名称</h4>
            <p>
                <mu-text-field label="请输入商家类别名称" labelFloat v-model="typename"/><br/>
            </p>
            <p>
                <mu-raised-button class="demo-raised-button" label="添加" secondary @click="addShopType"/>
            </p>
         </form>
    </div>
    <!--  <div class=" " v-if="focus=='edit'">
        <form>
           <h3>类别名称</h3>
           <p>
               <mu-text-field label="商家Id" labelFloat v-model="typeID"/><br/>
           </p>
           <p>
               <mu-text-field label="新商家类别名称" labelFloat v-model="newtypename"/><br/>
           </p>
           <p>
               <mu-raised-button class="demo-raised-button" label="确定" secondary @click="editShopType"/>
           </p>
        </form>
        </div> -->
    <mu-popup :position="popup.position" :overlay="popup.overlay" :popupClass="{'demo-popup-top': true, error: popup.error}" :open="popup.open">
            {{popup.message}}
    </mu-popup>
     <mu-dialog :open="dialog.open" :title="'修改 ['+editData.origin_name+']'" @close="dialog.open=false">
            <form>
                <h4>类别名称</h4>
                <p>
                    <mu-text-field v-model="editData.name" label="修改后的商家类别名称" labelFloat/>
                </p>
            </form>
            <mu-flat-button slot="actions" primary @click="editShopType" label="确定"/>
     </mu-dialog>
  </div>
</template>
<style>
  .listContent{ text-align: center; margin:30px auto; background: #e4b9c0;}
</style>

<script>

export default {
  name: 'ShopType',
  data:function () {
    return{
        focus:'list',
        typename:'',
        arr:[],
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
        editData:{},
        allRowsSelected:false
    }
  },
  created(){
       /**1.原生ajax请求**/
       /*  let xhr = new XMLHttpRequest();
         xhr.open('get', 'http://localhost:8888/shoptype', true);
         xhr.onload = () => {
             this.$store.commit('update_APP_shopType', JSON.parse(xhr.responseText).data);
         }
         xhr.send();*/

         /***2.axios框架库的写法*****/
        /*this.$http.get('http://localhost:8888/shoptype').then((response) => {
             console.log(response);
            this.$store.commit('update_APP_shopType', response.data);
        });*/
     this.$store.dispatch('getShopTypes',this.$http);
  },
  methods:{
     //按钮切换
     tab(name){

        this.focus=name;
        this.$store.dispatch('getShopTypes',this.$http);
    },

    //批量删除商户
    deleteAllShopType(){
    
      this.$store.dispatch('deleteShopType',{
           $http:this.$http,
           id:this.arr.join(',')
       }).then((value)=>{
             if(value.data.code){
           // console.log(value);
               this.showPopup(true,value.data.message,1000); 
               this.$store.dispatch('getShopTypes',this.$http);            
           }else{
              this.showPopup(false,"删除成功",1000);
              this.$store.dispatch('getShopTypes',this.$http);

           }
          this.allRowsSelected = false;
       });
    },
    //监测选框变动情况
    rowSelection(selectedRowsIndex){
     //  console.log(selectedRowsIndex);
       //console.log(this.datalist)
       this.arr=[];
       this.datalist.forEach((item,index)=>{
            if(selectedRowsIndex.includes(index)){
                  this.arr.push(item._id);
            }
       });
      // console.log(arr);
    },
    //根据ID删除商户
    deleteShopType(id){
       this.$store.dispatch('deleteShopType',{
           $http:this.$http,
           id:id
       }).then((value)=>{
           if(value.data.code){
           // console.log(value);
               this.showPopup(true,value.data.message,1000); 
               this.$store.dispatch('getShopTypes',this.$http);            
           }else{
              this.showPopup(false,"删除成功",1000);
              this.$store.dispatch('getShopTypes',this.$http);
           }
       });
    },
    //添加商户
     addShopType(){
     // console.log(this.typename);
        this.$store.dispatch('addShopType',{
            $http:this.$http,
            data:{
              name:this.typename
            }
          
        }).then((value)=>{
            //value接受的是resolve()传来的数据
           this.showPopup(false,"添加成功",1000);
           this.typename="";
        },(value)=>{
           //value接受的是reject()传来的数据
           this.showPopup(true,value.message,1000);
           this.typename="";
        });
     },
     //点击编辑按钮，显示编辑框
     showEditShopType(list){
       // console.log(list);
        this.editData=list;
        this.editData.origin_name=list.name;     
        this.dialog.open=true;
     //   console.log(this.editData);
     },

     //根据ID修改商户类型
      editShopType(){
         //console.log(this.newtypename);
        
         this.$store.dispatch('editShopType',{
             $http:this.$http,
             data:{
                 id:this.editData._id,
                 name:this.editData.name
             }
         }).then((value)=>{
            //value接受的是resolve()传来的数据
           this.showPopup(false,"修改成功",1000);
           this.dialog.open=false;
           this.$store.dispatch('getShopTypes',this.$http);
        },(value)=>{
           //value接受的是reject()传来的数据
           this.showPopup(true,"修改失败",1000);
           this.dialog.open=false;
           this.$store.dispatch('getShopTypes',this.$http);
        });
      },
     //提示框
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
     datalist(){

        return this.$store.getters.APP_shopType;
     }
  }


}

</script>
<style >
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


