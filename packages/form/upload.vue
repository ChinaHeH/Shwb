
<template>
  <main class='uc-upload'>
    <label :class="uploaderFiles.required ? 'required' : ''">{{uploaderFiles.label}}</label>
    <div :id="uploaderFiles.dropId" :class="uploaderFiles.showTip ? 'error' : ''">
      <span :id="uploaderFiles.selectId">选择文件</span>
    </div>
    <span v-show="uploaderFiles.showTip">{{uploaderFiles.tips}}</span>
    <section>
      <div v-for="(item, index) in uploaderFiles.files">
        <i class="fa fa-times" aria-hidden="true" @click="removeFile(item.id, index)"></i>
        <img :src="item.url" @click="scaleImg(2, item.url)">
        <div :style="item.style"></div>
      </div>
    </section>
    <footer v-if="scale.show">
      <div @click="scaleImg('1')"></div>
      <img :src="scale.src">
    </footer>
  </main>
</template>

<script>

  import { _getQiniuUptoken } from '../../src/util/ajax';
  export default {
    data () {
      return {
        uploader: {},
        uptoken: '',
        uploaderFiles: this.uploaderFilesObj,
        scale: {
          show: false,
          src: require('../../src/images/default.png')
        }
      };
    },
    components: {

    },
    props: {
      uploaderFilesObj: {
        type: Object,
        default: {
          label: '上传文件',
          required: true,
          selectId: 'qiniu_uploader',
          dropId: 'qiniu_container',
          total: 1,
          mimeTypes: [{title: 'Image files', extensions: 'jpg, jpeg, gif, png'}],
          multiSelection: false,
          files: [],
          showTip: false,
          tips: '请选择上传图片'
        }
      }
    },
    methods: {
      initQiniu () {
        var _this = this;

        _this.uploader = window.Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: _this.uploaderFiles.selectId,
          container: _this.uploaderFiles.dropId,
          drop_element: _this.uploaderFiles.dropId,
          max_file_size: '100mb',
          flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
          dragdrop: true,
          chunk_size: '4mb',
          multi_selection: _this.uploaderFiles.multiSelection,
          uptoken: _this.uptoken,
          domain: 'ouvvk5b6m.bkt.clouddn.com',
          get_new_uptoken: false,
          auto_start: true,
          log_level: 5,
          filters: {
            prevent_duplicates: false,
            // Specify what files to browse for
            mime_types: _this.uploaderFiles.mimeTypes || []
          },
          init: {
            'BeforeChunkUpload': function (up, file) {
              console.log(1);
            },
            'FilesAdded': function (up, files) {
              /*
              * 当文件数量超出的时候清空uploader.files;并提示
              * */
              var arr = new Array(..._this.uploaderFiles.files);


              files.forEach(function (element) {
                if (arr.indexOf(element.id) === -1) {
                  arr.push(element);
                }
              });
              if (arr.length > _this.uploaderFiles.total) {
                _this.uploaderFiles.showTip = true;
                _this.uploaderFiles.tips = '上传的文件数量不得超过' + _this.uploaderFiles.total;
                up.files.splice(_this.uploaderFiles.total);
                return;
              }
              _this.uploaderFiles.showTip = false;


              /*
              * 生成预览图
              * */
              files.forEach(function (element) {
                if (_this.uploaderFiles.files.indexOf(element.id) === -1) {
                  _this.$set(element, 'style', 'height: 100%');
                  _this.$set(element, 'url', require('../../src/images/default.png'));
                  _this.uploaderFiles.files.push(element);
                }
              });
            },
            'BeforeUpload': function (up, file) {
              console.log(1);
            },
            'UploadProgress': function (up, file) {
              for (let item of _this.uploaderFiles.files) {
                if (item.id === file.id) {
                  item.style = 'height:' + (100 - file.percent) + '%';
                }
              }
            },
            'UploadComplete': function () {
              console.log(1);
            },
            'FileUploaded': function (up, file, info) {
              let domain = up.getOption('domain');
              let res = JSON.parse(info);
              let url = 'http://' + domain + '/' + res.key;
              let localLink = url + '?imageView2/1/w/100/h/100';

              // 上传类型如果的图片就更换已经上传好的图片
              for (let item of _this.uploaderFiles.files) {
                if (item.id === file.id) {
                  item.url = localLink;
                }
              }
            },
            'Error': function (up, err, errTip) {

              up.removeFile(err.file.id);
            }
          }
        });

      },
      getUptoken () {
        var _this = this;

        _getQiniuUptoken().then(function (res) {
          var data = res.data;

          if (data.status) {
            _this.uptoken = data.data.qiniuToken;
          }
        });
      },
      removeFile (fileId, index) {
        if (fileId) {
          this.uploader.removeFile(fileId);
        }
        this.uploaderFiles.files.splice(index, 1);
        this.uploaderFiles.showTip = false;
      },
      scaleImg (type, src) {
        if (type === '1') {
          this.scale.show = false;
        } else {
          this.scale.show = true;
          this.scale.src = src.split('?imageView2')[0];
        }
      }
    },
    mounted () {
      this.getUptoken();
    },
    watch: {
      'uptoken' (newVal) {
        if (newVal) {
          this.initQiniu();
        }
      },
      'uploaderFilesObj': {
        handler: function (newVal) {
          if (newVal) {
            this.uploaderFiles = newVal;
          }
        },
        deep: true
      }
    }
  };
</script>
<style lang='scss' scoped>
  .uc-upload{
    >label{
      vertical-align: middle;
      font-size: 14px;
      color: #48576a;
      line-height: 1;
      box-sizing: border-box;
      float: none;
      display: inline-block;
      text-align: left;
      padding: 0 0 10px;
      &.required:before{
        content: '*';
        color: #ff4949;
        margin-right: 4px;
      }
    }
    >div{
      position: relative;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      color: #1f2d3d;
      height: 28px;
      line-height: 28px;
      padding: 3px 10px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      margin: 0 0 22px;
      >span{
        z-index: 1;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        padding: 2px 5px;
        cursor: pointer;
      }
      &.error{
        border-color: red;
      }
    }
    >span{
      margin-top: -22px;
      display: block;
      color: red;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
    }
    >section{
      overflow: hidden;
      >div{
        position: relative;
        width: 100px;
        height: 100px;
        float: left;
        margin: 0 10px 10px 0;
        >i{
          position: absolute;
          top: 0;
          right: 0;
          background: black;
          color: white;
          font-size: 22px;
          padding: 2px;
          border-radius: 50%;
          height: 26px;
          width: 26px;
          text-align: center;
          opacity: .7;
          cursor: pointer;
        }
        >img{
          width: 100px;
          height: 100px;
        }
        >div{
          height: 0%;
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          background: black;
          opacity: .2;
          transition: all 0.5s;
        }
      }
    }
    >footer{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 100;
      >div{
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
      >img{
        z-index: 121;
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: 0 0;
        max-width: 90%;
        max-height: 90%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
  }
</style>
