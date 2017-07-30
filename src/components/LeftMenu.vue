<template>
<div>
      <mu-drawer :open="UI_open">
      <mu-appbar title="大众点评管理平台"/>
      <mu-list>

            <router-link to="/">
              <mu-list-item title="首页" />
            </router-link>
            <router-link to="/shoptype">
              <mu-list-item title="商家分类管理" />
            </router-link>
            <router-link to="/shop">
              <mu-list-item title="商家管理" />
            </router-link>

             <router-link to="/goods">
                <mu-list-item title="商品管理"/>
             </router-link>
            <mu-list-item @click.native="close" title="关闭"/>
      </mu-list>
    </mu-drawer>
</div>
</template>

<script>
   export default{
      name:"LeftMenu",
      computed:{
         UI_open(){
            return this.$store.getters.UI_open;
         }
      },
     
      methods:{
         close(){
              this.$store.commit('UI_open_toggle');
         }
      }
     
   }

</script>
