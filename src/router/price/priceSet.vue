<template>
	<div>
		<div class="body">
			<el-table :data="tableData" stripe style="width: 100%" >
				<el-table-column type="index" label="编号" width="100">
				</el-table-column>
				<el-table-column label="工艺名称" width="250">
					<template slot-scope="scope">
						<el-input v-model="scope.row.processName" placeholder="请输入内容"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="石料类别" width="250">
					<template slot-scope="scope">
						    <el-select v-model="scope.row.stoneType" placeholder="请选择石料类别">
						      <el-option label="微晶石" value="1"></el-option>
						      <el-option label="全抛釉" value="2"></el-option>
						      <el-option label="玻化砖" value="3"></el-option>
						      <el-option label="特殊砖" value="4"></el-option>
						    </el-select>
					</template>
				</el-table-column>
				<el-table-column label="规格类别" width="250">
					<template slot-scope="scope">
						    <el-select v-model="scope.row.sizeType" placeholder="请选择规格类别">
						      <el-option label="600*600" value="1"></el-option>
						      <el-option label="800*800" value="2"></el-option>
						      <el-option label="600*900" value="3"></el-option>
						      <el-option label="600*1200" value="4"></el-option>
						    </el-select>
					</template>
				</el-table-column>
				<el-table-column label="价格" width="150">
					<template slot-scope="scope">
						    <el-input type="number" min="0"  v-model="scope.row.price"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button :disabled="scope.$index==0" @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">
							移除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="header">
			<el-button type="primary" @click="addPrice">添加一行价格设定</el-button>
			<el-button type="danger" @click="savePrices">批量添加价格设定</el-button>
		</div>
	</div>
</template>

<script>
import { CONSTANT } from "../../util/constant";
import { _Addpricebatch } from "../../util/ajax";
import {
  Select,
  Button,
  Table,
  Input,
  TableColumn,
  Form,
  FormItem,
  Option
} from "element-ui";

export default {
  data() {
    return {
      isSave: false, //默认不可提交
      tableData: [
        {
          processName: "",
          stoneType: "",
          sizeType: "",
          price: ""
        }
      ], //结算一览数据
      scale: {
        show: false,
        src: require("../../../src/images/default.png")
      },
      formInline: [
        {
          processName: "",
          stoneType: "",
          sizeType: ""
        },
        {
          processName: "",
          stoneType: "",
          sizeType: ""
        }
      ]
    };
  },
  components: {
    ElSelect: Select,
    ElButton: Button,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElInput: Input,
    ElForm: Form,
    ElFormItem: FormItem,
    ElOption: Option
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      console.log(this.tableData);
    },
    addPrice() {
      this.tableData.push({
        processName: "",
        stoneType: "",
        sizeType: "",
        price: ""
      });
    },
    savePrices() {
      //批量生产价格设定
      console.log(this.tableData);
      this.Addpricebatch(this.tableData);
    },
    Addpricebatch(params) {
      _Addpricebatch(params)
        .then(function(response) {
          var data = response.data;
          console.log(data);
          if (data.status) {
            CONSTANT.methods.tips("批量添加价格设定成功!", "确定", function() {
              location.href = location.origin + "/#/priceList";
            });
          } else if (data.error_code == 101) {
            if (
              data.error_msg == "processName 为空" ||
              data.error_msg == '"processName 为空"'
            ) {
              CONSTANT.methods.tips("工艺名称不能为空!", "提示");
            } else if (
              data.error_msg == "stoneType 为空" ||
              data.error_msg == '"stoneType 为空"'
            ) {
              CONSTANT.methods.tips("石料类别不能为空!", "提示");
            } else if (
              data.error_msg == "sizeType 为空" ||
              data.error_msg == '"sizeType 为空"'
            ) {
              CONSTANT.methods.tips("规格类别不能为空!", "提示");
            } else if (
              data.error_msg == "price 为空" ||
              data.error_msg == '"price 为空"'
            ) {
              CONSTANT.methods.tips("价格不能为空!", "提示");
            } else {
              CONSTANT.methods.tips(
                data.error_msg || "" + data.error_msg,
                "提示"
              );
            }
          } else {
            CONSTANT.methods.tips(data.error_msg || "批量添加价格设定异常!", "提示");
          }
        })
        .catch(function(res) {
          CONSTANT.methods.tips(res || "批量添加价格设定异常!", "提示");
        });
    }
  },
  mounted() {},
  filters: {}
};
</script>
<style>
.el-table .cell {
  text-align: left !important;
}
</style>
<style lang="scss" scoped>
/*.body {
		margin-top: 20px;
	}*/
.header {
  margin-top: 15px;
  text-align: center;
}
.uc-slider-list {
  > button {
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

.uc-table-scale > footer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

.uc-table-scale > footer > div {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  z-index: 120;
  opacity: 0.4;
}

.uc-table-scale > footer > img {
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