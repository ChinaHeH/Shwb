<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-ruleForm" label-width="100px">
      <h3>订单基本信息</h3>

      <el-form-item label="联系人 :">
        {{params.basicInfo.contactName}}
      </el-form-item>

      <el-form-item label="联系电话 :">
        {{params.basicInfo.contactPhone}}
      </el-form-item>

      <el-form-item label="交货时间 :">
        {{params.basicInfo.processDeadline}}
      </el-form-item>

      <el-form-item label="取货方式 :">
        {{params.basicInfo.getGoodsType | getGoodTypes}}
      </el-form-item>

      <el-form-item label="取货地址 :" v-show="params.basicInfo.getGoodsType == 2">
        {{params.basicInfo.getGoodsAddress}}
      </el-form-item>

      <el-form-item label="送货方式 :">
        {{params.basicInfo.receiveGoodsType | sendGoodsTypes}}
      </el-form-item>

      <el-form-item label="收货地址 :"  v-show="params.basicInfo.receiveGoodsType == 2">
        {{params.basicInfo.receiveGoodsAddress}}
      </el-form-item>

      <el-form-item label="留言 :" v-if="params.basicInfo.remark">
        {{params.basicInfo.remark}}
      </el-form-item>
    </el-form>

    <h3>加工信息-基本信息</h3>
    <div style="margin-top: 20px;"></div>

    <el-table stripe ref="multipleTable" :data="tableData1"  tooltip-effect="dark" :fit="true" style="width:100%">
      <el-table-column label="型号" width="150">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="材料规格／mm" width="300">
        <template slot-scope="scope">
          {{scope.row.rawSizeTypeName}}
        </template>
      </el-table-column>
      <el-table-column label="材料数量／片" width="150">
        <template slot-scope="scope">
          {{scope.row.rawNumber}}
        </template>
      </el-table-column>
      <el-table-column label="成品长度／mm" width="150">
        <template slot-scope="scope">
          {{scope.row.productLength}}
        </template>
      </el-table-column>
      <el-table-column label="成品宽度／mm" width="150">
        <template slot-scope="scope">
          {{scope.row.productWidth}}
        </template>
      </el-table-column>
      <el-table-column label="成品数量／片" width="150">
        <template slot-scope="scope">
          {{scope.row.productNumber}}
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>

      <el-table-column label="加工示意图">
        <template slot-scope="scope">
          <div class='uc-upload'>
            <section>
              <div v-for="(item, index) in scope.row.picture">
                <img :src="item" @click="scaleImg(2, item)">
                <div :style="item.style"></div>
              </div>
            </section>
            <footer v-if="scale.show">
              <div @click="scaleImg('1')"></div>
              <img :src="scale.src">
            </footer>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <h3>加工信息-自定义信息</h3>
    <div style="margin-top: 20px;"></div>

    <el-table ref="multipleTable" stripe :data="tableData2" tooltip-effect="dark">
      <el-table-column label="型号">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column label="材料规格／mm">
        <template slot-scope="scope">
          {{scope.row.rawSizeTypeName}}
        </template>
      </el-table-column>

      <el-table-column label="材料数量／片">
        <template slot-scope="scope">
          {{scope.row.rawNumber}}
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">
          {{scope.row.remark}}
        </template>
      </el-table-column>

      <el-table-column label="加工示意图">
        <template slot-scope="scope">
          <div class='uc-upload'>
            <section>
              <div v-for="(item, index) in scope.row.picture">
                <img :src="item" @click="scaleImg(2, item)">
                <div :style="item.style"></div>
              </div>
            </section>
            <footer v-if="scale.show">
              <div @click="scaleImg('1')"></div>
              <img :src="scale.src">
            </footer>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="价格">
        <template slot-scope="scope">
          <el-input type="input" v-model="scope.row.price" placeholder="请输入价格" @change = "totalNmu()"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <p class="count">合计：￥{{count}} 元</p>

    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="submit()">确认</el-button>
    <el-button type="primary" @click="cancel()">返回</el-button>
  </div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import Upload from '~packages/form/upload.vue';
  import { _Getpricelist,_addDingdanForm,_getDingdanInfo,_changePrice} from '../../util/ajax';
  export default {
    data() {
      return {
        multipleTable:[],//选中的值
        priceList:[],                               //价格列表

        scale: {
          show: false,
          src: require('../../images/default.png')
        },
        count:0,//合计
        //提交订单的时候传给后台的参数
        params: {
          basicInfo:{
            contactName:"",                           //联系人
            contactPhone:"",                          //联系电话
            getGoodsType:"",                          //取货方式：1=本方送货、2=厂家取货
            getGoodsAddress:"",                       //取货地址
            receiveGoodsType:"",                      //送货方式：1=本方自提、2=厂家送货
            receiveGoodsAddress:"",                   //送货地址
            processDeadline:"",                       //交货时间
            remark:""                                 //备注
          },
          routineInfo:'',               //表格1里边的数据
          customInfo:'',                //表格2里边的数据
        },
        //表格数据

        tableData1: [],

        tableData2:[],
        multipleSelection: [],

        priceInfo:[],
      }
    },
    components: {
      UcUpload: Upload
    },
    methods: {
      //拿到请求的数据
      getOederList(){
        var _this = this;
        var params = {
          id: _this.$route.params.id
        };
        _getDingdanInfo(params).then(function (response) {
          console.log("**************************");
          console.log(response);

          var data = response.data;               //拿到返回数据

          if (data.status) {
            _this.params.basicInfo = data.data.basicInfo;   //基本信息获取
            var dataList = data.data.processInfo;

            for(let i = 0;i < dataList.length;i++){
              if(dataList[i].processType == 1 || dataList[i].processType == "1"){
                _this.tableData1.push(dataList[i]);
              }else if(dataList[i].processType == 2 || dataList[i].processType == "2"){
                _this.tableData2.push(dataList[i]);
              }
            }
            for(let j = 0;j < _this.tableData2.length;j++){
                _this.tableData2[j].price = 0;
            }

            setTimeout(function () {
              for(let j = 0;j < _this.tableData1.length;j++){
                _this.count = _this.count + parseFloat(_this.tableData1[j].rawNumber) * parseFloat(_this.tableData1[j].price);
              }
            },500)
          }else {
            CONSTANT.methods.tips(''+ data.error_msg || '获取订单一览失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(''+ res || '获取订单一览异常!', '提示');
        });

      },
      cancel(){
        location.href = location.origin + '/#/orderList';
      },
      scaleImg (type, src) {
        if (type === '1') {
          this.scale.show = false;
        } else {
          this.scale.show = true;
          this.scale.src = src.split('?imageView2')[0];
        }
      },
      submit(){
          var _this = this;
          _this.priceInfo = [];
          for(let i = 0;i < _this.tableData2.length;i++){
            _this.priceInfo.push({
              processId:_this.tableData2[i].id,                        //加工需求id
              price:_this.tableData2[i].price                          //总价
            })
          }
          var params = {
            orderId:parseInt(_this.$route.params.id),
            priceInfo:_this.priceInfo
          };

          console.log(params);

        _changePrice(params).then(function (response) {
          console.log(response);
          var data = response.data;               //拿到返回数据

          if (data.status) {
            console.log("更改价格成功");
            location.href = location.origin + '/#/orderList';
          }else {
              CONSTANT.methods.tips("更改价格失败", '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(''+ res || '更改价格异常!', '提示');
        });
      },
      totalNmu(){
          var _this = this;
          _this.count = 0;
          for(let i = 0;i < _this.tableData1.length;i++){
              if(_this.tableData1[i].price == ""){
                _this.tableData1[i].price == 0;
              }
              _this.count = _this.count + parseFloat(_this.tableData1[i].price)*parseFloat(_this.tableData1[i].rawNumber);
          }
          for(let j = 0;j < _this.tableData2.length;j++){
              if(_this.tableData2[j].price == ""){
                _this.tableData2[j].price = 0;
              }
              _this.count = _this.count + parseFloat(_this.tableData2[j].price)*parseFloat(_this.tableData2[j].rawNumber);
          }
      }
    },
    mounted (){
      this.getOederList();
    },
    filters:{
      getGoodTypes:function (value) {
        if(value == 1){
          value = "本方送货";
          return value;
        }else if(value == 2){
          value = "厂家取货";
          return value;
        }
      },
      sendGoodsTypes:function (value) {
        if(value == 1){
          value = "厂家送货";
          return value;
        }else if(value == 2){
          value = "本方自提";
          return value;
        }
      }
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
  .uc-upload{
  >label{
     vertical-align: middle;
     font-size: 14px;
     color: #48576a;
     line-height: 1;
     box-sizing: border-box;
     float: none;
     display: inline-block;
     text-align: left;
     padding: 0 0 10px;
  &.required:before{
     content: '*';
     color: #ff4949;
     margin-right: 4px;
   }
  }
  >div{
     position: relative;
     background-color: #fff;
     border-radius: 4px;
     border: 1px solid #bfcbd9;
     color: #1f2d3d;
     height: 28px;
     line-height: 28px;
     padding: 3px 10px;
     transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  /*margin: 0 0 22px;*/
  >span{
     z-index: 1;
     border-radius: 4px;
     border: 1px solid #bfcbd9;
     padding: 2px 5px;
     cursor: pointer;
   }
  &.error{
     border-color: red;
   }
  }
  >span{
     margin-top: -22px;
     display: block;
     color: red;
     height: 22px;
     line-height: 22px;
     font-size: 12px;
   }
  >section{
     overflow: hidden;
  >div{
     position: relative;
     width: 50px;
     height: 50px;
     float: left;
     margin: 0 10px 10px 0;
  >i{
     position: absolute;
     top: 0;
     right: 0;
     background: black;
     color: white;
     font-size: 22px;
     padding: 2px;
     border-radius: 50%;
     height: 26px;
     width: 26px;
     text-align: center;
     opacity: .7;
     cursor: pointer;
   }
  >img{
     width: 50px;
     height: 50px;
   }
  >div{
     height: 0%;
     position: absolute;
     width: 100%;
     bottom: 0;
     left: 0;
     background: black;
     opacity: .2;
     transition: all 0.5s;
   }
  }
  }
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