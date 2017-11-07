<template>
  <main class="uc-login">
    <div>
      <header>重置</header>
      
      <div class="step1">
        <uc-form class="form" :rForm="thirdrForm" :dForm="thirddForm" :rrules="ruleForm" ref="form2" v-show="canChange"></uc-form>
        <el-button type="primary" class="btn" @click="confirm()" v-show="canChange">确认修改</el-button>
      </div>
			
    </div>

  </main>
</template>

<script>
  import { Button } from 'element-ui';
  import {CONSTANT} from '../../util/constant';
  import { _changePassword , _getAparamsToSend} from '../../util/ajax';
  import Form from '~packages/form/form.vue';
  export default {
    data () {
      return {
        canChange:false,                      //显示修改框
        activeParams:{                         //刚进来的时候传给后台的params
          active:''
        },
        //step3中的数据
        thirdrForm: {
          password: ''
        },
        thirddForm: [
          {
            type: 'password',
            key: 'password',
            label: '密码',
            placeholder: '请输入密码'
          }
        ],
        ruleForm: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          repassword:[
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        },
        //params
        params:{
          password:""           //密码
        }
      };
    },
    components: {
      ElButton: Button,
      UcForm: Form
    },
    methods: {
      confirm(){
        var _this = this;
        _this.params.password = _this.thirdrForm.password;

          console.log(_this.params);
        var jwtToken = localStorage.getItem('jwtToken');
        console.log(jwtToken);

        this.$refs.form2.$refs.ruleForm.validate(valid => {
          if (valid) {
            _changePassword(_this.params).then(function (response) {
              console.log(response);
              var data = response.data;

              if (data.status) {
                location.href = location.origin + '/#/login';
              } else {
                CONSTANT.methods.tips(data.error_msg || '更改密码失败!', '提示');
              }
            }).catch(function (res) {
              CONSTANT.methods.tips(""+res || '更改密码异常!', '提示');
            });

          } else {
            console.log('error submit!!');
          }
        });
      },
      //获取一个参数
      getParams(){
        var _this = this;
        var active = window.location.href;
        var activeIndex = active.indexOf("=")+1;
        console.log(activeIndex);
        var activeParams = active.substring(activeIndex);
        console.log(activeParams);
        _this.activeParams.active = activeParams;

        //**************************************
        _getAparamsToSend(_this.activeParams).then(function (response) {
          console.log(response);
          var data = response.data;

          if (data.status) {
            localStorage.setItem('jwtToken', data.data.token);
            _this.canChange = true;
          } else {
            CONSTANT.methods.tips(data.error_msg || '认证信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '认证信息异常!', '提示');
        });
      }
    },
    mounted (){
        this.getParams();
    }
  };
</script>
<style lang="scss" scoped>
  .uc-login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("../../images/bg.jpg");}
  .uc-login > div{
    width: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    height: 300px;
    transform: translate(-50%,-50%);
    transform-origin: 0;
    border-radius: 15px;
    background-color: white;
    overflow: hidden;
    padding: 30px 40px;
    box-shadow: 0 0 20px rgba(101, 99, 99, 0.9);}

  .uc-login > div >header{
    font-size: 24px;
    color: #4c4c4c;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 22px;
  }
  .uc-login > div > .step1 >.form{
    margin-top: 60px;
    padding: unset;
  }
  .uc-login > div > p{
    font-size: 12px;
    text-align: right;
    margin-bottom: 15px;
    cursor: pointer;}
  .uc-login > div > p:hover{
    color: #20a0ff;
  }
  .btn{
    width: 100%;
  }
  .uc-login > div > .step2{
    margin-top: 60px;
  }
  .uc-login > div > .step2 > p{
    text-align: center;
    line-height: 35px;
    font-size: 18px;
    color: #4c4c4c;
  }
  .uc-login > div > .step2 > .email{
    color: #20a0ff;
  }
</style>