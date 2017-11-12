<template>
  <main>
    <uc-grid :cData="cData"></uc-grid>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getSlideShow } from '../../util/ajax';
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
      getSlideShow () {
        var _this = this;

        var params = {
          id: _this.$route.params.id
        };

        _getSlideShow(params).then(function (response) {
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
          label: '轮播图序号',
          value: data.sequence
        }, {
          type: 'img',
          label: '缩略图',
          value: data.picture
        }, {
          label: '轮播图链接',
          value: data.picture
        }, {
          label: '创建时间',
          value: data.createTime
        }];
      }
    },
    mounted () {
      this.getSlideShow();
    }
  };
</script>
<style>
  .el-table .cell{
    text-align: center!important;
  }
</style>
<style lang="scss" scoped>

</style>