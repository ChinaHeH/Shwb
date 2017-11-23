<template>
  <main class="uc-slider-list">
    <uc-button type="primary" @click="goAdd">新增</uc-button>
    <uc-table :cData="cData" :tData="tData" :operation="true" :pagination="pagination" type="img"></uc-table>
  </main>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _getSlideShowList, _deleteSlideshow } from '../../util/ajax';
  import Table from '~packages/table/table.vue';
  import { Button } from 'element-ui';

  export default {
    data () {
      var cData = [];

      cData.push({
        label: '序号',
        key: 'sequence'
      });
      cData.push({
        label: '图片地址',
        key: 'picture'
      });
      cData.push({
        label: '创建时间',
        key: 'createTime'
      });
      return {
        cData: cData,
        tData: [],
        pagination: {
          show: true,
          total: 400,
          currentPage: 1,
          click: page => {
            this.getSlideShowList({
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
      getSlideShowList (params) {
        var _this = this;

        _getSlideShowList(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            data.data.list.forEach(function (element) {
              element.btns = [{
                type: 'info',
                label: '查看',
                click: function (index, row) {
                  location.href = location.origin + '/#/sliderinfo/' + row.id;
                }
              }, {
                type: 'warning',
                label: '编辑',
                click: function (index, row) {
                  location.href = location.origin + '/#/slideredit/' + row.id;
                }
              }, {
                type: 'danger',
                label: '删除',
                click: function (index, row) {
                  CONSTANT.methods.confirm('是否删除该轮播图？', '确定', function (value) {
                    if (value === 'confirm') {
                      _this.deleteSlideshow(row.id);
                    }

                  });
                }
              }];
            });
            _this.tData = data.data.list;
            _this.pagination.total = data.data.total_num;
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取轮播图一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取轮播图一览异常!', '提示');
        });
      },
      deleteSlideshow (id) {
        var _this = this;
        var params = {
          id: id
        };
        
        _deleteSlideshow(params).then(function (response) {
          var data = response.data;

          if (data.status) {
            CONSTANT.methods.tips('删除成功!', '确定', function () {
              _this.getSlideShowList({
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
        location.href = location.origin + '/#/slideradd';
      }
    },
    mounted () {
      this.getSlideShowList({
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