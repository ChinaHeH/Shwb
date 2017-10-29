<template>
	<div>
		<div class="header">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
			  <el-form-item label="工艺名称">
			    <el-input v-model="formInline.processName" placeholder="请输入工艺名称"></el-input>
			  </el-form-item>
			  <el-form-item label="石料类别">
			    <el-select v-model="formInline.stoneType" placeholder="请选择石料类别">
			      <el-option label="微晶石" value="1"></el-option>
			      <el-option label="全抛釉" value="2"></el-option>
			      <el-option label="玻化砖" value="3"></el-option>
			      <el-option label="特殊砖" value="4"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="规格类别">
			    <el-select v-model="formInline.sizeType" placeholder="请选择规格类别">
			      <el-option label="600*600" value="1"></el-option>
			      <el-option label="800*800" value="2"></el-option>
			      <el-option label="600*900" value="3"></el-option>
			      <el-option label="600*1200" value="4"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">查询</el-button>
			  </el-form-item><el-form-item>
			    <el-button type="primary" @click="addPrice">新增</el-button>
			  </el-form-item>
			</el-form>
			
		</div>
		<div class="body">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column type="index" label="编号" width="180">
				</el-table-column>
				<el-table-column prop="processName" label="工艺名称" width="180">
				</el-table-column>
				<el-table-column label="石料类别" width="180">
					<template slot-scope="scope">
						{{scope.row.stoneType | stoneType}}
					</template>
				</el-table-column>
				<el-table-column label="规格类别" width="180">
					<template slot-scope="scope">
						{{scope.row.sizeType | sizeType}}
					</template>
				</el-table-column>
				<el-table-column label="价格" width="180">
					<template slot-scope="scope">
						￥{{scope.row.price}}
					</template>
				</el-table-column>
				<el-table-column label="操作" >
        <template scope="scope">
        	<el-button size="small" type="primary" @click="detail(scope.row.id)">查看</el-button>
        	<el-button size="small" type="warning" @click="edit(scope.$index, scope.row.id)">编辑</el-button>
        	<el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
			</el-table>
			<el-pagination class="uc-pagination" v-if="pagination.show" :page-size="pagination.size" @current-change="pagination.click" :current-page="pagination.currentPage"  layout="total, prev, pager, next" :total="pagination.total"></el-pagination>
		</div>
	</div>
</template>

<script>
	import {
		CONSTANT
	} from '../../util/constant';
	import {
		_Getpricelist,
		_Deleteprice,
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
					tableData: [],//结算一览数据
					scale: {
						show: false,
						src: require('../../../src/images/default.png')
					},
					 formInline: {
			          processName: '',
			          stoneType: '',
			          sizeType:'',
			       },
					pagination: {
						show: true,
						total: 0,
						currentPage: 1,
						size:5,
						click: page => {
							this.Getpricelist({
								page_now: page,
								limit: 5,
								search_by:this.formInline
							});
						}
					},
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
				addPrice () {
		        location.href = location.origin + '/#/addPrice';
		      	},
				del(id) { //删除价格设定
					this.Deleteprice({
						id: id,
					});
				},
				detail(id) { //查看
					location.href = location.origin + '/#/priceInfo/' + id;
				},
				Deleteprice(params){//删除请求
					var _this = this;
					_Deleteprice(params).then(function(response) {
						var data = response.data;
						console.log(data);
						if(data.status) {
							 CONSTANT.methods.tips('删除成功!', '确定', function(){
					              _this.Getpricelist({
									page_now: 1,
									limit: 5,
									search_by:_this.formInline
								});
				            });
						} else {
							CONSTANT.methods.tips(data.error_msg || '获取客户一览失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '获取客户一览异常!', '提示');
					});
				},
				Getpricelist(params) {//获取价格列表
					var _this = this;
					_Getpricelist(params).then(function(response) {
						var data = response.data;
						console.log(data);
						if(data.status) {
							_this.tableData = data.data.list;
							_this.pagination.total = data.data.total_num;
						} else {
							CONSTANT.methods.tips(data.error_msg || '获取客户一览失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '获取客户一览异常!', '提示');
					});
				},
				goAdd() {
					location.href = location.origin + '/#/customeradd';
				},
				onSubmit(){ //检索
			        console.log(this.formInline);
			        this.Getpricelist({
						page_now: 1,
						limit: 5,
						search_by:this.formInline
					});
			   }
			},
			mounted() {
				 
				this.Getpricelist({
					page_now: 1,
					limit: 5,
					search_by:this.formInline
				});
			},
			filters: {
				sizeType(val){
					switch(val){
						case "1":
						return val="600*600";
						case "2":
						return val="800*800";
						case "3":
						return val="600*900";
						case "4":
						return val="600*1200";
					}
				},
				stoneType(val){
					switch(val){
						case "1":
						return val="微晶石";
						case "2":
						return val="全抛釉";
						case "3":
						return val="玻化砖";
						case "4":
						return val="特殊砖";
					}
				}
			}

	};
</script>
<style lang="scss" scoped>
	.body{
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