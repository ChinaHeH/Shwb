<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-ruleForm" label-width="100px">
      <h3>订单基本信息</h3>

      <el-form-item label="联系人">
        <el-input v-model="params.basicInfo.contactName" placeholder="联系人"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="params.basicInfo.contactPhone" placeholder="联系电话"></el-input>
      </el-form-item>

      <el-form-item label="交货时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="截止交货日期" v-model="params.basicInfo.processDeadline" @change="dateChange"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="取货方式">
        <el-select v-model="params.basicInfo.getGoodsType" placeholder="取货方式">
          <el-option label="本方送货" value="1"></el-option>
          <el-option label="厂家取货" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="取货地址" v-show="params.basicInfo.getGoodsType == 2">
        <el-input v-model="params.basicInfo.getGoodsAddress" placeholder="取货地址"></el-input>
      </el-form-item>

      <el-form-item label="送货方式">
        <el-select v-model="params.basicInfo.receiveGoodsType" placeholder="送货方式">
          <el-option label="本方自提" value="1"></el-option>
          <el-option label="厂家送货" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="收货地址" v-show="params.basicInfo.receiveGoodsType == 2">
        <el-input v-model="params.basicInfo.receiveGoodsAddress" placeholder="收货地址"></el-input>
      </el-form-item>

      <div style="clear: both;"></div>

      <el-form-item label="留言">
        <el-input type="textarea" v-model="params.basicInfo.remark" placeholder="留言" style="width:450px;"></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="submit()">确认</el-button>
    <el-button type="primary" @click="cancel()">返回</el-button>
  </div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import Upload from '~packages/form/upload.vue';
  import { _Getpricelist,_addDingdanForm,_getDingdanInfo,_getdingdanStatus,_UpdataBasicInfo,_UpdataListInfo} from '../../util/ajax';
  export default {
    data() {
      return {
        params: {
          basicInfo:{
            orderId:0,                               //订单id
            contactName:"",                           //联系人
            contactPhone:"",                          //联系电话
            getGoodsType:"",                          //取货方式：1=本方送货、2=厂家取货
            getGoodsAddress:"",                       //取货地址
            receiveGoodsType:"",                      //送货方式：1=本方自提、2=厂家送货
            receiveGoodsAddress:"",                   //送货地址
            processDeadline:"",                       //交货时间
            remark:""                                 //备注
          },
          routineInfo:'',               //表格1里边的数据
          customInfo:'',                //表格2里边的数据
        },
      }
    },
    components: {
      UcUpload: Upload
    },
    methods: {
      //拿到请求的数据
      getOederList(){
        var _this = this;
        var params = {
          id: _this.$route.params.id
        };
        _getDingdanInfo(params).then(function (response) {
          console.log("**************************");
          console.log(response);

          var data = response.data;               //拿到返回数据

          if (data.status) {
            _this.params.basicInfo = data.data.basicInfo;   //基本信息获取
          }else {
            CONSTANT.methods.tips(''+ data.error_msg || '获取订单一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(''+ res || '获取订单一览异常!', '提示');
        });
      },
      cancel(){
        location.href = location.origin + '/#/orderList';
      },
      submit(){
        this.updateBasicInfo();
      },

      //格式化日期
      dateChange(val) {
        this.params.basicInfo.processDeadline = val;
      },


      //更新表单中的基本信息
      updateBasicInfo(){
        var _this = this;
        var BasicParams = {
          orderId:parseInt(_this.$route.params.id),                               //订单id
          contactName:_this.params.basicInfo.contactName,                      //联系人
          contactPhone:_this.params.basicInfo.contactPhone,              //联系电话
          getGoodsType:_this.params.basicInfo.getGoodsType,                        //取货方式
          getGoodsAddress:_this.params.basicInfo.getGoodsAddress,   //取货地址
          receiveGoodsType:_this.params.basicInfo.receiveGoodsType,                      //送货方式
          receiveGoodsAddress:_this.params.basicInfo.receiveGoodsAddress, //送货地址
          processDeadline:_this.params.basicInfo.processDeadline,               //交货时间
          remark:_this.params.basicInfo.remark                       //备注
        };

        console.log(BasicParams);
        if(BasicParams.contactName == ''){
          CONSTANT.methods.tips('请添加联系人', '提示');
        }else if(BasicParams.contactPhone == ''){
          CONSTANT.methods.tips('请添加联系方式', '提示');
        }else if(BasicParams.processDeadline == ''){
          CONSTANT.methods.tips('请添加交货时间', '提示');
        }else if(BasicParams.getGoodsType == ''){
          CONSTANT.methods.tips('请添加收货方式', '提示');
        }else if(BasicParams.getGoodsType == 2 && BasicParams.getGoodsAddress == ''){
          CONSTANT.methods.tips('请添加收货地址', '提示');
        }else if(BasicParams.receiveGoodsType == ''){
          CONSTANT.methods.tips('请添加送货方式', '提示');
        }else if(BasicParams.receiveGoodsType == 2 && BasicParams.receiveGoodsAddress == ''){
          CONSTANT.methods.tips('请添加送货地址', '提示');
        }else {
          _UpdataBasicInfo(BasicParams).then(function (response) {
            console.log(response);
            var data = response.data;               //拿到返回数据

            if (data.status) {
              console.log("提交基本信息成功");
              location.href = location.origin + '/#/orderList';
            }else {
              CONSTANT.methods.tips(''+ data.error_msg || '提交基本信息失败!', '提示');
            }
          }).catch(function (res) {
            CONSTANT.methods.tips(''+ res || '提交基本信息异常!', '提示');
          });
        }
      },

    },
    mounted (){
      this.getOederList();                             //获取订单列表
    }
  }
</script>
<style>
  .el-table .cell{
    text-align: center!important;
  }
</style>
<style scoped>
  h3{
    padding: 20px 0;
    color: #48576a;
  }
  .count{
    height: 40px;
    line-height: 40px;
    text-align: right;
    background: #62B9FF;
    padding-right: 130px;
  }
</style>