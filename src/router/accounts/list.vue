<template>
	<div>
		<!--<div class="header">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="客户名称">
			    <el-select @change="getOrderList" v-model="formInline.customerName" placeholder="请选择客户名称">
			      <el-option v-for="item in customerList" :label="item.customerName" :value="item.customerName"></el-option>
			    </el-select>
			  </el-form-item>
			 <el-form-item>
			    <el-button type="primary" @click="check">检索</el-button>
			  </el-form-item>
			</el-form>
		</div>-->
		<div class="body">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="customerName" label="客户名称" width="180">
				</el-table-column>
				<el-table-column prop="orderSum" label="订单金额" width="180">
					<template slot-scope="scope">
						￥{{scope.row.orderSum}}
					</template>
				</el-table-column>
				<el-table-column label="折扣" width="180">
					<template slot-scope="scope">
						<sapn v-if="scope.row.rebateType==1">{{scope.row.rebatePercent}}</sapn>
						<span v-if="scope.row.rebateType==2">￥{{scope.row.rebateSum}}</span>
					</template>
				</el-table-column>
				<el-table-column label="结算金额" width="180">
					<template slot-scope="scope">
						￥{{scope.row.balanceSum}}
					</template>
				</el-table-column>
				<el-table-column prop="balanceStatusName" label="状态" width="180">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button v-if="scope.row.status==2" type="primary" @click="donwLoad(scope.row.id)">下载</el-button>
						<el-button type="primary" v-if="scope.row.status==1" @click="save(scope.row.id)">完成</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="uc-pagination" v-if="pagination.show" @current-change="pagination.click" :page-size="pagination.size"  :current-page="pagination.currentPage" layout="total, prev, pager, next" :total="pagination.total"></el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		CONSTANT
	} from '../../util/constant';
	import {
		_getCustomerList,
		_Getbalancelist,
		_Finishbalance,
		_Downloadbalance
	} from '../../util/ajax';
	import {
		Select,
		Button,
		Table,
		Input,
		TableColumn,
		Pagination,
		Form,
		FormItem,
		Option
	} from 'element-ui';

	export default {
		data() {
				return {
					value: "",
					//					cData: cData,
					tableData: [],//结算一览数据
					customerList:[],//客户名称列表
					formInline: {
			          customerName: '',
			       },
					pagination: {
						show: true,
						total: 0,
						currentPage: 1,
						size:10,
						click: page => {
							this.Getbalancelist({
								page_now: page,
								limit: 10,
								value:this.value
							});
						}
					},
					params:{
				        page_now:1,
				        limit:10,
				        sort_by:"",
				        sort_type:"desc",
				        search_by:{
				            customerName:"",
				        }
				
				    }

				}
			},
			components: {
				ElSelect: Select,
				ElButton: Button,
				ElTable: Table,
				ElTableColumn: TableColumn,
				ElPagination: Pagination,
				ElInput : Input,
				ElForm:Form,
				ElFormItem :FormItem,
				ElOption:Option
			},
			methods: {
				getOrderList(){//选择客户，去拿客户结算一览
//					this.params.search_by.customerName= this.formInline.customerName;
					this.Getbalancelist(this.params);
				},
				check() { //检索
					this.Getbalancelist({
						page_now: 1,
						limit: 10,
						search_by:{
				            customerName:this.formInline.customerName
				        }
					});
				},
				donwLoad(id) { //下载
					this.Downloadbalance({id:id});
				},
				save(id) { //保存
					this.Finishbalance({id:id});
				},
				Downloadbalance(params){//下载pdf
					var _this = this;
					_Downloadbalance(params).then(function(response) {
						console.log(response);
						var content = response.data;

						var data = new Blob([content],{type:"application/pdf"});
						
						var downloadUrl = window.URL.createObjectURL(data);
						
						var anchor = document.createElement("a");
						
						anchor.href = downloadUrl;
						
						anchor.download = "pdf.pdf";
						
						anchor.click();
						
						window.URL.revokeObjectURL(data); 
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '下载pdf失败!', '提示');
					});
				},
				Finishbalance(params){//结算完成
					var _this = this;
					_Finishbalance(params).then(function(response) {
						var data = response.data;
						if(data.status) {
							CONSTANT.methods.tips('结算完成!', '确定', function() {
							window.location.reload();
						});
						} else {
							CONSTANT.methods.tips(data.error_msg || '结算完成失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '结算完成失败!', '提示');
					});
				},
				getCustomerList(params){//获取客户名称列表
					var _this = this;
					_getCustomerList(params).then(function(response) {
						var data = response.data;
						if(data.status) {
							console.log(data);
							_this.customerList=data.data.list;
						} else {
							CONSTANT.methods.tips(data.error_msg || '获取客户名称失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '获取客户名称失败!', '提示');
					});
				},
				Getbalancelist(params) {
					var _this = this;
					_Getbalancelist(params).then(function(response) {
						var data = response.data;
						console.log(data);
						if(data.status) {
							_this.tableData = data.data.list;
							_this.pagination.total = data.data.total_num;
						} else {
							CONSTANT.methods.tips(data.error_msg || '获取结算一览失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '获取结算一览失败!', '提示');
					});
				},
				goAdd() {
					location.href = location.origin + '/#/customeradd';
				}
			},
			mounted() {
//				this.getCustomerList({//获取客户列表不做任何限制
//					page_now:"",
//					limit:"",
//					search_by:{            //搜索条件
//			            status:"",         //状态:1=启用、2=禁用
//			            customerName:"",  //客户名（模糊）
//			            address:""        //地址（模糊）
//			        }
//
//				});
				this.Getbalancelist(this.params);
			},
			filters: {

			}

	};
</script>
<style lang="scss" scoped>
	.body{
		/*margin-top: 20px;*/
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
	
	.uc-table-scale> footer {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 100;
	}
	
	.uc-table-scale> footer> div {
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
	
	.uc-table-scale> footer> img {
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