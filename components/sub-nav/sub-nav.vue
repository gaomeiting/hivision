<template>
<div class="sub-nav">
  <ul>
    <li v-for="(item, index) in list" :key="index" :class="{'active':currentIndex === index}" @click.stop.prevent="selectItem(index)">{{ item.name }}</li>
  </ul>
  <div class="t_arrow_top t_tab_arrow" :class="'active_'+currentIndex"></div>
</div>   
</template>
<script type="text/ecmascript-6">
export default {
    props: {
        currentIndex: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            default() {
                return [
                    { name: '流程介绍' },
                    { name: '关于我们' }
                ]
            }
        }
    },
    methods: {
        selectItem(index) {
            console.log(index)
            this.$emit('selectItem', index);
        }
    }
}
</script>
<style lang="scss" scoped>
.sub-nav {
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  width: 100%;
  border-bottom: 1px solid #f90;
  position: relative;
  .t_arrow_top, .t_tab_arrow {
    bottom: -8px;
    border-top: 1px solid #f90;
    border-right: 1px solid #f90;
  }
  .t_arrow_top {
    position: absolute;
    z-index: 2;
    width: 16px;
    height: 16px;
    background: #fff;
    transform: rotate(-45deg) translate3d(-50%, 0, 0);
    left: 25%;
    &.active_0 {
      left: 25%;
      transition: .3s ease-in-out;
    }
    &.active_1 {
      left: 75%;
      transition: .3s ease-in-out;
    }
  }
  .t_tab_arrow {

  }
  ul {
    width: 100%;
    display: flex;
    li {
      flex: 1;
      &:hover {
        cursor: pointer;
      }
      &.active {
        color: #f90;
      }
  }
  
  }
  
}


</style>
