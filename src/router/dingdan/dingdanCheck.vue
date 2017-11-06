<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-ruleForm" label-width="100px">
      <h3>订单基本信息</h3>

      <el-form-item label="联系人">
        <el-input v-model="params.basicInfo.contactName" placeholder="联系人" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="params.basicInfo.contactPhone" placeholder="联系电话" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="交货时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="截止交货日期" v-model="params.basicInfo.processDeadline" :disabled="true"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="取货地址">
        <el-input v-model="params.basicInfo.getGoodsAddress" placeholder="取货地址" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="收货地址">
        <el-input v-model="params.basicInfo.receiveGoodsAddress" placeholder="收货地址" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="取货方式">
        <el-select v-model="params.basicInfo.getGoodsType" placeholder="取货方式" :disabled="true">
          <el-option label="本方送货" value="1"></el-option>
          <el-option label="厂家取货" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="送货方式">
        <el-select v-model="params.basicInfo.receiveGoodsType" placeholder="送货方式" :disabled="true">
          <el-option label="本方自提" value="1"></el-option>
          <el-option label="厂家送货" value="2"></el-option>
        </el-select>
      </el-form-item>

      <div style="clear: both;"></div>

      <el-form-item label="留言">
        <el-input type="textarea" v-model="params.basicInfo.remark" placeholder="留言" style="width:100%" :disabled="true"></el-input>
      </el-form-item>
    </el-form>

    <h3>加工信息-基本信息</h3>
    <!--<el-button type="primary" @click="removeArr">删除基本信息</el-button>-->
    <div style="margin-top: 20px;"></div>

    <el-table stripe ref="multipleTable" :data="tableData1"  tooltip-effect="dark" :fit="true" style="width:100%">
      <!--<el-table-column  type="selection" width="50"></el-table-column>-->
      <el-table-column label="名称" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.name" placeholder="单长边外倒45度" :disabled="true">
            <el-option v-for="item in priceList" :key="item.processName" :label="item.name" :value="item.processName"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="材料规格／mm" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.rawSizeType" :disabled="true" placeholder="">
            <el-option label="600*600" value="1"></el-option>
            <el-option label="800*800" value="2"></el-option>
            <el-option label="600*900" value="3"></el-option>
            <el-option label="600*1200" value="4"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="材料数量／片" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品长度／mm" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productLength" placeholder="长度" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品宽度／mm" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productWidth" placeholder="宽度" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品数量／片" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productNumber" placeholder="成品数量" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="备注" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="报价/元" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.price" placeholder="报价" :disabled="true">
            <el-option v-for="item in priceList" :key="item.id" :label="item.price" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="加工示意图" width="200">
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
    <p class="count">合计：￥{{count}} 元</p>


    <h3>加工信息-自定义信息</h3>
    <!--<el-button type="primary">删除自定义信息</el-button>-->
    <div style="margin-top: 20px;"></div>

    <el-table ref="multipleTable" stripe :data="tableData2" tooltip-effect="dark">
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column label="型号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入型号" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="材料规格／mm" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.rawSizeType" placeholder="请选择材料规格" :disabled="true">
            <el-option label="600*600" value="1"></el-option>
            <el-option label="800*800" value="2"></el-option>
            <el-option label="600*900" value="3"></el-option>
            <el-option label="600*1200" value="4"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="材料数量／片" width="200">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量" :disabled="true"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="备注" :disabled="true"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="加工示意图" width="200">
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

    <h3>订单状态</h3>
    <!--<el-button type="primary">删除自定义信息</el-button>-->
    <div style="margin-top: 20px;"></div>

    <el-form :inline="true" :model="slectParams" class="demo-ruleForm" label-width="100px">
      <el-form-item label="订单状态">
        <el-select v-model="slectParams.checkStatus" placeholder="审核状态" :disabled="true">
          <el-option label="未审核" value="1"></el-option>
          <el-option label="已审核" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-select v-model="slectParams.payStatus" placeholder="支付状态" :disabled="true">
          <el-option label="未支付" value="1"></el-option>
          <el-option label="已支付" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-select v-model="slectParams.getStatus" placeholder="运送状态" :disabled="true">
          <el-option label="生产中" value="1"></el-option>
          <el-option label="待送货" value="2"></el-option>
          <el-option label="已送货" value="3"></el-option>
          <el-option label="待取货" value="4"></el-option>
        </el-select>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import Upload from '~packages/form/upload.vue';
  import { _Getpricelist,_addDingdanForm,_getDingdanInfo} from '../../util/ajax';
  export default {
    data() {
      return {
        multipleTable:[],//选中的值
        priceList:[],                               //价格列表
        priceParams:{ //传空拿送油的
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
        uploaderFilesObj: {//上传图片
          label: '上传图片',
          required: true,
          selectId: 'qiniu_uploader',
          dropId: 'qiniu_container',
          total: 9999999999,
          mimeTypes: [{title: 'Image files', extensions: 'jpg,jpeg,gif,png'}],
          multiSelection: false,
          files: [],
          showTip: false,
          tips: '请选择上传图片'
        },
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

        tableData1: [
//        {
//          priceConfigId:"0",               //价格设定ID
//          name:"",                          //名称
//          rawSizeType:"",                   //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
//          rawNumber:0,                     //原材料片数，单位：片
//          productLength:0,                //成品长，单位：mm
//          productWidth:0,                 //成品宽，单位：mm
//          productNumber:0,                //成品数量，单位片
//          remark:"备注",                     //备注
//          picture:[],                        //图片
//          price:0, 												 //价格
//        },
        ],

        tableData2:[
//        {
//          name:"",                  //名称
//          rawSizeType:"",                //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
//          rawNumber:"",                  //原材料片数，单位：片
//          remark:"",                   //备注
//          picture:[]                       //图片
//
//        },
        ],
        multipleSelection: [],
        slectParams:{                       //筛选信息
          checkStatus:'',                   //审核状态verifyStatusName
          payStatus:'',                     //支付状态 payStatusName
          getStatus:''                      //取货状态 goodsStatusName
        },
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
//            _this.tableData1 = data.data.processInfo;       //加工基本信息获取
//            _this.tableData2 = [];                          //加工基本信息获取,现在接口没有，给个空，有了再填上

            var dataList = data.data.processInfo;
//            _this.tableData1 = data.data.processInfo;       //加工基本信息获取
//            _this.tableData2 = [];                          //加工基本信息获取,现在接口没有，给个空，有了再填上

            for(let i = 0;i < dataList.length;i++){
              if(dataList[i].processType == 1 || dataList[i].processType == "1"){
                _this.tableData1.push(dataList[i]);
              }else if(dataList[i].processType == 2 || dataList[i].processType == "2"){
                _this.tableData2.push(dataList[i]);
              }
            }


            _this.slectParams.checkStatus = data.data.basicInfo.verifyStatusName;
            _this.slectParams.payStatus = data.data.basicInfo.payStatusName;
            _this.slectParams.getStatus = data.data.basicInfo.goodsStatusName;
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
      }
    },
    mounted (){
      this.getOederList();
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
        width: 100px;
        height: 100px;
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
          width: 100px;
          height: 100px;
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