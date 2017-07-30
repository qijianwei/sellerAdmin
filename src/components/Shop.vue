<template>
<div>
      <mu-raised-button label="商户列表" class="demo-raised-button" :primary="focus=='list'"
                      @click="tab('list')"/>
    <mu-raised-button label="添加" class="demo-raised-button" :primary="focus=='add'"
                      @click="tab('add')"/>
     <div class="listContent" v-if="focus=='list'" style="overflow:hidden;">
        <mu-table multiSelectable enableSelectAll @rowSelection="rowSelection" >
            <mu-thead>
              <mu-tr>
                <mu-th tooltip="商户名称">商户头像</mu-th>
                <mu-th tooltip="商户名称">商户名称</mu-th>
                 <mu-th tooltip="商家类型名称">商家类型名称</mu-th>
                <mu-th tooltip="商户电话">商户电话</mu-th>
                <mu-th tooltip="链接">相册</mu-th>
               <!--  <mu-th tooltip="商户简介">商户简介</mu-th> -->
                <mu-th tooltip="状态">操作</mu-th>
              </mu-tr>
            </mu-thead>
            <mu-tbody>
              <mu-tr v-for="(list,index) in datalist" :key="list._id">
                <mu-td>
                    <img v-if="list.cover" style="width: 100px; height: 60px;" :src="'http://localhost:8888/'+ list.cover" alt="">
                </mu-td>
                <mu-td>{{list.name}}</mu-td>
                <mu-td>{{list.type.name}}</mu-td>
                <mu-td>{{list.phone}}</mu-td>
                <mu-td> 
                      <router-link :to="'/gallery/'+list._id">
                        相册
                     </router-link>
               </mu-td>
               <!--  <mu-td>{{list.description}}</mu-td> -->
                <mu-td>
                  <!--  <mu-raised-button label="删除" class="demo-raised-button" secondary @click.native.stop="deleteShop(list._id)"/> -->
                   <mu-raised-button label="编辑" class="demo-raised-button" secondary @click.native.stop="showEditShop(list,index)"/>
                   <mu-raised-button label="封面" class="demo-raised-button" secondary @click.native.stop="showuploadFile(list._id)"/> 
                   <mu-raised-button label="相册" class="demo-raised-button" secondary @click.native.stop="showUploadPic(list._id)"/>
               </mu-td> 
              </mu-tr>
            </mu-tbody>
          </mu-table>
        <mu-raised-button label="批量删除" class="demo-raised-button" :primary="focus=='list'"
                      @click.native.stop="deleteAllShop"/>
    </div>
    <div v-if="focus=='add'">
        <form>
            <mu-text-field v-model="addData.shopName" label="添加新商户" labelFloat/><br/>
            <mu-select-field v-model="addData.shopType" :labelFocusClass="['label-foucs']" label="选择商户类型">
                <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text.name" />
            </mu-select-field><br/>
            <mu-text-field v-model="addData.shopPhone" label="商户电话" labelFloat/><br/>
            <mu-text-field v-model="addData.shopAddress" label="商户地址" labelFloat/><br/>
            <mu-text-field v-model="addData.shopIntro" hintText="商户简介（不允许超过80个字符）" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="5" :maxLength="80"/><br/>
            <p>
                <mu-raised-button class="demo-raised-button" label="添加" secondary @click="addShop"/>
            </p>
       </form>
       
    </div>

    <mu-popup :position="popup.position" :overlay="popup.overlay" :popupClass="{'demo-popup-top': true, error: popup.error}" :open="popup.open">
            {{popup.message}}
    </mu-popup>
     <mu-dialog :open="dialog.open" :title="'修改 ['+editData.origin_name+']'" @close="dialog.open=false">
            <form>
                <h4>类别名称</h4>
               <p>
                <mu-text-field v-model="editData.name" label="商家名称" labelFloat/>
               </p> 
               <p>      
                <mu-select-field v-model='editData.type.name'  :labelFocusClass="['label-foucs']" label="选择商户类型">
                    <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text.name" />
                </mu-select-field>
                </p>
                <p>
                    <mu-text-field v-model="editData.phone" label="电话" labelFloat/>
                </p>
                <p>
                    <mu-text-field v-model="editData.address" label="地址" labelFloat/>
                </p>
                <mu-text-field v-model="editData.description" hintText="商户简介（不允许超过80个字符）" :errorText="multiLineInputErrorText" @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="5" :maxLength="80"/><br/>

            </form>
            <mu-flat-button slot="actions" primary @click="editShop" label="确定"/>
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
     <!--上传相册界面开始-->
     <mu-dialog :open="dialog3.open"  @close="dialog3.open=false">
     
              <mu-grid-list class="gridlist-demo" v-show="uploadPic.uploadPicUrl" :cols="12">
                 <mu-sub-header>多图片上传</mu-sub-header>
                 <div class="pigbox pig-pad" v-for="item,index in uploadPic.uploadPicFiles">                
                       <img :src="uploadPic.uploadPicUrl[index]"/>     
                       <mu-text-field  ref="text"  v-model="uploadPic.description[index]" hintText="请输入简介" />                                         
                 </div>
              </mu-grid-list>    
              <p>
               <input type="file" @change="changePicUrl" multiple>
              </p>

          <mu-flat-button slot="actions" primary @click.native="uploadPics" label="确定"/>
     </mu-dialog>
        <!--上传相册界面开始-->
