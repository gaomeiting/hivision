<template>
    <section class="nav-wrap">
        <ul>
            <li @click.stop="selectItem(index)" :class="{'active' : currentIndex === index}" v-for="(item, index) in list" :key="index">{{item.title}}</li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        list : {
            type: Array,
            default() {
                return [
                    {title: '手机注册'},
                    {title: '邮箱注册'}
                ]
            }
        },
        currentIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            
          
        }
    },
    methods: {
       selectItem(index) {
        this.$emit('selectItem', index);
       }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.nav-wrap {
    ul {
        display: flex;
        li {
            flex: 1;
            border-bottom: 2px solid rgba(0,0,0,0.01);
            font-size: $font-size-large;
            text-align: center;
            line-height: 1.8;
            padding-bottom: 14px;
            &.active {
                border-bottom: 2px solid $color-theme;
            }
        }
    }
}
</style>