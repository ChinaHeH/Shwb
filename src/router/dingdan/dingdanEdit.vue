<template>
  <div>
  	<input :id="uploaderFiles.selectId" type="hidden" />
    <h3>加工信息-基本信息</h3>
    <el-button type="primary" @click="addBasicInfo()">添加基本信息</el-button>
    <!--<el-button type="primary" @click="removeArr">删除基本信息</el-button>-->
    <div style="margin-top: 20px;"></div>

    <el-table stripe ref="multipleTable" :data="tableData1"  tooltip-effect="dark" :fit="true" style="width:100%">
      <!--<el-table-column  type="selection" width="50"></el-table-column>-->
      <el-table-column label="型号" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入型号"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="材料规格／mm" width="300">
        <template slot-scope="scope">
          <el-select v-model="scope.row.typeName" placeholder="选择名称" @change = "changePrice(priceList,scope.row.delname,scope.$index)">
            <el-option v-for="item in priceList" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="材料数量／片" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量" @change="totleEMB()"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="成品长度／mm" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productLength" placeholder="长度"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="成品宽度／mm" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productWidth" placeholder="宽度"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="成品数量／片" width="150">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.productNumber" placeholder="成品数量"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="备注"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="加工示意图" width="200">
        <template slot-scope="scope">
        	<div class='uc-upload'>
					    <div :id="uploaderFiles.dropId" :class="uploaderFiles.showTip ? 'error' : ''">
					      <span @click="uploade(1,scope.$index)">选择文件</span>
					    </div>
					    <span v-show="uploaderFiles.showTip">{{uploaderFiles.tips}}</span>
					    <section>
					      <div v-for="(item, index) in scope.row.picture">
					        <i class="fa fa-times" aria-hidden="true" @click="removeFile(1,scope.$index,index)"></i>
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

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="danger" :disabled="scope.$index==0"   @click="delTab1(scope.$index)">删除</el-button>
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
      <el-table-column label="材料规格／mm" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.typeName" placeholder="材料规格">
            <el-option v-for="item in priceList" :key="item.name" :label="item.name" :value="item.name"></el-option>
            <!--<el-option  :key="1" :label="'600*600'" :value="1"></el-option>-->
            <!--<el-option  :key="2" :label="'800*800'" :value="2"></el-option>-->
            <!--<el-option  :key="3" :label="'600*900'" :value="3"></el-option>-->
            <!--<el-option  :key="4" :label="'600*1200'" :value="4"></el-option>-->
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="材料数量／片" width="200">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.rawNumber" placeholder="材料数量"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="备注"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="加工示意图" width="200">
        <template slot-scope="scope">
        <div class='uc-upload'>
					    <div :id="uploaderFiles.dropId" :class="uploaderFiles.showTip ? 'error' : ''">
					      <span @click="uploade(2,scope.$index)">选择文件</span>
					    </div>
					    <span v-show="uploaderFiles.showTip">{{uploaderFiles.tips}}</span>
					    <section>
					      <div v-for="(item, index) in scope.row.picture">
					        <i class="fa fa-times" aria-hidden="true" @click="removeFile(2,scope.$index,index)"></i>
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

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" :disabled="scope.$index==0" @click="delTab2(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="submit()">确认</el-button>
    <el-button type="primary" @click="cancel()">返回</el-button>
  </div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import Upload from '~packages/form/upload.vue';
  import { _getQiniuUptoken,_Getpricelist,_addDingdanForm,_getDingdanInfo,_getdingdanStatus,_UpdataBasicInfo,_UpdataListInfo} from '../../util/ajax';
  export default {
    data() {
      return {
        priceList:[],               //价格列表
        priceNoRepeatList:[],                               //价格列表
        priceStatusList:[],
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
         uploader: {},
        uptoken: '',
        scale: {
          show: false,
          src: require('../../images/default.png')
        },
        uploaderFiles: {//上传图片
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
        count:0,//合计
        type:0,//区分是基本 还是特殊 加工需求
        num:0,//插入表的 索引
        //提交订单的时候传给后台的参数
        params: {
          basicInfo:{
            orderId:0,                               //订单id
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
      }
    },
    components: {
      UcUpload: Upload
    },
    methods: {
    	uploade(type,num){
    		this.type=type;
    		this.num=num;
    		document.getElementById(this.uploaderFiles.selectId).click();
    	},
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
              var dataList = data.data.processInfo;

            for(let i = 0;i < dataList.length;i++){
              if(dataList[i].processType == 1 || dataList[i].processType == "1"){
                _this.tableData1.push(dataList[i]);
              }else if(dataList[i].processType == 2 || dataList[i].processType == "2"){
                _this.tableData2.push(dataList[i]);
              }
            }

            for(var j = 0; j < _this.tableData1.length;j++){
              _this.tableData1[j].delname = _this.tableData1[j].rawSizeTypeName;
            }
            if(_this.tableData2.length == 0){
                _this.tableData2.push({
                  name:"",
                  rawSizeType:"",
                  rawNumber:"",
                  remark:"",
                  picture:[]
                })
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

      //返回
      cancel(){
        location.href = location.origin + '/#/orderList';
      },

      submit(){
        this.updataListInfo();
      },

      //改变数量的时候价格改变
      totleEMB(){
        this.count = 0;
        for(let i = 0;i < this.tableData1.length;i++){
          this.count = this.count+parseFloat(this.tableData1[i].rawNumber)*parseFloat(this.tableData1[i].price);
        }

      },

      //选中name的时候price也跟着改变
      //选中name的时候price也跟着改变
      changePrice(arr,val,index){
        var _this = this;
        var arrList = arr;
        var value = val;
        var index = index;

        console.log(arrList);
        console.log(value);
        for(let i = 0;i < arrList.length;i++){
          if(arrList[i].name == value){
            _this.tableData1[index].priceConfigId = arrList[i].id;
            _this.tableData1[index].price = arrList[i].price;
            _this.tableData1[index].rawSizeType = arrList[i].sizeType;

            //循环计总价
            _this.count = 0;
            for(let j = 0;j < _this.tableData1.length;j++){
              _this.count = _this.count + parseFloat(_this.tableData1[j].rawNumber) * parseFloat(_this.tableData1[j].price);
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

            for(let i = 0;i < _this.priceList.length;i++){
              _this.priceStatusList.push(parseInt(_this.priceList[i].sizeType))
            }
            console.log(_this.priceStatusList);


            var tmp = {};

            for (let k = 0, j = _this.priceStatusList.length; k < j; k++) {
              if (!tmp[_this.priceStatusList[k]]) {
                tmp[_this.priceStatusList[k]] = 1;
                _this.priceNoRepeatList.push(_this.priceList[k]);
              }
            }

            console.log(_this.priceNoRepeatList)
          }else {
            CONSTANT.methods.tips(data.error_msg || '获取价格失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取价格异常!', '提示');
        });
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
            name:"名称",                  //名称
            rawSizeType:"2",                //原材料规格:1=600*600、2=800*800、3=600*900、4=600*1200
            rawNumber:"4",                  //原材料片数，单位：片
            remark:"备注",                   //备注
            picture:[],                       //图片
            priceConfigId:''

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


      //提交表单中的加工信息，定义了一个方法
      updataListInfo(){
        var _this = this;
        var tableList1 = [];
        var tableList2 = [];
        if(_this.tableData1.length){
          for(let i = 0; i < _this.tableData1.length;i++){
            for(let j = 0; j < _this.priceList.length;j++){
                if(_this.tableData1[i].typeName ==  _this.priceList[j].name){
                  _this.tableData1[i].rawSizeType = _this.priceList[j].sizeType
                }
            }
          }
          for(let i = 0; i < _this.tableData1.length;i++){
            tableList1.push({
                priceConfigId:_this.tableData1[i].priceConfigId,
                name:_this.tableData1[i].name,
                rawSizeType:_this.tableData1[i].rawSizeType,
                rawNumber:_this.tableData1[i].rawNumber,
                productLength:_this.tableData1[i].productLength,
                productWidth:_this.tableData1[i].productWidth,
                productNumber:_this.tableData1[i].productNumber,
                remark:_this.tableData1[i].remark,
                picture:_this.tableData1[i].picture || []
            })
          }
        }

        if(_this.tableData2.length){
          for(let i = 0; i < _this.tableData2.length;i++){
            for(let j = 0; j < _this.priceList.length;j++){
              if(_this.tableData2[i].typeName ==  _this.priceList[j].name){
                _this.tableData1[i].rawSizeType = _this.priceList[j].sizeType;
                _this.tableData1[i].priceConfigId = _this.priceList[j].id;
              }
            }
          }
          for(let i = 0; i < _this.tableData2.length;i++){
            tableList2.push({
              name:_this.tableData2[i].name,
              rawSizeType:_this.tableData2[i].rawSizeType,
              rawNumber:_this.tableData2[i].rawNumber,
              remark:_this.tableData2[i].remark,
              picture:_this.tableData2[i].picture || [],
              priceConfigId:_this.tableData2[i].priceConfigId
            })
          }
        }

        if(tableList2.length == 0||(tableList2.length == 1 && (tableList2[0].name == "" &&　tableList2[0].rawSizeType == "" &&　tableList2[0].rawNumber == ""))){
          tableList2 = [];
        }
        var ListParams = {
          orderId:parseInt(_this.$route.params.id),                               //订单id
          routineInfo:tableList1,
          customInfo:tableList2
        };

        console.log(ListParams);
        _UpdataListInfo(ListParams).then(function (response) {
          console.log(response);
          var data = response.data;               //拿到返回数据

          if (data.status) {
            console.log("提交订单成功");
            location.href = location.origin + '/#/orderList';
          }else {
            if(data.error_code == 201){
              CONSTANT.methods.tips("自定义信息材料规格或数量不完整，请补充", '提示');
            }else if(data.error_code == 101){
              if(data.error_msg == "priceConfigId 为空"){
                CONSTANT.methods.tips("材料规格信息不完整，请填写", '提示');
              }else if(data.error_msg == "name 为空"){
                CONSTANT.methods.tips("型号信息不完整，请填写", '提示');
              }else if(data.error_msg == "rawNumber 为空"){
                CONSTANT.methods.tips("材料数量信息不完整，请填写", '提示');
              }else if(data.error_msg == "productLength 为空"){
                CONSTANT.methods.tips("成品长度信息不完整，请填写", '提示');
              }else if(data.error_msg == "productWidth 为空"){
                CONSTANT.methods.tips("成品宽度信息不完整，请填写", '提示');
              }else if(data.error_msg == "productNumber 为空"){
                CONSTANT.methods.tips("成品数量信息不完整，请填写", '提示');
              }


            }else {
              CONSTANT.methods.tips(data.error_msg || '编辑订单失败!', '提示');
            }
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(''+ res || '编辑订单异常!', '提示');
        });
      },
			initQiniu () {
        var _this = this;

        _this.uploader = window.Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: _this.uploaderFiles.selectId,
          container: _this.uploaderFiles.dropId,
          drop_element: _this.uploaderFiles.dropId,
          max_file_size: '100mb',
          flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
          dragdrop: true,
          chunk_size: '4mb',
          multi_selection: _this.uploaderFiles.multiSelection,
          uptoken: _this.uptoken,
          domain: 'ouvvk5b6m.bkt.clouddn.com',
          get_new_uptoken: false,
          auto_start: true,
          log_level: 5,
          filters: {
            prevent_duplicates: false,
            // Specify what files to browse for
            mime_types: _this.uploaderFiles.mimeTypes || []
          },
          init: {
            'BeforeChunkUpload': function (up, file) {
              console.log(1);
            },
            'FilesAdded': function (up, files) {
              /*
              * 当文件数量超出的时候清空uploader.files;并提示
              * */
            	 _this.uploaderFiles.files=[];
              var arr = new Array(..._this.uploaderFiles.files);


              files.forEach(function (element) {
                if (arr.indexOf(element.id) === -1) {
                  arr.push(element);
                }
              });
              if (arr.length > _this.uploaderFiles.total) {
                _this.uploaderFiles.showTip = true;
                _this.uploaderFiles.tips = '上传的文件数量不得超过' + _this.uploaderFiles.total;
                up.files.splice(_this.uploaderFiles.total);
                return;
              }
              _this.uploaderFiles.showTip = false;


              /*
              * 生成预览图
              * */
              files.forEach(function (element) {
                if (_this.uploaderFiles.files.indexOf(element.id) === -1) {
                  _this.$set(element, 'style', 'height: 100%');
                  _this.$set(element, 'url', require('../../images/default.png'));
                  _this.uploaderFiles.files.push(element);
                }
              });
            },
            'BeforeUpload': function (up, file) {
              console.log(1);
            },
            'UploadProgress': function (up, file) {
              for (let item of _this.uploaderFiles.files) {
                if (item.id === file.id) {
                  item.style = 'height:' + (100 - file.percent) + '%';
                }
              }
            },
            'UploadComplete': function () {
              console.log(1);
            },
            'FileUploaded': function (up, file, info) {
              let domain = up.getOption('domain');
              let res = JSON.parse(info);
              let url = 'http://' + domain + '/' + res.key;
              let localLink = url + '?imageView2/1/w/100/h/100';

              // 上传类型如果的图片就更换已经上传好的图片
              for (let item of _this.uploaderFiles.files) {
                if (item.id === file.id) {
                  item.url = localLink;
                  if(_this.type==1){
                  	_this.tableData1[_this.num].picture.push(_this.uploaderFiles.files[0].url);
                  }else{
                  	_this.tableData2[_this.num].picture.push(_this.uploaderFiles.files[0].url);
                  }

                }
              }
              console.log(_this.uploaderFiles.files[0].url);

            },
            'Error': function (up, err, errTip) {

              up.removeFile(err.file.id);
            }
          }
        });

      },
      getUptoken () {
        var _this = this;

        _getQiniuUptoken().then(function (res) {
          var data = res.data;

          if (data.status) {
            _this.uptoken = data.data.qiniuToken;
          }
        });
      },
      removeFile (type,num,index) {
//    	alert(type);
//    	alert(num);
//    	alert(index);
      	if(type==1){
      		//删除基本加工信息
      		this.tableData1[num].picture.splice(index, 1)
      	}else{
      		//删除特殊加工信息
      		this.tableData2[num].picture.splice(index, 1)
      	}
//      if (fileId) {
//        this.uploader.removeFile(fileId);
//      }
//      this.uploaderFiles.files.splice(index, 1);
//      this.uploaderFiles.showTip = false;
      },
      scaleImg (type, src) {
        if (type === '1') {
          this.scale.show = false;
        } else {
          this.scale.show = true;
          this.scale.src = src.split('?imageView2')[0];
        }
      },


    },
    mounted (){
    	this.getUptoken();
      this.getPriceList(this.priceParams);             //获取订单价格列表
      this.getOederList();                             //获取订单列表

    },
    watch: {
      'uptoken' (newVal) {
        if (newVal) {
          this.initQiniu();
        }
      },
      'uploaderFilesObj': {
        handler: function (newVal) {
          if (newVal) {
            this.uploaderFiles = newVal;
          }
        },
        deep: true
      }
    }
  }
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
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