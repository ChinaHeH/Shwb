
<template>
  <el-form :model="ruleForm" ref="ruleForm" class="uc-form" :rules="rules" label-position="top">
    <template v-for="item in dataForm">
      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'input'">
        <el-input v-model="ruleForm[item.key]" :name="item.key" :placeholder="item.placeholder" :disabled="item.disabled"></el-input>
      </el-form-item>

      <el-form-item :prop="item.key" v-if="item.type === 'uploadfile'">
        <uc-upload :uploaderFilesObj="item.uploaderFilesObj" ref="uploadfile"></uc-upload>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'password'">
        <el-input v-model="ruleForm[item.key]" :name="item.key" :placeholder="item.placeholder" type="password"></el-input>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'select'">
        <el-select v-model="ruleForm[item.key]" :name="item.key" :placeholder="item.placeholder">
          <el-option v-for="item1 in item.options" :label="item1.label" :value="item1.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'date'">
        <el-date-picker type="date" v-model="ruleForm[item.key]" :name="item.key" :placeholder="item.placeholder"></el-date-picker>
      </el-form-item>
      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'time'">
        <el-time-picker type="fixed-time" v-model="ruleForm[item.key]" :name="item.key" :placeholder="item.placeholder"></el-time-picker>
      </el-form-item>
      <el-form-item :label="item.label" v-if="item.type === 'dateAndTime'">
        <el-col :span="11">
          <el-form-item :prop="item.key1">
            <el-date-picker type="date" v-model="ruleForm[item.key1]" :name="item.key1" :placeholder="item.placeholder1"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item :prop="item.key2">
            <el-time-picker type="fixed-time" v-model="ruleForm[item.key2]" :name="item.key2" :placeholder="item.placeholder2"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'switch'">
        <el-switch :on-text="item.onText" :off-text="item.offText" v-model="ruleForm[item.key]" :name="item.key"></el-switch>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'checkbox'">
        <el-checkbox-group v-model="ruleForm[item.key]">
          <el-checkbox  :name="item.name" v-for="item1 in item.options" :label="item1.label" :value="item1.value"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'radio'">
        <el-radio-group v-model="ruleForm[item.key]">
          <el-radio  v-for="item1 in item.options" :label="item1.value">{{item1.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="item.label" :prop="item.key" v-if="item.type === 'textarea'">
        <el-input type="textarea" v-model="ruleForm[item.key]" :name="item.key" :placeholder="item.placeholder" :class="item.class"></el-input>
      </el-form-item>

      <el-form-item :prop="item.key" v-if="item.type === 'button'">
        <el-button :type="item.btnType" v-model="ruleForm[item.key]" :name="item.key" @click="item.click">{{item.label}}</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
  import Upload from '~packages/form/upload.vue';
  import { Form, Col, Input, FormItem, Select, Option, DatePicker, TimePicker, Switch, CheckboxGroup, Checkbox, RadioGroup, Radio, Button } from 'element-ui';
  export default {
    data () {
      return {
        ruleForm: this.rForm,
        dataForm: this.dForm,
        rules: this.rrules
      };
    },
    components: {
      ElForm: Form,
      ElCol: Col,
      ElInput: Input,
      ElSelect: Select,
      ElOption: Option,
      ElDatePicker: DatePicker,
      ElTimePicker: TimePicker,
      ElSwitch: Switch,
      ElCheckboxGroup: CheckboxGroup,
      ElCheckbox: Checkbox,
      ElRadioGroup: RadioGroup,
      ElRadio: Radio,
      ElButton: Button,
      ElFormItem: FormItem,
      UcUpload: Upload
    },
    methods: {
      keyupTest () {
        console.log(this.ruleForm.name, 1);
      }
    },
    watch: {
      'rForm': {
        handler: function (newVal) {
          this.ruleForm = newVal;
        },
        deep: true
      },
      'dForm' (newVal) {
        this.dataForm = newVal;
      }
    },
    props: {
      rForm: [Object],
      dForm: [Array],
      rrules: [Object]
    }
  };
</script>
<style lang="scss" scoped>
  .uc-form{
    background-color: white;
    padding: 10px;
  }
</style>
