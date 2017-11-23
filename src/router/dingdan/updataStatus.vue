<template>
  <div>
    <h3>订单状态</h3>
    <div style="margin-top: 20px;"></div>

    <el-form :inline="true" :model="slectParams" class="demo-ruleForm" label-width="100px">
      <el-form-item label="订单状态">
        <el-select v-model="slectParams.getStatus" placeholder="运送状态">
          <el-option label="待取货" value="1"></el-option>
          <el-option label="生产中" value="2"></el-option>
          <el-option label="待送货" value="3"></el-option>
          <el-option label="已签收" value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="updateStatue()">确认</el-button>
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
        //表格数据

        slectParams:{                       //筛选信息
          checkStatus:'',                   //审核状态verifyStatusName
          payStatus:'',                     //支付状态 payStatusName
          getStatus:''                      //取货状态 goodsStatusName
        },
        quanxian:'',                        //权限
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
          var data = response.data;               //拿到返回数据
          if (data.status) {
            _this.slectParams.getStatus = data.data.basicInfo.goodsStatus;
          }else {
            CONSTANT.methods.tips(''+ data.error_msg || '获取订单一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(''+ res || '获取订单一览异常!', '提示');
        });
      },

//      运送状态
      updateStatue(){
        var _this = this;
        var StateParams = {
          id: _this.$route.params.id,
          goodsStatus:_this.slectParams.getStatus       //货物状态：1=待取货、2=生产中、3=待送货、4=已签收
        };
        console.log(StateParams);
        _getdingdanStatus(StateParams).then(function (response) {
          console.log(response);
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips(data.error_msg || '订单状态已更新!', '提示');
            location.href = location.origin + '/#/orderList';
          }else {
            CONSTANT.methods.tips(data.error_msg || '更新订单状态失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '更新订单状态异常!', '提示');
        });
      },

      cancel(){
        location.href = location.origin + '/#/orderList';
      }
    },
    mounted (){
      this.getOederList();                             //获取订单列表
    }
  }
</script>
<style>
  .el-table .cell{
    text-align: left!important;
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