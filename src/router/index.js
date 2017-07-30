import Vue from 'vue';
import Router from 'vue-router'
import Index from '@/components/Index'
import Shop from '@/components/Shop'

import ShopType from '@/components/ShopType.vue';
import Good from '@/components/goods';
import Gallery from '@/components/gallery';
// import ShopType from '@/components/ShopType'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/shoptype',
      name: 'ShopType',
      component: ShopType
    },
    {
       path:'/goods',
       name:'goods',
       component:Good
    },
    { 
      path:'/gallery/:id',
      name:'gallery',
      component:Gallery
          
    }

  ]
})