</div>
</template>

<script>
export default {
  name: 'Shop',
  data:function(){
     return {
        focus:'list',
       // shopTypeData:[],
        multiLineInputErrorText: '',
        inputErrorText: '',
        shopArr:[],
        popup:{
           open:false,
           position:'top',
           overlay:false,
           message:'',
           error:true
        },
        addData:{
            shopName:'',
            shopType:'',
            shopPhone:'',
            shopAddress:'',
            shopIntro:''

        },
         dialog:{
           open:false
        },
        dialog2:{
           open:false
        },
        dialog3:{
           open:false
        },
        editData:{
            name:'',
            type:{
                name:''
            },
            phone:'',
            address:'',
            description:''
        },
        uploadData:{
            uploadFileUrl:'',  //图片地址
            Id:'',
            uploadFile:''
        },
        uploadPic:{
            uploadPicUrl:[],
            description:[],
            id:'',
            uploadPicFiles:''
        }
       
     }
  },
  methods:{
     /*字数是否超出*/
     handleInputOverflow (isOverflow) {
       this.inputErrorText = isOverflow ? '超过啦！！！！' : ''
     },
     //行数是否超出
      handleMultiLineOverflow (isOverflow) {
           this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
     },
     tab(name){

        this.focus=name;
        this.$store.dispatch('getShop',this.$http);
     },
 
   showUploadPic(id){
       this.dialog3.open=true; 
       //console.log(list);
       this.uploadPic.id=id;
   },

     //input触发上传相册事件
    changePicUrl(e){
       
       this.uploadPic.uploadPicFiles=e.target.files;
       console.log(this.uploadPic.uploadPicFiles);
       let length=this.uploadPic.uploadPicFiles.length;
    //   console.log(this.uploadPic.uploadPicFiles);
       for(let i=0;i<length;i++){
          let fr=new  FileReader();
           fr.onload=()=>{
              this.uploadPic.uploadPicUrl.push(fr.result);
           }
           fr.readAsDataURL(this.uploadPic.uploadPicFiles[i]);               
       }
       //console.log(length);    
     },
      
     //上传相册
     uploadPics(){
        
        this.$store.dispatch('uploadPics',{
            $http:this.$http,
            data:{
                id:this.uploadPic.id,
                description:this.uploadPic.description,
                pic:this.uploadPic.uploadPicFiles
            }
        }).then((response)=>{
             console.log('niam');
             if(response.data.code){
                 this.showPopup(true,"上传相册失败",1000); 
             }else{
                 this.showPopup(false,"上传相册成功",1000);
                 
             }
             this.dialog3.open=false;
             this.uploadPic.uploadPicUrl='';
            
        });
     },
     //展示上传图片页面
     showuploadFile(id){
       // console.log(id);
         this.dialog2.open=true;
         this.uploadData.Id=id;
         //console.log(id);
     },
     //上传图片
     uploadFile(){
     
        this.$store.dispatch('uploadFile',{
            $http:this.$http,
            id: this.uploadData.Id,
            cover:this.uploadData.uploadFile
        }).then((response)=>{
            console.log(response);
            if(response.data.code){
                 this.showPopup(true,"上传图片失败",1000); 
            }else{
                 this.showPopup(false,"添加成功",1000);
                 this.$store.dispatch('getShop',this.$http);
            }
        })
        this.dialog2.open=false;
         this.uploadData.uploadFileUrl='';
     },
     //上传图片触发@change触发
     changeFileUrl(e){
        //console.log(axios);
        var fr = new FileReader();
        this.uploadData.uploadFile=e.target.files[0];
        fr.onload=()=>{
            this.uploadData.uploadFileUrl=fr.result;
        }
        fr.readAsDataURL(this.uploadData.uploadFile);
       // console.log(e.target.files);
     },
     //关闭上传文件页面
    /* close(){
       this.dialog2.open=true
     },*/
    //添加商户
     addShop(){
        if(!this.addData.shopType&&this.addData.shopType!=0){
            this.showPopup(true,"请输入商户类型",1000); 
            return;
        }
        this.$store.dispatch('addShop',{
            $http:this.$http,
            name:this.addData.shopName,
            type:this.list[this.addData.shopType]._id,//this.datalist2[this.game1]._id
            phone:this.addData.shopPhone,
            address:this.addData.shopAddress,
            description:this.addData.shopIntro
        }).then((response)=>{
            //console.log(response);
            this.showPopup(false,"添加成功",1000);
            this.$store.dispatch('getShop',this.$http);
        },(response)=>{
            this.showPopup(true,response.message,1000); 

        });
     },
     //根据id删除商户版
     deleteShop(id){
       
       this.$store.dispatch('deleteShop',{
           $http:this.$http,
           id:id
        }).then((value)=>{
           if(value.data.code){
               this.showPopup(true,value.data.message,1000); 
               this.$store.dispatch('getShop',this.$http);            
           }else{
   
              this.showPopup(false,"删除成功",1000);
              this.$store.dispatch('getShop',this.$http);
           }
       });
     },
     //批量删除
     deleteAllShop(){
      // console.log(this.showPopup);
       this.showPopup(false,"删除成功",1000);
       return;
          this.$store.dispatch('deleteShop',{
               $http:this.$http,
               id:this.shopArr.join(',')
           }).then((value)=>{
             if(value.data.code){
               // console.log('来了吗');
                   this.showPopup(true,value.data.message,1000);                       
               }else{
                  this.showPopup(false,"删除成功",1000);
               }
               //this.$store.dispatch('getShop',this.$http);   
           });
     },
     //选框的选中与否监测
     rowSelection(selectedRowsIndex){
       this.shopArr=[];
       this.datalist.forEach((item,index)=>{
            if(selectedRowsIndex.includes(index)){
                  this.shopArr.push(item._id);
            }
       });
     },
     //按下编辑按钮，显示编辑框
     showEditShop(list,index){
       // console.log(list.type.name);
      //console.log(this.list);
       // console.log(this.list.indexOf(list.type.name));
      // console.log(...list);
        this.editData=list;
        for(var i=0;i<this.list.length;i++){
            if(this.list[i].name==list.type.name){
                this.editData.type.name=i;
               // console.log(i);
                break;
            }
        }
       // console.log(this.editData._id);
        this.dialog.open=true;

     },
     //编辑店铺
     editShop(){
      //  console.log(this.editData.type.name);
        if(!this.editData.type.name&&this.editData.type.name!=0){
            this.showPopup(true,"请输入商户类型",1000); 
            return;
        }
         this.$store.dispatch('editShop',{
             $http:this.$http,
             data:{
                 id:this.editData._id,
                 name:this.editData.name,
                 type:this.list[this.editData.type.name]._id,
                 phone:this.editData.phone,
                 address:this.editData.address,
                 description:this.editData.description
             }
         }).then((value)=>{
            //value接受的是resolve()传来的数据
           this.showPopup(false,"修改成功",1000);
           this.$store.dispatch('getShop',this.$http);
        },(value)=>{
           //value接受的是reject()传来的数据
           this.showPopup(true,"修改失败",1000);
           this.$store.dispatch('getShop',this.$http);
        });
       this.dialog.open=false;

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
     this.$store.dispatch('getShop',this.$http);

  },
  computed:{
     list(){
       return this.$store.getters.APP_shopType;
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
/*new formdata()
dataurl 转blob对象

  */
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
.mu-text-field{ width: 200px; }
.mu-grid-tile-titlebar{
    background-color: rgba(0, 0, 0, 0.0);
}
.mu-td, .mu-th{
    padding-left: 0px;
    padding-right: 0px;
}
  .pig-pad{ float: left; margin-right:20px;  }
  .pigbox{width: 200px; display: inline-block;position: relative;}
.pigbox img{display: block;width: 100%;}
</style>



