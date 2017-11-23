<template>
  <main class="uc-slider-list">
    <uc-button type="primary" @click="goAdd">新增</uc-button>
    <uc-table :cData="cData" :tData="tData" :operation="true" :pagination="pagination"></uc-table>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getUserList, _disableUser, _enableUser, _deleteUser } from '../../util/ajax';
  import Table from '~packages/table/table.vue';
  import { Button } from 'element-ui';

  export default {
    data () {
      var cData = [];

      cData.push({
        label: '账户名',
        key: 'userName'
      });
      cData.push({
        label: '账户类型',
        key: 'roleName'
      });
      cData.push({
        label: '账户状态',
        key: 'statusName'
      });
      cData.push({
        label: '邮箱地址',
        key: 'email'
      });
      cData.push({
        label: '客户名称',
        key: 'customerName'
      });

      return {
        cData: cData,
        tData: [],
        pagination: {
          show: true,
          total: 0,
          currentPage: 1,
          size:5,
          click: page => {
            this.getUserList({
              page_now: page,
              limit: 5
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
      getUserList (params) {
        var _this = this;

        _getUserList(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            data.data.list.forEach(function (element) {
              element.btns = [];
              element.btns.push({
                type: 'info',
                label: '查看',
                click: function (index, row) {
                  location.href = location.origin + '/#/userinfo/' + row.id;
                }
              });
              element.btns.push({
                type: 'warning',
                label: '编辑',
                click: function (index, row) {
                  location.href = location.origin + '/#/useredit/' + row.id;
                }
              });
              if (element.status === '1') {
                element.btns.push({
                  label: '禁用',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否禁用该用户？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.disableUser(row.id);
                      }

                    });
                  }
                });
              } else if (element.status === '2') {
                element.btns.push({
                  label: '启用',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否启用该用户？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.enableUser(row.id);
                      }
                    });
                  }
                });
              }
              if (element.role !== 3) {
                element.btns.push({
                  type: 'danger',
                  label: '删除',
                  click: function (index, row) {
                    CONSTANT.methods.confirm('是否删除该用户？', '确定', function (value) {
                      if (value === 'confirm') {
                        _this.deleteUser(row.id);
                      }

                    });
                  }
                });
              }

            });
            _this.tData = data.data.list;
            _this.pagination.total = data.data.total_num;
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取用户一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取用户一览异常!', '提示');
        });
      },
      disableUser (id) {
        var _this = this;
        var params = {
          id: id
        };

        _disableUser(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('禁用成功!', '确定', function () {
              _this.getUserList({
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
      enableUser (id) {
        var _this = this;
        var params = {
          id: id
        };

        _enableUser(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('启用成功!', '确定', function () {
              _this.getUserList({
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
      deleteUser (id) {
        var _this = this;
        var params = {
          id: id
        };

        _deleteUser(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('删除成功!', '确定', function () {
              _this.getUserList({
                page_now: 1,
                limit: 10
              });
            });
          } else {
            CONSTANT.methods.tips(data.error_msg || '删除失败!', '提示');
          }
        }).catch(function (response) {
          CONSTANT.methods.tips(response || '删除异常!', '提示');
        });
      },
      goAdd () {
        location.href = location.origin + '/#/useradd';
      }
    },
    mounted () {
      this.getUserList({
        page_now: 1,
        limit: 10
      });
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
<style lang="scss" scoped>
.uc-slider-list{
  >button{
    margin-bottom: 10px;
  }
}
</style>