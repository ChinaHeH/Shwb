<template>
  <main>
    <uc-grid :cData="cData"></uc-grid>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getCustomer } from '../../util/ajax';
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
      getCustomer () {
        var _this = this;

        var params = {
          id: _this.$route.params.id
        };

        _getCustomer(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            _this.dealData(data.data);
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取客户信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取客户信息异常!', '提示');
        });
      },
      dealData (data) {
        this.cData = [{
          label: '客户名称',
          value: data.customerName
        }, {
          label: '联系人',
          value: data.contactName
        }, {
          label: '联系电话',
          value: data.contactPhone
        },
        {
          type: 'img',
          label: '客户logo缩略图',
          value: data.logo
        },
        {
          label: '客户logo图片地址',
          value: data.logo
        }, {
          label: '展示状态',
          value: data.showFlgName
        }, {
          label: '账号状态',
          value: data.statusName
        }, {
          label: '客户地址',
          value: data.address
        }, {
          label: '公司电话',
          value: data.phone
        }];
      }
    },
    mounted () {
      this.getCustomer();
    }
  };
</script>
<style lang="scss" scoped>

</style>