import md5 from "js-md5";
import { Loading, MessageBox } from 'element-ui';

var LoadingService = '';
export var CONSTANT = {
  api: {
   LOGIN : location.origin + '/baite/web/login',
   LOGOUT : location.origin + '/baite/web/logout',
   GETPERSONALINFO : location.origin + '/baite/web/getPersonalInfo',
   UPDATEPERSONALINFO : location.origin + '/baite/web/updatePersonalInfo',
   GETQINIUTOKEN : location.origin + '/baite/web/getQiniuToken',
   ADDSLIDESHOW : location.origin + '/baite/web/addSlideshow',
   GETSLIDESHOWLIST : location.origin + '/baite/web/getSlideshowList',
   GETSLIDESHOW : location.origin + '/baite/web/getSlideshow',
   UPDATESLIDESHOW : location.origin + '/baite/web/updateSlideshow',
   DELETESLIDESHOW : location.origin + '/baite/web/deleteSlideshow',
   GETCOMPANYPROFILE : location.origin + '/baite/web/getCompanyProfile',
   UPDATECOMPANYPROFILE : location.origin + '/baite/web/updateCompanyProfile',
   GETHOMEPAGE : location.origin + '/baite/web/getHomePage',
   GETUSERLIST : location.origin + '/baite/web/getUserList',
   ADDUSER : location.origin + '/baite/web/addUser',
   GETUSER : location.origin + '/baite/web/getUser',
   UPDATEUSER : location.origin + '/baite/web/updateUser',
   DISABLEUSER : location.origin + '/baite/web/disableUser',
   ENABLEUSER : location.origin + '/baite/web/enableUser',
   DELETEUSER : location.origin + '/baite/web/deleteUser',
   GETCUSTOMERLIST : location.origin + '/baite/web/getCustomerList',
   ADDCUSTOMER : location.origin + '/baite/web/addCustomer',
   //客户信息
   GETCUSTOMER : location.origin + '/baite/web/getCustomer',
   UPDATECUSTOMER : location.origin + '/baite/web/updateCustomer',
   DISABLECUSTOMER : location.origin + '/baite/web/disableCustomer',
   ENABLECUSTOMER : location.origin + '/baite/web/enableCustomer',
   DELETECUSTOMER : location.origin + '/baite/web/deleteCustomer',
   
   //结算一览
   Getbalancelist : location.origin + '/baite/web/getBalanceList',
   
   //价格一览
   Getpricelist : location.origin + '/baite/web/getPriceList',
   //添加价格
   Addprice : location.origin + '/baite/web/addPrice',
   //删除价格
   Deleteprice : location.origin + '/baite/web/deletePrice',
	 //获取价格设定信息
	 Getprice : location.origin + '/baite/web/getPrice',
	 //更新价格设定
	 Updateprice : location.origin + '/baite/web/updatePrice',
	 //批量添加价格设定
	 Addpricebatch :location.origin + '/baite/web/addPriceBatch',
    //*******************找回密码************************
    //发送邮件
   SENDEMAIL : location.origin + '/baite/web/sendResetPwdMail',
   GETDINGDANLIST : location.origin + '/baite/web/getOrderList',   //订单列表
   DELETEORDER : location.origin + '/baite/web/deleteOrder',       //删除订单
   CHECHORDER : location.origin + '/baite/web/approveOrder',       //审核订单
   ADDORDER : location.origin + '/baite/web/addOrder',            //添加订单
   GRTORDERINFO : location.origin + '/baite/web/getOrder',            //获取查看获取订单信息
   UPDATESTATE : location.origin + '/baite/web/updateGoodsStatus',            //订单编辑》》更新订单状态
   UPDATEBASICINFO : location.origin + '/baite/web/updateOrder',              //订单编辑》》编辑基本信息
   UPDATELISTINFO : location.origin + '/baite/web/updateProcessReq',              //订单编辑》》编辑加工信息




  },
  methods: {
    MD5Methods (user) {
      return md5(user.password + '@{' + user.username + '}');
    },
    loading(type){
      if (type === 'open') {
        LoadingService = Loading.service({
          text: '加载中...'
        });
      } else if (type === 'close') {
        LoadingService.close();
      }
    },
    tips(message, title, func){
      if(typeof func === 'function'){
        MessageBox.alert( message , title ).then(func);
      }else {
        MessageBox.alert( message , title );
      }
    },
    confirm(message, title, func){
      if(typeof func === 'function'){
        MessageBox.confirm( message , title ).then(func);
      }else {
        MessageBox.alert( message , title );
      }
    }
  }
};

export var reg =  {
  // 零和非零开头的数字
  number1: /^(0|[1-9][0-9]*)$/,
  telphone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
  cellphone: /^1[34578]\d{9}$/
}

