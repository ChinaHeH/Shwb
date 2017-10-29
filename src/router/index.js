import Vue from 'vue';
import Router from 'vue-router';
import Home from './Home/index.vue';
import Test from './Home/test.vue';
import Index from './Index/index.vue';
import Login from './Login/index.vue';
import PersonInfo from './Self/info.vue';
import PersonUpdate from './Self/update.vue';
import SliderAdd from './Slider/add.vue';
import SliderList from './Slider/list.vue';
import SliderInfo from './Slider/info.vue';
import SliderEdit from './Slider/edit.vue';
import companyEdit from './Index/edit.vue';
import companyInfo from './Index/info.vue';
import UserList from './User/list.vue';
import UserAdd from './User/add.vue';
import UserInfo from './User/info.vue';
import UserEdit from './User/edit.vue';
import CustomerList from './Customer/list.vue';
import CustomerAdd from './Customer/add.vue';
import CustomerInfo from './Customer/info.vue';
import CustomerEdit from './Customer/edit.vue';
//*******************忘记密码*****************************
import ForgetPassword from './Login/forgetPassword.vue';
//*******************订单管理*****************************
import OrderList from './dingdan/dingdanList.vue';
import OrderAdd from './dingdan/dingdanAdd.vue';

//结算路由
import accountsDetial from './accounts/list.vue';

//价格路由
import priceList from './price/priceList.vue';
import addPrice from './price/addPrice.vue';
import priceInfo from './price/priceInfo.vue';


Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Test',
      path: '/home',
      component: Test
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'PersonInfo',
      path: '/personinfo',
      component: PersonInfo
    },
    {
      name: 'PersonUpdate',
      path: '/personupdate',
      component: PersonUpdate
    },
    {
      name: 'SliderAdd',
      path: '/slideradd',
      component: SliderAdd
    },
    {
      name: 'SliderList',
      path: '/sliderlist',
      component: SliderList
    },
    {
      name: 'SliderInfo',
      path: '/sliderinfo/:id',
      component: SliderInfo
    },
    {
      name: 'SliderEdit',
      path: '/slideredit/:id',
      component: SliderEdit
    },
    {
      name: 'companyEdit',
      path: '/companyedit',
      component: companyEdit
    },
    {
      name: 'companyInfo',
      path: '/companyinfo',
      component: companyInfo
    },
    {
      name: 'UserList',
      path: '/userlist',
      component: UserList
    },
    {
      name: 'UserAdd',
      path: '/useradd',
      component: UserAdd
    },
    {
      name: 'UserInfo',
      path: '/userinfo/:id',
      component: UserInfo
    },
    {
      name: 'UserEdit',
      path: '/useredit/:id',
      component: UserEdit
    },
    {
      name: 'CustomerList',
      path: '/customerlist',
      component: CustomerList
    },
    {
      name: 'CustomerAdd',
      path: '/customeradd',
      component: CustomerAdd
    },
    {
      name: 'CustomerEdit',
      path: '/customeredit/:id',
      component: CustomerEdit
    },
    //忘记密码
    {
      name: 'ForgetPassword',
      path: '/forgetPassword',
      component: ForgetPassword
    },
    //客户查看页面
    { 
      name: 'CustomerInfo',
      path: '/CustomerInfo/:id',
      component: CustomerInfo
    },
    //订单一览
    {
      name: 'OrderList',
      path: '/orderList',
      component: OrderList
    },
    //添加订单
    {
      name: 'OrderAdd',
      path: '/orderAdd',
      component: OrderAdd
    },
    //结算一览页面
    {
    	name:'accountsDetial',
    	path:'/accountsDetial',
    	component: accountsDetial
    },
    //价格一览
    {
    	name:'priceList',
    	path:'/priceList',
    	component: priceList
    },
    //添加价格
    {
    	name:'addPrice',
    	path:'/addPrice',
    	component: addPrice
    },
    //价格设定信息
    {
    	name:'priceInfo',
    	path:'/priceInfo/:id',
    	component: priceInfo
    }
    
  ]
});
