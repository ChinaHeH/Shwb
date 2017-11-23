<template>
	<div class="uc-slider-add">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="工艺名称" prop="name">
		    <el-input  v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="石料类别" prop="region">
		    <el-select v-model="ruleForm.region" placeholder="请选择石料类别">
		      <el-option label="微晶石" value="1"></el-option>
		      <el-option label="全抛釉" value="2"></el-option>
		      <el-option label="玻化砖" value="3"></el-option>
		      <el-option label="特殊砖" value="4"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="规格类别" prop="resource">
		    <el-radio-group v-model="ruleForm.resource">
		      <el-radio label="1">600*600</el-radio>
		      <el-radio label="2">800*800</el-radio>
		      <el-radio label="3">600*900</el-radio>
		      <el-radio label="4">600*1200</el-radio>
		    </el-radio-group>
		  </el-form-item>
		  <el-form-item label="价格" prop="price">
		    <el-input  v-model="ruleForm.price"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">更新价格</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
  import {CONSTANT} from '../../util/constant';
  import { _Updateprice,_Getprice } from '../../util/ajax';
  import {
  		Form,
  		Input,
  		FormItem,
  		Checkbox,
  		Button,
  		Radio,
  		Select,
  		Option,
  		RadioGroup,
		Pagination
	} from 'element-ui';

  export default {
    data () {
      return {
        ruleForm: {
          name: '',
          price:'',
          region: '',
          resource: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入工艺名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择石料类别', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择规格类别', trigger: 'change' }
          ],
          price:[
          	{ required: true, message: '请输入价格', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    components: {
      ElForm: Form,
      ElInput :Input,
      ElFormItem : FormItem,
  	  ElCheckbox:Checkbox ,
  	  ElButton:Button ,
  	  ElSelect : Select,
  	  ElRadio : Radio ,
	  ElPagination: Pagination,
	  ElOption:Option,
  	  ElRadioGroup:RadioGroup,
    },
    methods: {
    	Getprice () {
        var _this = this;

        var params = {
          id: _this.$route.params.id
        };

        _Getprice(params).then(function (response) {
          var data = response.data;
          console.log(data);
          if (data.status) {
          	_this.ruleForm.name=data.data.processName;
          	_this.ruleForm.price=data.data.price;
          	_this.ruleForm.region=data.data.stoneType;
          	_this.ruleForm.resource=data.data.sizeType;
          } else {
            CONSTANT.methods.tips(data.error_msg || '获取用户信息失败!', '提示');
          }
        }).catch(function (res) {
          CONSTANT.methods.tips(res || '获取用户信息异常!', '提示');
        });
      },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(isNaN(this.ruleForm.price)){
            	CONSTANT.methods.tips("价格只能为数字，请重新输入");
            }else{
            	 //发送添加价格请求
            	 this.Updateprice({
            	 	"id":this.$route.params.id,
		            "processName":this.ruleForm.name,       //工艺名称
		            "stoneType":this.ruleForm.region,        //石料类别：1=微晶石、2=全抛釉、3=玻化砖、4=特殊砖
		            "sizeType":this.ruleForm.resource,     //规格类别:1=600*600、2=800*800、3=600*900、4=600*1200 
		            "price":this.ruleForm.price         
            	 })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      Updateprice(params) {
					var _this = this;
					_Updateprice(params).then(function(response) {
						var data = response.data;
						if(data.status) {
//							CONSTANT.methods.tips("新增价格成功");
							CONSTANT.methods.tips('更新价格成功!', '确定', function(){
								location.href = location.origin + '/#/priceList';
				            });
						} else {
							CONSTANT.methods.tips(data.error_msg || '更新价格成功失败!', '提示');
						}
					}).catch(function(res) {
						CONSTANT.methods.tips(res || '更新价格成功异常!', '提示');
					});
				},
    },
    mounted(){
    	this.Getprice();
    },
  };
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
<style lang="scss" scoped>
.uc-slider-add{
	padding: 30px;
	background: #FFFFFF;
}
</style>