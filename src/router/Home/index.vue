<template>
  <main>
    <uc-form :rForm="rForm" :dForm="dForm" :rrules="rules" v-show="false"></uc-form>
    <uc-table :tData="tData" :cData="cData" :operation="true" :pagination="pagination"></uc-table>
    <div @click="test">123124</div>
    <qr-code :text="value" :size="size"></qr-code>
  </main>
</template>

<script>

  import Form from '~packages/form/form.vue';
  import Table from '~packages/table/table.vue';
  import {_test, _testJava} from '../../util/ajax';
  import VueQRCodeComponent from 'vue-qrcode-component';
  export default {

    data () {
      var dForm= [];
      //input
      dForm.push({
        type: 'input',
        key: 'name',
        label: '活动规则',
        placeholder: '张飞'
      });

      //select
      dForm.push({
        type: 'select',
        key: 'select',
        label: '选择活动区域',
        placeholder: '请选择活动区域',
        options: [{
          label: '活动区域1',
          value: '1'
        }, {
          label: '活动区域2',
          value: '2'
        }]
      });

      //date
      dForm.push({
        type: 'date',
        key: 'date',
        label: '选择时间',
        placeholder: '请选择开始时间'
      });

      //time
      dForm.push({
        type: 'time',
        key: 'time',
        label: '选择时分',
        placeholder: '请选择开始时分'
      });

      //dateAndTime
      dForm.push({
        type: 'dateAndTime',
        key1: 'date1',
        key2: 'date2',
        label: '选择时间和时分',
        placeholder1: '请选择日期',
        placeholder2: '请选择时间'
      });

      //switch
      dForm.push({
        type: 'switch',
        key: 'switch',
        label: '是否开关',
        onText: '开',
        offText: '关'
      });

      //checkbox
      dForm.push({
        type: 'checkbox',
        name: 'typec',
        key: 'checkbox',
        label: '请选择CheckBox',
        options: [{
          label: 'CheckBox1',
          value: '1'
        }, {
          label: 'CheckBox2',
          value: '2'
        }]
      });

      //radio
      dForm.push({
        type: 'radio',
        key: 'radio',
        label: '请选择radio',
        options: [{
          label: 'radio1',
          value: '1'
        }, {
          label: 'radio2',
          value: '2'
        }]
      });

      //textarea
      dForm.push({
        type: 'textarea',
        key: 'textarea',
        label: 'textarea描述',
        placeholder: '请输入textarea描述'
      });

      //button1
      dForm.push({
        type: 'button',
        key: 'button',
        btnType: 'primary',
        label: '确定'
      });

      //button2
      dForm.push({
        type: 'button',
        key: 'reset',
        btnType: '',
        label: '重置'
      });

//      table
      var cData = [], tData = [];

      cData.push({
        label: '日期',
        key: 'date'
      });
      cData.push({
        label: '姓名',
        key: 'name'
      });
      cData.push({
        label: '性别',
        key: 'sex'
      });
      cData.push({
        label: '地址',
        key: 'address'
      });
      tData.push({
        date: '2014-09-08',
        name: '张小飞',
        sex: '男',
        address: '上海市浦东新区漕河泾开发区高新技术开发区',
        btns: [{
          label: '查看',
          click: function (index, row) {
            console.log(index, row, 'check');
          }
        }, {
          type: 'danger',
          label: '修改',
          click: function (index, row) {
            console.log(index, row, 'update');
          }
        }]
      });
      tData.push({
        date: '2014-09-09',
        name: '陈存明',
        sex: '男',
        address: '上海市浦东新区漕河泾开发区高新技术开发区1'
      });
      return {
        rForm: {
          name: '',
          select: ''
        },
        dForm: dForm,
        cData: cData,
        tData: tData,
        pagination: {
          show: true,
          total: 400,
          currentPage: 2,
          click: page => {
            console.log(page);
            this.pagination.total = 306;
          }
        },
        value: 'http://10.0.0.191:4005/#/',
        size: 128,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          name1: [
            { required: true, message: '请输入活动名称1', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }

    },
    components: {
      QrCode: VueQRCodeComponent,
      UcForm: Form,
      UcTable: Table
    },
    methods: {
      test () {
//        var a = document.createElement('a');
//        var url = 'portal/download/enterpriseData?enterpriseId=235604&operateUserNumber=66570070';
//        var filename = 'data.xlsx';
//        a.href=url;
//        a.download = filename;
//        a.click()
        _test().then(function () {

        })
//        _testJava();
      }
    }
  }
</script>
<style>
  .el-table .cell{
    text-align: center!important;
  }
</style>
