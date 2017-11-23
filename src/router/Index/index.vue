<template>
  <main class="home" id="home">
    <header class="header">
      <div>
        <img src="../../images/home/title.png">
        <div>
          <span @click="scrollToElement(1)" :class="active === 1 ? 'active' : ''">首页</span>
          <span @click="scrollToElement(2)" :class="active === 2 ? 'active' : ''">公司概括</span>
          <span @click="scrollToElement(5)" :class="active === 5 ? 'active' : ''">加工报价</span>
          <span @click="scrollToElement(3)" :class="active === 3 ? 'active' : ''">公司客户</span>
          <span @click="scrollToElement(4)" :class="active === 4 ? 'active' : ''">联系我们</span>
          <span @click="scrollToElement(6)" :class="active === 6 ? 'active' : ''">加工下单</span>
        </div>
      </div>


    </header>
    <section>
      <img src="../../images/home/home.png">
      <div class="info">
        <div>
          <div class="company">
            <label>公司简介</label>
            <p id="company"></p>
          </div>
          <div class="lb-pic">
            <uc-carousel trigger="click">
              <uc-carousel-item v-for="item in lb">
                <img :src="item" class="lb-img">
              </uc-carousel-item>
            </uc-carousel>
          </div>
        </div>
      </div>
      <div class="merchant">
        <div>
          <img :src="item" v-for="item in merchant">
        </div>
      </div>
      <div class="footer">
        <div class="left">
          <img src="../../images/home/title.png">
          <p>
            百特陶瓷上海青浦华新加工厂
          </p>
          <p>
            Copyright © 2015.Unicharge All rights reserved.沪ICP备15033912号
            沪公网安备 31010402002558号
          </p>
        </div>
        <div class="mid">
          <label>联系我们</label>
          <p>地址：上海市徐汇区桂平路</p>
          <p>电话：010-12345678</p>
          <p>联系人：某某某</p>
          <p>手机：12345678901</p>
          <p>邮箱：907271733@qq.com</p>
        </div>
        <div class="right">
          <label>客服微信</label>
          <img :src="item.src" v-for="item in users">
        </div>
      </div>
    </section>
  </main>
</template>

<script>

  import { Button, Carousel, CarouselItem } from 'element-ui';
  import { _getHomePage } from '../../util/ajax';
  import {CONSTANT} from '../../util/constant';

  export default {
    data () {
      var users = [{
        src: require('../../images/home/users/user1.png')
      }, {
        src: require('../../images/home/users/user1.png')
      }];

      return {
        lb: [],
        merchant: [],
        users: users,
        scroll: '',
        active: 1,
        companyProfile: ''
      };
    },
    components: {
      UcButton: Button,
      UcCarousel: Carousel,
      UcCarouselItem: CarouselItem
    },
    methods: {
      scrollToElement (type) {
        this.active = type;
        var ele = '.header';

        if (type === 1) {
          ele = '.header';
        } else if (type === 2) {
          ele = '.info';
        } else if (type === 3) {
          ele = '.merchant';
        } else if (type === 4) {
          ele = '.footer';
        }
        var anchor = this.$el.querySelector(ele);

        document.getElementById('home').scrollTop = anchor.offsetTop;
      },
      getHomePage () {
        var _this = this;

        _getHomePage().then(function (response) {
          var data = response.data;

          if (data.status) {
            document.getElementById('company').innerHTML = data.data.companyProfile.replace(/\n/g, '<br/>');
            _this.lb = data.data.slideShow;
            _this.merchant = data.data.logo;

          } else {
            CONSTANT.methods.tips(data.error_msg || '更新公司简介失败!', '提示');
          }
        });
      }
    },
    mounted () {
      this.getHomePage();
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
<style lang="scss">
  .home{
    min-width: 1200px;
    overflow: auto;
    width: 100%;
    height: 100%;
    >header{
      width: 100%;
      position: fixed;
      background-color: #ffffff;
      opacity: .9;
      z-index: 999;
      >div{
        display: flex;
        width: 1200px;
        min-width: 1200px;
        margin: auto;
        >img{
          height: 100px;
        }
        >div{
          flex: 1;
          line-height: 100px;
          padding-left: 246px;
          font-size: 18px;
          >span{
            margin-right: 50px;
            cursor: pointer;
            &.active{
              color: #cf504e;
            }
          }
        }
      }
    }
    >section{
      background-color: #f5f6f7;
      width: 100%;
      min-width: 1200px;
      >img{
        height: 900px;
        width: 100%;
      }
      >.info{
        width: 1200px;
        min-width: 1200px;
        margin: auto;
        >div{
          display: flex;
          padding: 155px 35px;

          >.company{
            flex: 1;
            padding: 21px 50px 0px 0px;
            >label{
              font-size: 25px;
              font-weight: 600;
            }
            >p{
              font-size: 16px;
              margin-top: 30px;
              line-height: 25px;
            }
          }
          >.lb-pic{
            flex: 1;
          }
        }

      }
      >.merchant{
        width: 100%;
        min-width: 1200px;
        background-color: white;
        >div{
          padding: 80px 0;
          width: 1200px;
          margin: auto;
          >img{
            height: 166px;
            margin-right: 25px;
            margin-left: 25px;
          }
        }
      }
      >.footer{
        display: flex;
        padding: 80px 25px;
        width: 1200px;
        margin: auto;
        >div{
          flex: 1;
          margin-right: 20px;
          &.left{
            >img{
              height: 45px;
              margin-bottom: 40px;
            }
            >p{
              line-height: 25px;
            }
          }
          &.mid{
            line-height: 25px;
            >label{
              font-weight: 600;
              margin-bottom: 40px;
              display: block;
            }
          }
          &.right{
            >label{
              display: block;
              font-weight: 600;
              line-height: 25px;
              margin-bottom: 40px;
            }
            >img{
              height: 121px;
              width: 121px;
              margin-right: 60px;
            }
          }
        }
      }
    }
  }
  .lb-img{
    height: 100%;
  }
  @media screen and (max-width: 1200px) {
    .home{
      width: 1200px;
    }
  }
</style>