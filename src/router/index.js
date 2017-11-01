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
import ChangePassword from './Login/resetNewPassword.vue';
//*******************订单管理*****************************
import OrderList from './dingdan/dingdanList.vue';
import OrderAdd from './dingdan/dingdanAdd.vue';
import OrderCheck from './dingdan/dingdanCheck.vue';
import OrderEdit from './dingdan/dingdanEdit.vue';
import OrderBasicEdit from './dingdan/editBasicInfo.vue';
import UPDATESTATUS from './dingdan/updataStatus.vue';
import UPDATEPRICE from './dingdan/updatePrice.vue';

//结算路由
import accountsDetial from './accounts/list.vue';
import accountsOrder from './accounts/accountsOrder.vue';


//价格路由
import priceList from './price/priceList.vue';
import addPrice from './price/addPrice.vue';
import priceInfo from './price/priceInfo.vue';
import editPrice from './price/editPrice.vue';
import priceSet from './price/priceSet.vue';

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
    //忘记密码的更改密码
    {
      name: 'changePassword',
      path: '/changePassword',
      component: ChangePassword
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
    //订单查看
    {
      name: 'orderCheck',
      path: '/orderCheck/:id',
      component: OrderCheck
    },
    //订单编辑
    {
      name: 'orderEdit',
      path: '/orderEdit/:id',
      component: OrderEdit
    },
    //订单基本信息编辑
    {
      name: 'orderBasicEdit',
      path: '/orderBasicEdit/:id',
      component: OrderBasicEdit
    },
    //更新货物状态
    {
      name: 'orderUpdateStatus',
      path: '/orderUpdateStatus/:id',
      component: UPDATESTATUS
    },
    //订单价格
    {
      name: 'orderUpdatePrice',
      path: '/orderUpdatePrice/:id',
      component: UPDATEPRICE
    },


    //结算一览页面
    {
    	name:'accountsDetial',
    	path:'/accountsDetial',
    	component: accountsDetial
    },
    {//结算页面
    	name:'accountsOrder',
    	path:'/accountsOrder',
    	component: accountsOrder
    	
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
    },
    //更新价格设定
    {
    	name:'editPrice',
    	path:'/editPrice/:id',
    	component: editPrice
    },
    //加工价格设置 
    {
    	name:'priceSet',
    	path:'/priceSet',
    	component: priceSet
    }
  ]
});
