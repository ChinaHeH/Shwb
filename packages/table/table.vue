
<template>
  <section class="uc-table-scale">
    <el-table :data="tableData" ref="ruleForm" class="uc-table" style="width: 100%">
      <el-table-column v-for="item in columnData" :label="item.label" :prop="item.key"></el-table-column>
      <el-table-column v-if="type === 'img'" label="缩略图">
        <template  scope="scope">
          <img :src="scope.row.picture" class="uc-table-thumbnails" @click="scaleImg('2', scope.row.picture)">
        </template>
      </el-table-column>
      <el-table-column v-if="type === 'logo'" label="客户logo缩略图">
        <template  scope="scope">
          <img :src="scope.row.logo" class="uc-table-thumbnails" @click="scaleImg('2', scope.row.logo)">
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="operation" :width="300">
        <template scope="scope">
          <el-button
            size="small"
            :type="btn.type"
            @click="btn.click(scope.$index, scope.row)" v-for="btn in scope.row.btns">{{btn.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="uc-pagination"
      v-if="pagination.show"
      @current-change="pagination.click"
      :current-page="pagination.currentPage"
      layout="total, prev, pager, next"
      :total="pagination.total"
    ></el-pagination>
    <footer v-if="scale.show">
      <div @click="scaleImg('1')"></div>
      <img :src="scale.src">
    </footer>
  </section>
</template>

<script>

  import { Table, TableColumn, Button, Pagination } from 'element-ui';
  export default {
    data () {
      return {
        columnData: this.cData,
        tableData: this.tData,
        scale: {
          show: false,
          src: require('../../src/images/default.png')
        }
      };
    },
    components: {
      ElButton: Button,
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElPagination: Pagination
    },
    methods: {
      scaleImg (type, src) {
        if (type === '1') {
          this.scale.show = false;
        } else {
          this.scale.show = true;
          this.scale.src = src;
        }
      }
    },
    props: {
      cData: [Array],
      tData: [Array],
      operation: [Boolean],
      pagination: [Object],
      type: [String]
    },
    watch: {
      'tData' (newVal) {
        this.tableData = newVal;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .uc-table{
    background-color: white;
  }
  .uc-pagination{
    text-align: center;
    margin: 30px 0;
  }
  .uc-table-thumbnails{
    width: 40px;
    height: 40px;
    padding: 5px 0;
    flex-direction: column;
    display: flex;
  }
  .uc-table-scale{
    >footer{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 100;
      >div{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: black;
        z-index: 120;
        opacity: .4;
      }
      >img{
        z-index: 121;
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: 0 0;
        max-width: 90%;
        max-height: 90%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }

</style>
