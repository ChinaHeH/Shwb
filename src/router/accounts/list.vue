<template>
	<div>
		<div class="header">
			<lebal>
				客户名称:
			</lebal>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="check">检索</el-button>
		</div>
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
						<sapn v-if="scope.row.rebateType==1">￥{{scope.row.rebateSum}}</sapn>
						<span v-if="scope.row.rebateType==2">{{scope.row.rebatePercent}}%</span>
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
						<el-button v-if="scope.row.status==2" type="primary" @click="donwLoad(scope.$index,scope.row.id)">下载</el-button>
						<el-button type="primary" v-if="scope.row.status==1" @click="save(scope.$index, scope.row.id)">完成</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="uc-pagination" v-if="pagination.show" @current-change="pagination.click" :page-size="pagination.size"  :current-page="pagination.currentPage" layout="total, prev, pager, next" :total="pagination.total"></el-pagination>
		</div>
		<footer v-if="scale.show">
			<div @click="scaleImg('1')"></div>
			<img :src="scale.src">
		</footer>
	</div>
</template>

<script>
	import {
		CONSTANT
	} from '../../util/constant';
	import {
		_Getbalancelist,
	} from '../../util/ajax';
	import {
		Select,
		Button,
		Table,
		TableColumn,
		Pagination
	} from 'element-ui';

	export default {
		data() {
				return {
					value: "",
					//					cData: cData,
					tableData: [],//结算一览数据
					scale: {
						show: false,
						src: require('../../../src/images/default.png')
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
				}
			},
			components: {
				ElSelect: Select,
				ElButton: Button,
				ElTable: Table,
				ElTableColumn: TableColumn,
				ElPagination: Pagination
			},
			methods: {
				check() { //检索
					alert(1);
				},
				donwLoad(index, id) { //下载
					alert(index);
					alert(id);
				},
				save(index, id) { //保存
					alert(index);
					alert(id);
				},
				Getbalancelist(params) {
					var _this = this;
					_Getbalancelist(params).then(function(response) {
						var data = response.data;
						console.log(data);
						if(data.status) {
							_this.tableData = data.data.list;
						} else {
							CONSTANT.methods.tips(data.error_msg || '获取客户一览失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '获取客户一览异常!', '提示');
					});
				},
				goAdd() {
					location.href = location.origin + '/#/customeradd';
				}
			},
			mounted() {
				this.Getbalancelist({
					page_now: 1,
					limit: 10,
					value:this.value,
				});
			},
			filters: {

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