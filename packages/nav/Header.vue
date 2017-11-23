<template>
  <header class="uc-header">
    <s></s>
    <i>
      <i class="fa fa-list fa-2x" aria-hidden="true"></i>
      <i class="fa fa-chevron-left fa-1x" aria-hidden="true" @click="backHistory"></i>
      <label>当前位置：{{name1}}</label>
    </i>

    <div @mouseleave.prevent="menu.show=false">
      <div class="user-info" @mouseover="menu.show=true" >
        <img src="../../src/images/header/default.jpg">
        <span>{{userinfo.roleName}}：{{userinfo.userName}}</span>
      </div>
      <ul v-if="menu.show">
        <li>
          <i class="fa fa-user" aria-hidden="true"></i>
          <router-link tag="span" to="/personinfo">查看个人信息</router-link>
        </li>
        <li>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          <router-link tag="span" to="/personupdate">编辑个人信息</router-link>
        </li>
        <!--<li>-->
          <!--<i class="fa fa-lock" aria-hidden="true"></i>-->
          <!--<router-link tag="span" to="/rePassword">修改密码</router-link>-->
        <!--</li>-->
        <li>
          <i class="fa fa-cog" aria-hidden="true"></i>
          <router-link tag="span" to="/rePassword">重置密码</router-link>
        </li>
        <li @click="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
          <span>退出</span>
        </li>
      </ul>
    </div>

  </header>
</template>

<script>
  import { _logout } from '../../src/util/ajax';
  export default {
    data () {
      return {
        menu: {
          show: false
        },
        name1: this.name
      };
    },
    methods: {
      test (event) {
        if (event.srcElement.checked) {
          this.$set(this.obj, 'show', true);
        } else {
          this.$set(this.obj, 'show', false);
        }
        console.log(this.obj.show);
      },
      backHistory () {
        window.history.back();
      },
      logout () {
        _logout().then(function () {
          sessionStorage.clear();
          location.href = location.origin + '/#/login';
          
          console.log('exit success');
        });
      }
    },
    watch: {
      'name': function (newVal) {
        this.name1 = newVal;
      }
    },
    props: {
      name: [Number, String],
      userinfo: [Object]
    }
  };
</script>
<style lang="scss">
.uc-header{
  flex-direction: row;
  height: 55px;
  margin: 0;
  padding: 0;
  background-color: #fff;
  border-bottom: 1px solid #cfd8dc;
  z-index: 102;
  width: 100%;
  display: flex;
  >s{
    display: inline-block;
    width: 170px;
    height: 55px;
    padding: 0;
    margin-right: 0;
    background-color: #fff;
    background-image: url(../../src/images/header/baite_logo.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 160px auto;
    border-bottom: 1px solid #cfd8dc;
  }
  >i{
    flex-direction: row;
    align-items: center;
    flex: 1;
    margin: 0!important;
    text-align: center;
    display: flex;
    color: #b2b2b2;
    >.fa-chevron-left{
      color: #000;
      margin-left: 30px;
      cursor: pointer;
    }
    >label{
      color: #000;
      margin-left: 15px;
      font-style:normal;
    }
  }
  >div{
    >div{
      display: flex;
      line-height: 40px;
      margin: 2.5px 10px;
      padding: 4px 10px;
      height: 40px;
      border: 1px solid #cfd8dc;
      border-radius: 5px;
      cursor: default;
      >img{
        border-radius: 50%;
        height: 40px;
        margin-right: 5px;
      }
    }
    >ul{
      list-style: none;
      position: absolute;
      right: 10px;
      top: 48px;
      min-width: 190px;
      max-height: 200px;
      overflow: auto;
      margin: 5px 0;
      padding: 5px 0;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      z-index: 900;
      animation: .2s ease-in 0s slidein;
      transition: all .2s ease-in-out;
      >li{
        >i{
          width: 20px;
        }
        margin: 0;
        line-height: normal;
        padding: 7px 16px;
        clear: both;
        color: #495060;
        font-size: 15px!important;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background .2s ease-in-out;
        border-top: 1px solid #e9eaec;
        &:hover{
          background-color: #eff0f4;
        }
      }
    }
  }

}
@keyframes slidein {
  from{
    right: 0px;
    top: 58px;
    opacity: 0;
  }
  to{
    right: 10px;
    top: 48px;
    opacity: 1;
  }
}
</style>
