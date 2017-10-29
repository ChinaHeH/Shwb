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
          id: Number(_this.$route.params.id)
        };

        _Getprice(params).then(function (response) {
          var data = response.data;
          console.log(data);
          if (data.status) {
            _this.dealData(data.data);
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取价格设定异常!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取价格设定异常!', '提示');
        });
      },
      dealData (data) {
        this.cData = [{
          label: '工艺名称',
          value: data.processName
        }, {
          label: '石料类别',
          value: data.stoneTypeName
        }, {
          label: '规格类别',
          value: data.sizeTypeName
        }, {
          label: '价格',
          value: '¥'+data.price
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