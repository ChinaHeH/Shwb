<template>
  <main class="uc-slider-list">
    <uc-button type="primary" @click="goAdd">新增</uc-button>
    <uc-table :cData="cData" :tData="tData" :operation="true" :pagination="pagination" type="logo"></uc-table>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getCustomerList, _disableCustomer, _enableCustomer, _deleteCustomer } from '../../util/ajax';
  import Table from '~packages/table/table.vue';
  import { Button } from 'element-ui';

  export default {
    data () {
      var cData = [];

      cData.push({
        label: '客户名',
        key: 'customerName'
      });
      cData.push({
        label: '公司电话',
        key: 'phone'
      });
      cData.push({
        label: '公司地址',
        key: 'address'
      });
      cData.push({
        label: '联系人',
        key: 'contactName'
      });
      cData.push({
        label: '联系电话',
        key: 'contactPhone'
      });

      cData.push({
        label: '展示状态',
        key: 'showFlgName'
      });
      return {
        cData: cData,
        tData: [],
        pagination: {
          show: true,
          total: 0,
          currentPage: 1,
          click: page => {
            this.getCustomerList({
              page_now: page,
              limit: 10
            });
          }
        }
      };
    },
    components: {
      UcButton: Button,
      UcTable: Table
    },
    methods: {
      getCustomerList (params) {
        var _this = this;

        _getCustomerList(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            data.data.list.forEach(function (element) {
              element.btns = [];
              element.btns.push({
                type: 'info',
                label: '查看',
                click: function (index, row) {
                  location.href = location.origin + '/#/customerinfo/' + row.id;
                }
              });
              element.btns.push({
                type: 'warning',
                label: '编辑',
                click: function (index, row) {
                  location.href = location.origin + '/#/customeredit/' + row.id;
                }
              });
              if (element.status === '1') {
                element.btns.push({
                  label: '禁用',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否禁用该客户？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.disableCustomer(row.id);
                      }

                    });
                  }
                });
              } else if (element.status === '2') {
                element.btns.push({
                  label: '启用',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否启用该客户？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.enableCustomer(row.id);
                      }
                    });
                  }
                });
              }
              element.btns.push({
                type: 'danger',
                label: '删除',
                click: function (index, row) {
                  CONSTANT.methods.confirm('是否删除该客户？', '确定', function (value) {
                    if (value === 'confirm') {
                      _this.deleteCustomer(row.id);
                    }

                  });
                }
              });
            });
            _this.tData = data.data.list;
            _this.pagination.total = data.data.total_num;
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取客户一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取客户一览异常!', '提示');
        });
      },
      disableCustomer (id) {
        var _this = this;
        var params = {
          id: id
        };

        _disableCustomer(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('禁用成功!', '确定', function () {
              _this.getCustomerList({
                page_now: 1,
                limit: 10
              });
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '禁用失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '禁用异常!', '提示');
        });
      },
      enableCustomer (id) {
        var _this = this;
        var params = {
          id: id
        };

        _enableCustomer(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('启用成功!', '确定', function () {
              _this.getCustomerList({
                page_now: 1,
                limit: 10
              });
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '启用失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '启用异常!', '提示');
        });
      },
      deleteCustomer (id) {
        var _this = this;
        var params = {
          id: id
        };

        _deleteCustomer(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('删除成功!', '确定', function () {
              _this.getCustomerList({
                page_now: 1,
                limit: 10
              });
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '删除轮播图失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '删除轮播图异常!', '提示');
        });
      },
      goAdd () {
        location.href = location.origin + '/#/customeradd';
      }
    },
    mounted () {
      this.getCustomerList({
        page_now: 1,
        limit: 10
      });
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