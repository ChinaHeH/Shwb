<template>
  <div id="app" >
    <uc-header :name="name" :userinfo="userinfo" v-if="$route.path != '/index' && $route.path != '/login' && $route.path != '/forgetPassword' && $route.path != '/changePassword'"></uc-header>
    <div v-if="$route.path != '/index' && $route.path != '/login' && $route.path != '/forgetPassword' && $route.path != '/changePassword'">
      <uc-slider :menu="menu"></uc-slider>
      <div>
        <router-view></router-view>
      </div>

    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
  import Header from '../packages/nav/Header';
  import Slider from '../packages/nav/Slider.vue';
  import Vue from 'vue';
  import { _getMenu } from './util/ajax';

  export default {
    data () {

      return {
        menu: [],
        name: '首页',
        show: false,
        userinfo: {
          roleName: '',
          userName: ''
        }
      };
    },
    components: {
      UcHeader: Header,
      UcSlider: Slider
    },
    methods: {
      getMenu () {
        var _this = this;

        _getMenu().then(function (res) {
          var data = res.data;

          sessionStorage.setItem('menu', JSON.stringify(data.menu));
          _this.menu = data.menu;
        });
      }
    },
//  updated(){
//  	 this.menu = JSON.parse(sessionStorage.getItem('menu'));
//  },
    mounted () {
//      this.getMenu();
      window.EVENTVUE = new Vue();
//    window.EVENTVUE.$on('userMenu', resData => {
//      // this.menu = resData.navigation;
//      this.userinfo.role = resData.roleName;
//      this.userinfo.name = resData.userName;
//    });
      
      this.userinfo = JSON.parse(sessionStorage.getItem('userMenu'));
      this.menu = JSON.parse(sessionStorage.getItem('menu'));
      console.log("asdasd")
      console.log(this.userinfo);
      if (!this.menu || this.menu.length <= 0) {
        location.href = location.origin + '/#/login';
      }
    },
    watch: {
      '$route.path': function (newVal, oldVal) {
        var _this = this;
      	this.menu = JSON.parse(sessionStorage.getItem('menu'));
      	this.userinfo = JSON.parse(sessionStorage.getItem('userMenu'));
      	console.log("userinfo")
      console.log(this.userinfo);
        if (!_this.menu) return;
        _this.menu.forEach(function (element) {
          if (element.children && element.children.length > 0 && element.expansion) {
            element.expansion = false;
          }
          if (newVal.indexOf(element.href) >= 0) {
            _this.name = element.name;
            return;
          }
          if (element.children && element.children.length > 0) {
            element.children.forEach(function (ele) {
              if (newVal.indexOf(ele.href) >= 0) {
                _this.name = ele.name;
                if (!element.expansion) {
                  element.expansion = true;
                }
              }
            });
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  @import "../node_modules/font-awesome/css/font-awesome.css";
  #app{
    >div{
      display: flex;
      height: calc(100% - 56px);
      >div{
        flex: 1;
        padding: 25px;
        height: calc(100% - 56px);
        overflow: auto;
      }
    }
  }
</style>
