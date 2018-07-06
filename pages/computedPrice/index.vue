<template>
<section>
  <top-tip ref="topTip">
      <div class="nav-wrap">
        <app-header></app-header>
      </div>
  </top-tip>
  <div class="nav-wrap">
    <app-header></app-header>
  </div> 
  <div class="normal-wrapper">
    <div class="title">
      <h3>Connecting people to global information</h3>
      <p>through spoken audio</p>
    </div>
    <div class="content">
      <div class="left">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="tags">
            <span v-for="(tag, tagIndex) in item.subList" :key="tagIndex" :class="{'active': indexs[index]['index'] === tagIndex}" @click.stop.prevent="selectTag(index, tagIndex)">{{tag.name}}</span>
          </div>
        </div>
        <div class="item">
          <div class="title">字数</div>
          <div class="tags">
            <span><!-- <input type="text" placeholder="请输入文字数目"> <-->
              <input-box placeholder="请输入文字数目" @queryChange="queryChange" ref="box"></input-box>
            </span>
            <small v-if="error" style="color:red">{{error}}</small>
          </div>
        </div>
      </div>
      <div class="right">
        <h3>费用分布</h3>
        <transition name="fade" mode="out-in">
          <p  v-if="query" :key="query">
            <br>
            <br>
            预估时长: {{cost.time}}分钟<br>
            预估费用: {{ cost.minMoney }} ~ {{ cost.maxMoney }} 元
          </p>

          <img :key="!query" v-if="!query" src="~/assets/img/cartoon_err.png" alt="">
        </transition>
        <p class="tip">项目复杂度、质量要求、紧迫性的差异会影响设计费用, 计算结果仅供参考</p>
      </div>
    </div>
    <div class="title">
      <!-- <h3>下一步，去特赞找最对的设计师</h3> -->
     <p><!-- 99% 的特赞客户在 24 小时内找到了设计师 -->下一步，去配音</p>
      <a href="/client/" class="btn">发布需求</a>
    </div>
  </div> 
</section>
</template>
<script type="text/ecmascript-6">
import AppHeader from '~/components/app-header/app-header'
import TopTip from '~/components/top-tip/top-tip'
import InputBox from '~/components/input-box/input-box'
import Cal from '~/assets/js/cal'
export default {
  data() {
    return {
      list : [
        { name : '稿件类型', subList: [{ name : '普通类' }, { name : '颁奖类' }, { name :'品牌类' }, { name :'电购类'}]},
        { name : '语言类型', subList: [{ name : '普通话' }, { name : '外语小语种' }, { name :'方言/名族语' }]},
        { name : '主播级别', subList: [{ name : '优质主播' }, { name : '知名主播' }, { name :'顶级主播' }]},
      ],
      indexs: [{index: 0, name: '稿件类型'}, {index: 0, name: '语言类型'}, {index: 0, name: '主播类型'}],
      query: '',
      error: '',
      cost: null
    }
  },
  methods: {
    selectTag(index, tagIndex) {
      this.indexs[index]['index'] = tagIndex;
      if(!this.query) return;
      //计算价格
      this.computedPrice();
    },
    computedPrice() {
      let type = this.indexs[0]['index'] + 1;
      let language = this.indexs[1]['index'] + 1;
      let level = this.indexs[2]['index'] + 1;
      this.cost=Cal(this.query,type,language,level)
    },
    queryChange(query) {
      //if(!this.query) return;
      if(isNaN(query)) {
        this.$refs.box.clear()
        this.error="请输入数字类型的值"
      }
      else {
        this.query = query;
        if(this.error) this.error='';
        if(!this.query) return;
        this.computedPrice()
        //console.log(Cal)
      }
    },
  },
    components: {
      AppHeader,
      TopTip,
      InputBox
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
section {
  
    width: 100%;
    .nav-wrap {
      width: 100%;
      height: 66px;
      position: relative;
      nav {
          
          /deep/ .nuxt-link-exact-active {
              color: #f90;
          }
          /deep/ .nuxt-link-active {
              color: #f90;
          }
          /deep/ a {
              color: #555;
          }
          /deep/ a:hover {
              color: #f90;
          }
          /deep/ ol {
              a {
                  color: #f90;
              }
          }
      }
    }
    .btn {
      display: block;
      width: 214px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #f90;
      color: #fff;
      margin: 0 auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .normal-wrapper {
        width: 970px;
        margin:  0 auto;
        overflow: hidden;
        > .title {
          text-align: center;
          padding-top: 50px;
          &:last-of-type {
            padding-bottom: 26px;
            h3 {
              font-size: 24px;
            }
            p {
              padding-bottom: 34px;
            }
          }
          h3 {
            font-size: 32px;
            padding-bottom: 34px;
          }
          p {
            font-size: 16px;
          }
        }
        .content {
          display: flex;
          padding-top: 80px;
          padding-bottom: 100px;
          border-bottom: 1px solid #eaeaea;
          .left {
            flex: 1;
            .item {
              .title {
                font-size: 12px;
                padding-bottom: 12px;
              }
              .tags {
                font-size: 14px;
                margin-bottom: 30px;
                span {
                  display: inline-block;
                  padding: 8px 20px;
                  border-radius: 16px;
                  background: #f8f8f8;
                  margin-right: 16px;
                  margin-bottom: 8px;
                  cursor: pointer;
                  &:last-child {
                    margin-right: 0;
                  }
                  &.active {
                    background: #f90;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                    color: #fff;
                  }
                }
              }
            }

          }
          .right {
              width: 520px;
              flex: 0 0 520px;
              border: 1px solid #eaeaea;
              background: #f8f8f8;
              padding: 30px;
              text-align: center;
              line-height: 2;
              font-size: 14px;
              position: relative;
              .tip {
                position: absolute;
                bottom: 0;
                left: 0;
                right:0;
                font-size: 12px;
                text-align: center;
              }
              h3 {
                color: #f90;
                font-size: 16px;
                padding-bottom: 10px;
              }
          }
        }
        
    }
}


</style>
