<template>
	<div>
		<div class="header">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="客户">
					<el-select @change="getOrderList" v-model="formInline.customerName" placeholder="请选择客户名称">
						<el-option v-for="item in customerList" :label="item.customerName" :value="item.customerName"></el-option>
					</el-select>
				</el-form-item>
				<br />
				<el-form-item label="合计">
					<span class="count">{{formInline.count}}</span>元
				</el-form-item>
				<el-form-item prop="rebateType">
					<el-radio-group @change="radioChange" v-model="addParams.rebateType">
						<el-radio label="1">按比率折扣
							<el-input @blur="blurrebatePercent" type="number" style="width:100px" v-model="addParams.rebatePercent" placeholder="折扣比例"></el-input> %
						</el-radio>
						<el-radio label="2">按金额折扣
							<el-input @blur="blurrebateSum" type="number" style="width:100px" v-model="addParams.rebateSum" placeholder="折扣比例"></el-input> 元
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="结算金额">
					<span class="count">{{formInline.countAll}}</span>元
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="balance">生成结算单</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="body">
			<el-table :data="tData" stripe style="width: 100%">
				<el-table-column type="index" label="标记" width="70">
					<template slot-scope="scope">
					  <!-- `checked` 为 true 或 false -->
					  <el-checkbox @change="checkboxCount(scope.row.check,scope.row.orderSum,scope.row.id)" v-model="scope.row.check"></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column prop="orderNo" label="订单编号" width="150">
				</el-table-column>
				<el-table-column prop="customerName" label="客户名称" width="100">
				</el-table-column>
				<el-table-column prop="contactName" label="联系人" width="100">
				</el-table-column>
				<el-table-column prop="contactPhone" label="联系电话" width="150">
				</el-table-column>
				<el-table-column prop="createTime" label="下单时间" width="180">
				</el-table-column>
				<el-table-column prop="processDeadline" label="交货时间" width="120">
				</el-table-column>
				<el-table-column label="订单状态" width="95">
					<template slot-scope="scope">
						{{scope.row.verifyStatusName}},
						{{scope.row.payStatusName}},
						{{scope.row.goodsStatusName}}
					</template>
				</el-table-column>
				<el-table-column label="订单金额" width="100">
					<template slot-scope="scope">
						￥{{scope.row.orderSum}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button size="small" type="primary" @click="detail(scope.row.id)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="uc-pagination" v-if="pagination.show" :page-size="pagination.size" @current-change="pagination.click" :current-page="pagination.currentPage" layout="total, prev, pager, next" :total="pagination.total"></el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		CONSTANT
	} from '../../util/constant';
	import { _GetDingdanList,_getCustomerList,_Addbalance } from '../../util/ajax';
	import {
		Select,
		Button,
		Input,
		TableColumn,
		Pagination,
		Form,
		FormItem,
		Radio,
		Option,
		Table 
	} from 'element-ui';

	export default {
		data() {
			return {
				params: {
					page_now: 1,
					limit: 10,
					sort_by: "",
					sort_type: "desc",
					search_by: {
						customerName: '', //客户名称
						verifyStatus: 2, //审核状态:1=未审核、2=已审核、3=已退回
						payStatus: 1, //支付状态:1=未结算、2=已结算
						goodsStatus: '', //货物状态:1=待取货、2=生产中、3=待送货、4=已签收
						orderStartTime: '', //下单开始时间
						orderEndTime: '', //下单结束时间
						deliveryStartTime: '', //交货开始时间
						deliveryEndTime: '', //交货结束时间
					},
				},
				customerList: [], //客户名称列表
				tData: [ //订单列表
//					{
//						"id": "2", //订单id
//						"customerId": "1", //客户id
//						"contactName": "三星", //联系人
//						"contactPhone": "18501010101", //联系电话
//						"getGoodsType": "2", //取货方式：1=本方送货、2=厂家取货
//						"getGoodsAddress": "上海市徐汇区桂平路680号", //取货地址
//						"receiveGoodsType": "2", //送货方式：1=本方自提、2=厂家送货
//						"receiveGoodsAddress": "上海市徐汇区桂平路680号", //送货地址
//						"processDeadline": "2017-12-31", //交货地址
//						"remark": "取货湖区", //备注
//						"verifyStatus": "1", //审核状态
//						"payStatus": "1", //支付状态
//						"goodsStatus": "1", //货物状态
//						"orderSum": "43.60", //订单金额
//						"orderNo": "D20171019002", //订单编号
//						"createTime": "2017-10-19 18:51:29", //下单时间
//						"customerName": "星巴克",
//						"getGoodsTypeName": "厂家取货",
//						"receiveGoodsTypeName": "厂家送货",
//						"verifyStatusName": "未审核",
//						"payStatusName": "未结算",
//						"goodsStatusName": "待取货",
//						check:false //添加checkbox样式
//					},
//					{
//						"id": "2", //订单id
//						"customerId": "1", //客户id
//						"contactName": "三星", //联系人
//						"contactPhone": "18501010101", //联系电话
//						"getGoodsType": "2", //取货方式：1=本方送货、2=厂家取货
//						"getGoodsAddress": "上海市徐汇区桂平路680号", //取货地址
//						"receiveGoodsType": "2", //送货方式：1=本方自提、2=厂家送货
//						"receiveGoodsAddress": "上海市徐汇区桂平路680号", //送货地址
//						"processDeadline": "2017-12-31", //交货地址
//						"remark": "取货湖区", //备注
//						"verifyStatus": "1", //审核状态
//						"payStatus": "1", //支付状态
//						"goodsStatus": "1", //货物状态
//						"orderSum": "43.60", //订单金额
//						"orderNo": "D20171019002", //订单编号
//						"createTime": "2017-10-19 18:51:29", //下单时间
//						"customerName": "星巴克",
//						"getGoodsTypeName": "厂家取货",
//						"receiveGoodsTypeName": "厂家送货",
//						"verifyStatusName": "未审核",
//						"payStatusName": "未结算",
//						"goodsStatusName": "待取货",
//						check:false //添加checkbox样式
//					}

				],
				formInline: {
					customerName: '', //客户名称
					count: 0, //合计没有折扣
					rebateType: '', //折扣类型：1=折扣比例、2=折扣金额
					rebatePercent: 0, //折扣比例
					rebateSum: 0, //折扣金额
					countAll: 0, //结算折后金额
				},
				pagination: {
					show: true,
					total: 0,
					currentPage: 1,
					size: 10,
					click: page => {
						this.getDingdanList(this.params);
					}
				},
				addParams:{ //生成结算提交参数
			        rebateType:"",      //折扣类型：1=折扣比例、2=折扣金额
			        rebatePercent:"",   //折扣比例
			        rebateSum:"",      //折扣金额
			        customerId:"",      //客户id
			        orderInfo:[
//			          {
//			            orderId:2    //订单id
//			          },{
//			            orderId:4
//			          }
			        ]
			    }

			}
		},
		components: {
			ElSelect: Select,
			ElTable: Table,
			ElTableColumn: TableColumn,
			ElPagination: Pagination,
			ElInput: Input,
			ElForm: Form,
			ElFormItem: FormItem,
			ElOption: Option,
			ElRadio: Radio,
			ElButton: Button,
		},
		methods: {
			detail(id){//订单查看
				location.href = location.origin + '/#/orderCheck/' + id;
			},
			formInlineInit(){//初始化合计折扣数据
				this.formInline.count=0;
				this.formInline.rebateType="";
				this.formInline.rebatePercent=0;
				this.formInline.rebateSum=0;
				this.formInline.countAll=0;
				this.tData=[];
			},
			getOrderList(){//选择客户，去拿客户对应的oder
				console.log(this.formInline.customerName);
				this.formInlineInit();
				for(var i =0;i<this.customerList.length;i++){ //获取用户id
					if(this.formInline.customerName==this.customerList[i].customerName){
						this.addParams.customerId = this.customerList[i].id;
					}
				}
				this.params.search_by.customerName= this.formInline.customerName;
				this.getDingdanList(this.params);
			},
			checkboxCount(isChekd,num,id){ //checkbox 计算金额
				if(isChekd){
					this.formInline.count+=Number(num);
					//勾选就添加id
					this.addParams.orderInfo.push({
						orderId:id
					})
				}else{
					this.formInline.count-=Number(num);
					//取消就移除id
					for (var i =0;i<this.addParams.orderInfo.length;i++) {
						if(this.addParams.orderInfo[i].orderId==id){
							this.addParams.orderInfo.splice(i, 1)
						}
					}
					
				}
				console.log(this.addParams);
				if(this.addParams.rebateType){
					if(this.addParams.rebateType=="1"){
						if(this.addParams.rebatePercent!=0){
							this.formInline.countAll=this.formInline.count-(this.formInline.count*this.addParams.rebatePercent/100);
						}else{
							this.formInline.countAll=this.formInline.count;
						}
					}else{
						this.formInline.countAll=this.formInline.count-this.addParams.rebateSum;
					}
				}else{
					this.formInline.countAll=this.formInline.count;
				}
			},
			radioChange(){ //radio 
				if(this.addParams.rebateType){
					if(this.addParams.rebateType=="1"){
						if(this.addParams.rebatePercent!=0){
							this.formInline.countAll=this.formInline.count-(this.formInline.count*this.addParams.rebatePercent/100);
						}else{
							this.formInline.countAll=this.formInline.count;
						}
					}else{
						this.formInline.countAll=this.formInline.count-this.addParams.rebateSum;
					}
				}else{
					this.formInline.countAll=this.formInline.count;
				}
			},
			blurrebatePercent(){ //blurrebatePercent 折扣百分比
				if(this.addParams.rebateType==1){
					this.formInline.countAll=parseFloat(this.formInline.count-(this.formInline.count*this.addParams.rebatePercent/100));
				}
			},
			blurrebateSum(){ //折扣计算
				if(this.addParams.rebateType==2){
					this.formInline.countAll=parseFloat(this.formInline.count)-parseFloat(this.addParams.rebateSum||0);
				}
			},
			balance() { //生成结算单
				this.Addbalance(this.addParams);
			},
			getCustomerList(params) { //获取客户名称列表
				var _this = this;
				_getCustomerList(params).then(function(response) {
					var data = response.data;
					if(data.status) {
						console.log(data);
						_this.customerList = data.data.list;
					} else {
						CONSTANT.methods.tips(data.error_msg || '获取客户名称失败!', '提示');
					}
				}).catch(function(res) {
					CONSTANT.methods.tips(res || '获取客户名称失败!', '提示');
				});
			},
			Addbalance(addParams){ //生成结算单
				var _this = this;
				_Addbalance(addParams).then(function(response) {
					var data = response.data;
					if(data.status) {
						CONSTANT.methods.tips('生成结算单成功!', '确定', function() {
							location.href = location.origin + '/#/accountsDetial';
						});
					} else {
						CONSTANT.methods.tips(data.error_msg || '生成结算单失败!', '提示');
					}
				}).catch(function(res) {
					CONSTANT.methods.tips(res || '生成结算单失败!', '提示');
				});
			},
			getDingdanList(params) {
				var _this = this;
				_GetDingdanList(params).then(function(response) {
					console.log(response);
					var data = response.data;
					if(data.status) {
						_this.tData = data.data.list;
						_this.pagination.total = data.data.total_num;
					} else {
						CONSTANT.methods.tips(data.error_msg || '获取订单一览失败!', '提示');
					}
				}).catch(function(res) {
					CONSTANT.methods.tips(res || '获取订单一览异常!', '提示');
				});

			},
			goAdd() {
				location.href = location.origin + '/#/customeradd';
			}
		},
		mounted() {
			this.getCustomerList({ //获取客户列表不做任何限制
				page_now: "",
				limit: "",
				search_by: { //搜索条件
					status: "", //状态:1=启用、2=禁用
					customerName: "", //客户名（模糊）
					address: "" //地址（模糊）
				}

			});
//			this.getDingdanList(this.params);
		},
		filters: {

		}

	};
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
<style lang="scss" scoped>
	.count {
		margin-right: 20px;
		display: inline-block;
	}
	
	.body {
		margin-top: 20px;
	}
	
	.uc-slider-list {
		>button {
			margin-bottom: 10px;
		}
	}
	
	.uc-table {
		background-color: white;
	}
	
	.uc-pagination {
		text-align: center;
		margin: 30px 0;
	}
	
	.uc-table-thumbnails {
		width: 40px;
		height: 40px;
		padding: 5px 0;
		flex-direction: column;
		display: flex;
	}
	
	.uc-table-scale>footer {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 100;
	}
	
	.uc-table-scale>footer>div {
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
	
	.uc-table-scale>footer>img {
		z-index: 121;
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: 0 0;
		max-width: 90%;
		max-height: 90%;
		transform: translateX(-50%) translateY(-50%);
	}
</style>