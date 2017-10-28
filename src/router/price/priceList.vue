<template>
	<div>
		<div class="header">
			<!--<lebal>
				客户名称:
			</lebal>
			<el-select v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary" @click="check">检索</el-button>-->
			<el-button type="primary" @click="addPrice">新增</el-button>
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
        	<el-button size="small" type="primary" @click="detail(scope.$index, scope.row.id)">查看</el-button>
        	<el-button size="small" type="warning" @click="edit(scope.$index, scope.row.id)">编辑</el-button>
        	<el-button size="small" type="danger" @click="del(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
			</el-table>
			<el-pagination class="uc-pagination" v-if="pagination.show" @current-change="pagination.click" :current-page="pagination.currentPage" layout="total, prev, pager, next" :total="pagination.total"></el-pagination>
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
		_Getpricelist,
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
					tableData: [],//结算一览数据
					scale: {
						show: false,
						src: require('../../../src/images/default.png')
					},
					pagination: {
						show: true,
						total: 0,
						currentPage: 1,
						click: page => {
							this.Getpricelist({
								page_now: page,
								limit: 10,
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
				addPrice () {
	        location.href = location.origin + '/#/addPrice';
	      },
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
				Getpricelist(params) {
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
				}
			},
			mounted() {
				this.Getpricelist({
					page_now: 1,
					limit: 10,
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