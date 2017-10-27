
<template>
  <main class="uc-grid">
    <table>
      <tbody>
        <tr v-for="item in tableData">
          <td>{{item.label}}</td>
          <td v-if="item.type === 'img'"><img :src="item.value" @click="scaleImg('2', item.value)" class="uc-grid-thumbnails"></td>
          <td v-else>{{item.value}}</td>
        </tr>
      </tbody>
    </table>
    <footer v-if="scale.show">
      <div @click="scaleImg('1')"></div>
      <img :src="scale.src">
    </footer>
  </main>
</template>

<script>

  export default {
    data () {
      return {
        tableData: this.cData || [],
        scale: {
          show: false,
          src: require('../../src/images/default.png')
        }
      };
    },
    components: {

    },
    methods: {
      scaleImg (type, src) {
        if (type === '1') {
          this.scale.show = false;
        } else {
          this.scale.show = true;
          this.scale.src = src;
        }
      }
    },
    watch: {
      'cData' (newVal) {
        this.tableData = newVal;
      }
    },
    props: {
      cData: [Array]
    }
  };
</script>
<style lang="scss" scoped>
  .uc-grid{
    box-sizing: border-box;
    >table{
      width: 100%;
      background: #fff;
      border: 1px solid #dfdfdf;
      box-shadow: 0 1px 7px rgba(0,0,0,.1);
      color: #373a3c;
      font-size: 14px;
      border-collapse: collapse;
      >tbody{
        border-bottom: 1px solid #f9f9f9;
        >tr{
          border-top: 1px solid #f9f9f9;
          >td{
            padding: 8px 16px;
            &:first-child{
              width: 15em;
              padding-right: 3em;
              text-align: right;
              border-right: 2px solid #fff;
            }
            &:last-child{
              padding-left: 3em;
            }
          }
          &:nth-child(2n+1){
            background: #f9f9f9;
          }
          &:hover{
            background: #eee;
          }
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
  .uc-grid-thumbnails{
    width: 40px;
    height: 40px;
    padding: 5px 0;
    flex-direction: column;
    display: flex;
  }

</style>
