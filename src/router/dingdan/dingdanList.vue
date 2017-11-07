<template>
  <main class="uc-slider-list">
    <uc-button type="primary" @click="goAdd" v-show="quanxian == 3">新增</uc-button>
    <uc-button type="primary" @click="checkout()">检索</uc-button>

    <div style="margin: 20px;"></div>
    <el-form :inline="true" :model="params.search_by" class="demo-form-inline">

      <!--<el-form-item label="客户">-->
        <!--<el-input v-model="params.search_by.customerName" placeholder="客户"></el-input>-->
      <!--</el-form-item>-->

      <el-form-item label="订单状态">
        <el-select v-model="params.search_by.verifyStatus" placeholder="审核状态">
          <el-option label="未审核" value="1"></el-option>
          <el-option label="已审核" value="2"></el-option>
          <el-option label="已退回" value="3"></el-option>
        </el-select>
        <el-select v-model="params.search_by.payStatus" placeholder="支付状态">
          <el-option label="未支付" value="1"></el-option>
          <el-option label="已支付" value="2"></el-option>
        </el-select>
        <el-select v-model="params.search_by.goodsStatus" placeholder="生产状态">
          <el-option label="待取货" value="1"></el-option>
          <el-option label="生产中" value="2"></el-option>
          <el-option label="待送货" value="3"></el-option>
          <el-option label="已签收" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="下单时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="params.search_by.orderStartTime" @change="dateChange1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="截止日期" v-model="params.search_by.orderEndTime" @change="dateChange2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="交货时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始日期" v-model="params.search_by.deliveryStartTime" @change="dateChange3" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="截止日期" v-model="params.search_by.deliveryEndTime" @change="dateChange4" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="checkout()">检索</el-button>-->
      <!--</el-form-item>-->

    </el-form>

    <uc-table :cData="cData" :tData="tData" :operation="true" :pagination="pagination"></uc-table>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _GetDingdanList,_deletedingdan,_checkdingdan,_returndingdan} from '../../util/ajax';
  import Table from '~packages/table/table.vue';
  import { Button } from 'element-ui';

  export default {
    data () {
      var cData = [{
        label: '客户名称',
        key: 'customerName'
      },{
        label: '订单编号',
        key: 'orderNo'
      },{
        label: '联系人',
        key: 'contactName'
      },{
        label: '联系电话',
        key: 'contactPhone'
      },{
        label: '下单时间',
        key: 'createTime'
      },{
        label: '交货时间',
        key: 'processDeadline'
      },{
        label: '订单状态',
        key: 'goodsStatusName'
      },{
        label: '订单金额',
        key: 'orderSum'
      }];

      return {
        params:{
          page_now:1,
          limit:10,
          sort_by:"",
          sort_type:"desc",
          search_by: {
            customerName: '',            //客户名称
            verifyStatus: '',            //审核状态:1=未审核、2=已审核、3=已退回
            payStatus:'',                //支付状态:1=未结算、2=已结算
            goodsStatus:'',              //货物状态:1=待取货、2=生产中、3=待送货、4=已签收
            orderStartTime:'',           //下单开始时间
            orderEndTime:'',             //下单结束时间
            deliveryStartTime:'',        //交货开始时间
            deliveryEndTime:'',          //交货结束时间
          },
        },
        quanxian:'',                    //权限问题   百特admin     百特user     客户admin



        cData: cData,
        tData: [],
        pagination: {
          show: true,
          total: 0,
          currentPage: 1,
          click: page => {
            this.getDingdanListPage(page);
          }
        }
      };
    },
    components: {
      UcButton: Button,
      UcTable: Table
    },
    methods: {
        //筛选
      checkout() {
        this.getDingdanList (this.params);
      },

      //查询分页列表
      //获取订单列表
      getDingdanListPage (pageNum){
        var _this = this;
        _this.params.page_now = pageNum;
        _GetDingdanList(_this.params).then(function (response) {
          console.log("******************************");
          console.log(response);
          var data = response.data;

          if (data.status) {
            data.data.list.forEach(function (element) {
              element.btns = [];
              element.btns.push({
                type: 'info',
                label: '查看',
                click: function (index, row) {
                  location.href = location.origin + '/#/orderCheck/' + row.id;
                }
              });

              if(_this.quanxian == 3){
                  if(element.verifyStatus == 1 || element.verifyStatus == "1"){
                    element.btns.push({
                      type: 'info',
                      label: '编辑订单信息',
                      click: function (index, row) {
                        location.href = location.origin + '/#/orderEdit/' + row.id;
                      }
                    });
                    element.btns.push({
                      type: 'info',
                      label: '编辑基本信息',
                      click: function (index, row) {
                        location.href = location.origin + '/#/orderBasicEdit/' + row.id;
                      }
                    });
                  }


                element.btns.push({
                  type: 'danger',
                  label: '删除',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否删除该订单？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.deletedingdan(row.id);
                      }
                    });
                  }
                });
              }



              if(_this.quanxian == 1 || _this.quanxian == 2){
                if(element.verifyStatus == 2 || element.verifyStatus == "2"){
                  element.btns.push({
                    type: 'primary',
                    label: '已审核',
                    click: function (index, row) {
                      console.log("已审核")
                    }
                  });
                }else if(element.verifyStatus == 1 || element.verifyStatus == "1"){
                  element.btns.push({
                    type: 'primary',
                    label: '审核',
                    click: function (index, row) {
                      _this.Checkdingdan(row.id);
                    }
                  });
                }



                element.btns.push({
                  type: 'primary',
                  label: '回退',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否退回该订单？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.tuihuidingdan(row.id);
                      }
                    });
                  }
                });

                element.btns.push({
                  type: 'warning',
                  label: '更新状态',
                  click: function (index, row) {
                    location.href = location.origin + '/#/orderUpdateStatus/' + row.id;
                  }
                });
              }


              if(_this.quanxian == 1 || _this.quanxian == 2){
                element.btns.push({
                  type: 'warning',
                  label: '更新订单价格',
                  click: function (index, row) {
                    location.href = location.origin + '/#/orderUpdatePrice/' + row.id;
                  }
                });
              }

            });
            _this.tData = data.data.list;
            _this.pagination.total = data.data.total_num;
          }else {
            CONSTANT.methods.tips(data.error_msg || '获取订单一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取订单一览异常!', '提示');
        });
      },


      //获取订单列表
      getDingdanList (params){
        var _this = this;
        _GetDingdanList(params).then(function (response) {
          console.log("******************************");
          console.log(response);
          var data = response.data;

          if (data.status) {
            data.data.list.forEach(function (element) {
              element.btns = [];
              element.btns.push({
                type: 'info',
                label: '查看',
                click: function (index, row) {
                  location.href = location.origin + '/#/orderCheck/' + row.id;
                }
              });

              if(_this.quanxian == 3){
                if(element.verifyStatus == 1 || element.verifyStatus == "1"){
                  element.btns.push({
                    type: 'info',
                    label: '编辑订单信息',
                    click: function (index, row) {
                      location.href = location.origin + '/#/orderEdit/' + row.id;
                    }
                  });
                  element.btns.push({
                    type: 'info',
                    label: '编辑基本信息',
                    click: function (index, row) {
                      location.href = location.origin + '/#/orderBasicEdit/' + row.id;
                    }
                  });
                }
                element.btns.push({
                  type: 'danger',
                  label: '删除',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否删除该订单？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.deletedingdan(row.id);
                      }
                    });
                  }
                });
              }



              if(_this.quanxian == 1 || _this.quanxian == 2){
                  if(element.verifyStatus == 2 || element.verifyStatus == "2"){
                    element.btns.push({
                      type: 'primary',
                      label: '已审核',
                      click: function (index, row) {
                        console.log("已审核")
                      }
                    });
                  }else if(element.verifyStatus == 1 || element.verifyStatus == "1"){
                    element.btns.push({
                      type: 'primary',
                      label: '审核',
                      click: function (index, row) {
                        _this.Checkdingdan(row.id);
                      }
                    });
                  }



                element.btns.push({
                  type: 'primary',
                  label: '回退',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否退回该订单？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.tuihuidingdan(row.id);
                      }
                    });
                  }
                });

                element.btns.push({
                  type: 'warning',
                  label: '更新状态',
                  click: function (index, row) {
                    location.href = location.origin + '/#/orderUpdateStatus/' + row.id;
                  }
                });
              }


              if(_this.quanxian == 1 || _this.quanxian == 2){
                element.btns.push({
                  type: 'warning',
                  label: '更新订单价格',
                  click: function (index, row) {
                    location.href = location.origin + '/#/orderUpdatePrice/' + row.id;
                  }
                });
              }

            });
            _this.tData = data.data.list;
            _this.pagination.total = data.data.total_num;
          }else {
            CONSTANT.methods.tips(data.error_msg || '获取订单一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取订单一览异常!', '提示');
        });
      },

      //删除订单
      deletedingdan (id){
        var _this = this;
        var delparams = {
          id: id
        };

        _deletedingdan(delparams).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('删除成功!', '确定', function () {
              _this.getDingdanList (_this.params);
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '删除订单失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '删除订单异常!', '提示');
        });
      },

      //审核订单
      Checkdingdan (id){
        var _this = this;
        var checkparams = {
          id: id
        };

        _checkdingdan(checkparams).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('审查成功!', '确定', function () {
              _this.getDingdanList (_this.params);
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '审查订单失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '审查订单异常!', '提示');
        });
      },

      //退回订单
      tuihuidingdan(id){
        var _this = this;
        var returnparams = {
          id: id
        };

        _returndingdan(returnparams).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('退回成功!', '确定', function () {
              _this.getDingdanList (_this.params);
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '退回订单失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '退回订单异常!', '提示');
        });
      },

      //到添加订单页面
      goAdd () {
        location.href = location.origin + '/#/orderAdd';
      },

      //格式化日期
      dateChange1(val) {
        this.params.search_by.orderStartTime = val;
      },
      dateChange2(val) {
        this.params.search_by.orderEndTime = val;
      },
      dateChange3(val) {
        this.params.search_by.deliveryStartTime = val;
      },
      dateChange4(val) {
        this.params.search_by.deliveryEndTime = val;
      },

      //getUser
      getUser(){
        var quanxianleibie = window.localStorage.roleName;
        var _this = this;
        if(quanxianleibie == '"百特admin"'){
          _this.quanxian = 1;
        }else if(quanxianleibie == '"百特user"'){
          _this.quanxian = 2;
        }else if(quanxianleibie == '"客户admin"'){
          _this.quanxian = 3;
        }
      }
    },


    mounted () {
      this.getDingdanList(this.params);
      this.getUser();
    }
  };
</script>
<style lang="scss" scoped>
  .uc-slider-list{
  >button{
     margin-bottom: 10px;
   }
  }
</style>