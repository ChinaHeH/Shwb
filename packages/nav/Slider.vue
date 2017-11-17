<template>
  <uc-scrollbar class="slider">
    <ul>
      <li v-for="(item,index) in menu1">
        <template v-if="item.children && item.children.length > 0">
          <div @click="showSecondMenu(item)" :class="item.expansion ? 'expansion' : ''">
            <i v-if="index == 0" class="fa fa-file-text fa-3" aria-hidden="true"></i>
            <i v-else-if="index == 4" class="fa fa-home fa-3" aria-hidden="true"></i>
            <i v-else-if="index == 5" class="fa fa-user fa-3" aria-hidden="true"></i>
            <i v-else-if="index == 6" class="fa fa-database fa-3" aria-hidden="true"></i>
            <i v-else-if="index == 7" class="fa fa-book fa-3" aria-hidden="true"></i>
            <i v-else-if="index == 8" class="fa fa-gear fa-3" aria-hidden="true"></i>
            <i v-else="index == 1 || index == 2 || index == 3" class="fa fa-gear fa-3" aria-hidden="true"></i>
            <label>{{item.name}}</label>
            <i class="fa fa-angle-down fa-2" aria-hidden="true" v-if="item.children && item.children.length > 0"></i>
          </div>
        </template>
        <router-link :to="item.href" tag="div" v-else-if="item.show" :class="$route.path.indexOf(item.href) >= 0 ? 'active' : ''">
          <i class="fa fa-home fa-3" aria-hidden="true"></i>
          <label>{{item.name}}</label>
          <i class="fa fa-angle-down fa-2" aria-hidden="true" v-if="item.children && item.children.length > 0"></i>
        </router-link>

        <ul v-if="item.children && item.children.length > 0" :class="item.expansion ? 'expansion' : ''">
          <li v-for="itemchild in item.children">
            <router-link v-if="itemchild.show" :to="itemchild.href" tag="div" :class="$route.path.indexOf(itemchild.href) >= 0 ? 'active' : ''">
              <label>{{itemchild.name}}</label>
            </router-link>
          </li>
        </ul>


      </li>

    </ul>
  </uc-scrollbar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  export default {
    data () {

      return {
        menu1: this.menu
      };
    },
    components: {
      UcScrollbar: VuePerfectScrollbar
    },
    props: {
      menu: [Array]
    },
    methods: {
      showSecondMenu (item) {
        if (item.expansion) {
          item.expansion = false;
        } else {
          this.menu.forEach(function (element) {
            if (element.children && element.children.length > 0 && element.expansion) {
              element.expansion = false;
            }
          });
          item.expansion = true;
        }

      },
      isActiveMenu (item) {
        item.active = true;
      }
    },
    watch: {
      'menu' (newVal) {
        this.menu1 = newVal;
      }
    }
  };
</script>
<style lang="scss">
  .slider{
    display: block;
    width: 200px;
    height: 100%;
    min-width: 200px;
    >ul{
      background-color: #324157;
      height: 100%;
      color: white;
      >li{
        list-style: none;
        >div{
          padding: 15px 20px;
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
          display: flex;
          transition: all .2s ease-in-out;
          cursor: pointer;
          >i{
            font-size: 16px;
            transition: all .2s ease-in-out;
          }
          >label{
            flex: 1;
            margin-left: 10px;
            cursor: pointer
          }
          &:hover{
            background-color: #44586b;
          }
          &.active{
            background-color: #00abda;
          }
          &.expansion{
            >i:last-child{

              transform: rotate(180deg);
            }
          }
        }


        >ul{
          background-color: #1f2d3d;
          list-style: none;
          font-size: 14px;
          opacity: 0;
          display: none;
          transition: all .5s ease-in-out;
          animation: .5s ease-in 0s slideul;
          >li{
            >div{
              cursor: pointer;
              height: 40px;
              line-height: 40px;
              padding-left: 45px;
              cursor: pointer;
              >label{
                cursor: pointer
              }
              &:hover{
                background-color: #44586b;
              }
              &.active{
                background-color: #00abda;
              }
            }
          }
          &.expansion{
            opacity: 1;
            display: inherit;

          }
        }
      }
    }
  }
  @keyframes slideul {
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }

</style>
