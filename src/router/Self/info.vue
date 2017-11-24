<template>
  <main class="uc-login">
    <uc-grid :cData="cData"></uc-grid>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getUserInfo } from '../../util/ajax';
  import Grid from '~packages/grid/grid.vue';

  export default {
    data () {
      return {
        cData: []
      };
    },
    components: {
      UcGrid: Grid
    },
    methods: {
      getUserInfo () {
        var _this = this;

        _getUserInfo().then(function (response) {
          var data = response.data;

          if (data.status) {
            _this.dealData(data.data);
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取用户信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取用户信息异常!', '提示');
        });
      },
      dealData (data) {
        this.cData = [{
          label: '用户名',
          value: data.userName
        }, {
          label: '角色名称',
          value: data.roleName
        }, {
          label: '账户状态',
          // value: data.status === 1 ? '启用' : '禁用'
          value: data.statusName
        }, {
          label: '邮箱',
          value: data.email
        }, {
          label: '创建时间',
          value: data.createTime
        }];
      }
    },
    mounted () {
      this.getUserInfo();
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
<style lang="scss" scoped>

</style>