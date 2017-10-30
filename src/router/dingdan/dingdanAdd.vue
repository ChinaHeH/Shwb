<template>
  <div>
    <el-form :inline="true" :model="params" class="demo-ruleForm" label-width="100px">
      <h3>订单基本信息</h3>

      <el-form-item label="联系人">
        <el-input v-model="params.basicInfo.contactName" placeholder="联系人"></el-input>
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="params.basicInfo.contactPhone" placeholder="联系电话"></el-input>
      </el-form-item>

      <el-form-item label="交货时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="截止交货日期" v-model="params.basicInfo.processDeadline" @change="dateChange"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item label="取货地址">
        <el-input v-model="params.basicInfo.getGoodsAddress" placeholder="取货地址"></el-input>
      </el-form-item>

      <el-form-item label="收货地址">
        <el-input v-model="params.basicInfo.receiveGoodsAddress" placeholder="收货地址"></el-input>
      </el-form-item>

      <el-form-item label="取货方式">
        <el-select v-model="params.basicInfo.getGoodsType" placeholder="取货方式">
          <el-option label="本方送货" value="1"></el-option>
          <el-option label="厂家取货" value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="送货方式">
        <el-select v-model="params.basicInfo.receiveGoodsType" placeholder="送货方式">
          <el-option label="本方自提" value="1"></el-option>
          <el-option label="厂家送货" value="2"></el-option>
        </el-select>
      </el-form-item>

      <div style="clear: both;"></div>

      <el-form-item label="留言">
        <el-input type="textarea" v-model="params.basicInfo.remark" placeholder="留言" style="width:100%"></el-input>
      </el-form-item>
    </el-form>

    <h3>加工信息-基本信息</h3>
    <el-button type="primary" @click="addBasicInfo()">添加基本信息</el-button>
    <!--<el-button type="primary" @click="removeArr">删除基本信息</el-button>-->
    <div style="margin-top: 20px;"></div>

    <el-table stripe ref="multipleTable" :data="tableData1"  @selection-change="handleSelectionChange"  tooltip-effect="dark" style="width:100%">
      <!--<el-table-column  type="selection" width="50"></el-table-column>-->
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-select v-model="scope.row.name" placeholder="单长边外倒45度" @change = "changePrice(priceList,scope.row.name,scope.$index)">
            <el-option v-for="item in priceList" :key="item.processName" :label="item.processName" :value="item.processName"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="材料规格／mm">
        <template slot-scope="scope">
          <el-select v-model="scope.row.rawSizeType" :disabled="true" placeholder="">
            <el-option label="600*600" value="1"></el-option>
            <el-option label="800*800" value="2"></el-option>
            <el-option label="600*900" value="3"></el-option>
            <el-option label="600*1200" value="4"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="材料数量／片">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品长度／mm">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productLength" placeholder="长度"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品宽度／mm">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productWidth" placeholder="宽度"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品数量／片">
        <template slot-scope="scope">
          <el-input type="number" @blur="productNumberCount" v-model="scope.row.productNumber" placeholder="成品数量"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="备注"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="报价/元">
        <template slot-scope="scope">
          <el-select v-model="scope.row.price" placeholder="报价" :disabled="true">
            <el-option v-for="item in priceList" :key="item.id" :label="item.price" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="加工示意图" width="200">
        <template slot-scope="scope">
	        	<uc-upload :uploaderFilesObj="uploaderFilesObj" ref="uploadfile"></uc-upload>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="delTab1(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
		<p class="count">合计：￥{{count}} 元</p>


    <h3>加工信息-自定义信息</h3>
    <el-button type="primary" @click="addZidingyiTable()">添加自定义信息</el-button>
    <!--<el-button type="primary">删除自定义信息</el-button>-->
    <div style="margin-top: 20px;"></div>

    <el-table ref="multipleTable" stripe :data="tableData2" tooltip-effect="dark">
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <el-table-column label="型号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入型号"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="材料规格／mm">
        <template slot-scope="scope">
          <el-select v-model="scope.row.rawSizeType" placeholder="请选择材料规格">
            <el-option label="600*600" value="1"></el-option>
            <el-option label="800*800" value="2"></el-option>
            <el-option label="600*900" value="3"></el-option>
            <el-option label="600*1200" value="4"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="材料数量／片">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="备注"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="加工示意图">
       <template slot-scope="scope">
	        	<uc-upload :uploaderFilesObj="aaa" ref="uploadfile"></uc-upload>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="delTab2(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="submit()">确认</el-button>
    <el-button type="primary" @click="cancel()">取消</el-button>
  </div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import Upload from '~packages/form/upload.vue';
  import { _Getpricelist,_addDingdanForm} from '../../util/ajax';
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
		          mimeTypes: [{title: 'Image files', extensions: 'jpg, jpeg, gif, png'}],
		          multiSelection: false,
		          files: [],
		          showTip: false,
		          tips: '请选择上传图片'
        },
        aaa: {//上传图片
		          label: '上传图片',
		          required: true,
		          selectId: 'qiniu_uploader',
          		dropId: 'qiniu_container',
		          total: 9999999999,
		          mimeTypes: [{title: 'Image files', extensions: 'jpg, jpeg, gif, png'}],
		          multiSelection: false,
		          files: [],
		          showTip: false,
		          tips: '请选择上传图片'
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
           processDeadline:"",                      //交货时间
           remark:""                                 //备注
          },
          routineInfo:'',               //表格1里边的数据
          customInfo:'',                //表格2里边的数据
        },
        //表格数据

        tableData1: [
          {
            priceConfigId:"0",               //价格设定ID
            name:"",                          //名称
            rawSizeType:"",                   //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
            rawNumber:"0",                    //原材料片数，单位：片
            productLength:"0",                //成品长，单位：mm
            productWidth:"0",                 //成品宽，单位：mm
            productNumber:"0",                //成品数量，单位片
            remark:"备注",                     //备注
            picture:[],                        //图片
            price:0, 												 //价格
          },
         ],

        tableData2:[
          {
            name:"直线切割",                  //名称
            rawSizeType:"2",                //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
            rawNumber:"4",                  //原材料片数，单位：片
            remark:"备注",                   //备注
            picture:[]                       //图片

          },
        ],
        multipleSelection: []
      }
    },
    components: {
      UcUpload: Upload
    },
    methods: {
    	handleSelectionChange(val) {//获取选择
    		console.log(this.uploaderFilesObj.files);
    		this.multipleSelection = val;
    		if(val.length!=0){
    			for(var i = 0;i<this.multipleSelection.length;i++){
    			this.count+=this.multipleSelection[i].price*this.multipleSelection[i].productNumber;
    		}
    		}
    		console.log(this.multipleSelection);
      },
      productNumberCount(){ //数量失去交点计算合计价格
      	for(var i = 0;i<this.multipleSelection.length;i++){
    			this.count+=this.multipleSelection[i].price*this.multipleSelection[i].productNumber;
    		}
      },
      removeArr(){//删除元素
      	this.tableData1=this.multipleSelection;
      	console.log(this.tableData1);
      	console.log(this.multipleSelection);
      },
      submitFun(params) {
        var _this = this;
        _addDingdanForm(params).then(function (response) {
          console.log(response);
          var data = response.data;

          if (data.status) {
            location.href = location.origin + '/#/orderList';
          }else {
            CONSTANT.methods.tips(data.error_msg || '添加订单失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '添加订单异常!', '提示');
        });
      },
      cancel(){
        location.href = location.origin + '/#/orderList';
      },
      submit(){
      	for(var i=0;i<this.tableData1.length;i++){
      		delete this.tableData1[i].price;
      	}
          this.params.routineInfo = this.tableData1;
          this.params.customInfo = this.tableData2;
          console.log(this.params);
          this.submitFun(this.params);
      },
      //选中name的时候price也跟着改变
      changePrice(arr,val,index){
          var _this = this;
          var arrList = arr;
          var value = val;
          var index = index;
          console.log(arrList)
          for(let i = 0;i < arrList.length;i++){
             if(arrList[i].processName == value){
                console.log(arrList[i].id);
               _this.tableData1[index].priceConfigId = arrList[i].id;
               _this.tableData1[index].price = arrList[i].price;
               _this.tableData1[index].rawSizeType = arrList[i].sizeType;
               console.log(_this.tableData1[index].priceConfigId);
               console.log(_this.tableData1[index]);

               //循环计总价
               _this.count = 0;
               for(let j = 0;j < _this.tableData1.length;j++){
                 _this.count = _this.count + parseFloat(_this.tableData1[j].price);
               }
             }
          }
      },
      //获取price列表
      getPriceList(priceParams){
        var _this = this;
        _Getpricelist(priceParams).then(function (response) {
          console.log(response);
          var data = response.data;

          if (data.status) {
            _this.priceList = data.data.list;         //价格列表
          }else {
            CONSTANT.methods.tips(data.error_msg || '获取价格失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取价格异常!', '提示');
        });
      },

      //添加图片
      addPic(index,data){

      },

      //添加table1
      addBasicInfo(){
          this.tableData1.push(
            {
              priceConfigId:"0",                 //价格设定ID
              name:"",                          //名称
              rawSizeType:"2",                   //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
              rawNumber:"0",                    //原材料片数，单位：片
              productLength:"0",                //成品长，单位：mm
              productWidth:"0",                 //成品宽，单位：mm
              productNumber:"0",                //成品数量，单位片
              remark:"备注",                     //备注
              picture:[],                        //图片
              price:0, 												 //价格
            }
          )
      },

      //添加table2
      addZidingyiTable(){
        this.tableData2.push(
          {
            name:"直线切割",                  //名称
            rawSizeType:"2",                //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
            rawNumber:"4",                  //原材料片数，单位：片
            remark:"备注",                   //备注
            picture:[]                       //图片

          },
        )
      },

      //删除table1
      delTab1(index){
        console.log(index);
        this.tableData1.splice(index,1)
      },

      //删除table2
      delTab2(index){
        console.log(index);
        this.tableData2.splice(index,1)
      },

      //格式化日期
      dateChange(val) {
        this.params.basicInfo.processDeadline = val;
      }
    },
    mounted (){
        this.getPriceList(this.priceParams);
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