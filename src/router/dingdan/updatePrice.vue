<template>
  <div>
    <h3>价格更改</h3>
    <div style="margin-top: 20px;"></div>

    <el-table stripe ref="multipleTable" :data="priceList"  tooltip-effect="dark" :fit="true" style="width:100%">
      <!--<el-table-column  type="selection" width="50"></el-table-column>-->
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" placeholder="名称"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="材料数量／片">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="报价/元">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.price" placeholder="报价"></el-input>
        </template>
      </el-table-column>

    </el-table>

    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="commit()">确认</el-button>
    <el-button type="primary" @click="cancel()">返回</el-button>
  </div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import Upload from '~packages/form/upload.vue';
  import { _Getpricelist,_changePrice} from '../../util/ajax';
  export default {
    data() {
      return {
        priceList:[],                               //价格列表

        //传给后台的请求参数
        priceParams:{
          page_now:"",
          limit:'',
          sort_by:"",
          sort_type:"desc",
          search_by:{
            processName:"",       //工艺名称(模糊)
            stoneType:"",         //石料类别
            sizeType:""          //规格类别
          }
        },

        //提交订单的时候传给后台的参数
        params: {
          orderId:'',                  //订单id
          priceInfo:[]                 //价格列表的数组
        },
        //表格数据
        priceInfoArr:[]
      }
    },
    components: {
      UcUpload: Upload
    },
    methods: {
      //返回
      cancel(){
        location.href = location.origin + '/#/orderList';
      },

      //获取price列表
      getPriceList(priceParams){
        var _this = this;
        _Getpricelist(priceParams).then(function (response) {
          console.log(response);
          var data = response.data;

          if (data.status) {
            _this.priceList = data.data.list;         //价格列表
            for(let i = 0;i < _this.priceList.length;i++){
              _this.priceList[i].rawNumber = 0;
            }
          }else {
            CONSTANT.methods.tips(data.error_msg || '获取价格失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取价格异常!', '提示');
        });
      },

      //提交的时候
      commit(){
        var _this = this;
        this.params.orderId = _this.$route.params.id;
        for(let i = 0;i < _this.priceList.length;i++){
            _this.priceInfoArr.push({
              processId:_this.priceList[i].id,  //加工需求id
              price:_this.priceList[i].price,     //单价
              rawNumber:_this.priceList[i].rawNumber    //原材料片数，单位：片
            })
        }
        _this.params.priceInfo = _this.priceInfoArr;

        _changePrice(_this.params).then(function (response) {
          console.log(response);
          var data = response.data;

          if (data.status) {
            location.href = location.origin + '/#/orderList';
          }else {
            CONSTANT.methods.tips(data.error_msg || '更改价格失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '更改价格异常!', '提示');
        });
      }

    },
    mounted (){
      this.getPriceList(this.priceParams);             //获取订单价格列表
    }
  }
</script>
<style scoped>
  h3{
    padding: 20px 0;
    color: #48576a;
  }
  .count{
    height: 40px;
    line-height: 40px;
    text-align: right;
    background: #62B9FF;
    padding-right: 130px;
  }
</style>