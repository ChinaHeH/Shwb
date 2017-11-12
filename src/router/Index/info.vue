<template>
  <main class="uc-home-info">
    <uc-button type="primary" @click="goAdd">编辑</uc-button>
    <uc-grid :cData="cData"></uc-grid>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getCompanyProfile } from '../../util/ajax';
  import Grid from '~packages/grid/grid.vue';
  import { Button } from 'element-ui';
  export default {
    data () {
      return {
        cData: []
      };
    },
    components: {
      UcButton: Button,
      UcGrid: Grid
    },
    methods: {
      getCompanyProfile () {
        var _this = this;


        _getCompanyProfile().then(function (response) {
          var data = response.data;

          if (data.status) {
            _this.dealData(data.data);
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取轮播图信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取轮播图信息异常!', '提示');
        });
      },
      dealData (data) {
        this.cData = [{
          label: '公司简介',
          value: data.word
        }, {
          label: '创建时间',
          value: data.createTime
        }];
      },
      goAdd () {
        location.href = location.origin + '/#/companyedit';
      }
    },
    mounted () {
      this.getCompanyProfile();
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: center!important;
  }
</style>
<style lang="scss" scoped>
  .uc-home-info{
    >button{
      margin-bottom: 10px;
    }
  }
</style>