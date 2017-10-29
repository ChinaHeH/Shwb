<template>
  <main>
    <uc-grid :cData="cData"></uc-grid>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _Getprice } from '../../util/ajax';
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
      Getprice () {
        var _this = this;

        var params = {
          id: _this.$route.params.id
        };

        _Getprice(params).then(function (response) {
          var data = response.data;
          console.log(data);
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
          label: '账户类型',
          value: data.roleName
        }, {
          label: '账号状态',
          value: data.statusName
        }, {
          label: '邮箱地址',
          value: data.email
        }, {
          label: '创建时间',
          value: data.createTime
        }];
      }
    },
    mounted () {
      this.Getprice();
    }
  };
</script>
<style lang="scss" scoped>

</style>