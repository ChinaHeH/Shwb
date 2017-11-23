<template>
  <main>
    <uc-upload :uploaderFilesObj="uploaderFilesObj1"></uc-upload>
  </main>
</template>

<script>

  import Upload from '~packages/form/upload.vue';
  export default {

    data () {

      return {
        uploaderFilesObj1: {
          label: '上传图片',
          required: true,
          selectId: 'qiniu_uploader1',
          dropId: 'qiniu_container1',
          total: 1,
          mimeTypes: [{title: 'Image files', extensions: 'jpg,jpeg,gif,png'}],
          multiSelection: false,
          files: [],
          showTip: false,
          tips: '请选择上传图片'
        }
      }

    },
    components: {
      UcUpload: Upload
    },
    methods: {
      test () {

      }
    }
  }
</script>
<style>
  .el-table .cell{
    text-align: left!important;
  }
</style>
