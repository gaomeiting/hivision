<template>
    <section class="container">
        <top-tip ref="topTip">
            <div class="nav-wrap">
              <app-header></app-header>
            </div>
        </top-tip>
      <!-- <div class="nav-wrap">
        <app-header></app-header>
      </div> -->
        <section class="banner">
            <app-header class="nav-wrapper"></app-header>
            <div>
                <h2>用声音为您的内容赋能</h2>
                <p>成立于2000年 至今服务过上百个国内国际知名品牌！</p>
                <a href="/client/" class="btn">发布内容</a>
            </div>
        </section>
        <section class="normal icons-wrap">
            <div>
                <h3>解决你的全部<strong>配音需求</strong></h3>
                <ul>
                    <li>
                        <div>
                            <img src="~assets/img/icon-01.png">
                        </div>
                        <p>广告宣传</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-02.png">
                        </div>
                        <p>专题/解说</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-03.png">
                        </div>
                        <p>课件配音</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-04.png">
                        </div>
                        <p>促销广播</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-05.png">
                        </div>
                        <p>电话引导</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-06.png">
                        </div>
                        <p>有声小说</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-07.png">
                        </div>
                        <p>诗歌朗诵</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-08.png">
                        </div>
                        <p>新闻播报</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-09.png">
                        </div>
                        <p>方言配音</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-10.png">
                        </div>
                        <p>外语配音</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-11.png">
                        </div>
                        <p>内容专栏</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-12.png">
                        </div>
                        <p>短视屏配音</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-13.png">
                        </div>
                        <p>电话彩铃</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-14.png">
                        </div>
                        <p>童声配音</p>
                    </li>
                    <li>
                        <div>
                            <img src="~assets/img/icon-15.png">
                        </div>
                        <p>知识付费</p>
                    </li>
                </ul>
                <p class="btn">
                    <a href="/client/">
                        立即使用叮当
                    </a>
                </p>
            </div>
            
        </section>
        <section class="normal info-wrap">
            <div>
                <transition name="fade" mode="out-in">
                <div class="text" v-for="(say, index) in saies" :key="index" v-if="index === currentSayIndex">
                    <img src="~assets/img/mark-top-icon.png">
                    <img src="~assets/img/mark-bottom-icon.png">
                    <p> {{ say.content }} </p>
                    <p>----{{ say.auth }}</p>
                </div>
                </transition>
                <ul v-if="saies.length != 0">
                    <li v-for="(say, index) in saies" :key="index" @mouseover.stop.prevent="switchContent(index)">
                        <div>
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528777045825&di=8b1d1eeef012643e7f07b55a2acb829d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F014cc858cbabdfa801219c77116a63.jpg%401280w_1l_2o_100sh.jpg" >
                        </div>
                        <div>
                            <p>{{say.auth}}</p>
                            <p>{{ say.company }}</p>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </section>
        <section class="normal icons-wrap">
            <div>
                <h3>已有<strong>8000+</strong>企业信任叮当配</h3>
                <div class="img-wrap">
                    <img src="~assets/img/icons.jpg">
                </div>
                <p class="btn">
                    <a href="/client/">
                      立即使用叮当
                    </a>
                </p>
            </div>
            
        </section>
        <section class="normal icons-wrap">
            <div>
                <h3>联系我们，了解更多</h3>
                <div class="form-wrap">
                    <div>
                        <p>
                            <label>姓名</label>
                            <input type="text" v-model="name">
                        </p>
                        <p>
                            <label>公司</label>
                            <input type="text" v-model="company">
                        </p>
                    </div>
                    <div>
                        <p>
                            <label>工作邮箱</label>
                            <input type="text" v-model="email">
                        </p>
                        <p>
                            <label>手机号码</label>
                            <input type="text" v-model="phone">
                        </p>
                    </div>
                    <div>
                        <p class="area">
                            <textarea cols="100%" rows="6" placeholder="您的需求或您希望了解的内容" maxlength="200"  v-model="demand"></textarea>
                        </p>
                    </div>
                </div>
                <p class="btn" @click.stop="postDataForm">发送</p>
                <div class="line">
                    <img src="~assets/img/line.png">
                </div>
                <div class="adress-wrap">
                    <p>直接联系我们</p>
                    <p>
                        邮箱：zhangguobin@fang.com <br>
                        工作时间：周一至周五 10:00-19:00 <br>
                        地址：北京市朝阳区高碑店南岸一号义安门内45-108 <br>
                    </p>
                </div>
            </div>
            
        </section>
        <section class="float-window-wrap">
            <float-window></float-window>
        </section>
    </section>
</template>
<script>

import FloatWindow from '~/components/float-window/float-window'
import AppHeader from '~/components/app-header/app-header'
import TopTip from '~/components/top-tip/top-tip'
import { PostData } from '~/api/api'
export default {
  
  data() {
    return {
        navFlag: true,
        name: '',
        company: '',
        email: '',
        phone: '',
        demand: '',
        error: '',
        currentSayIndex: 0,
        saies: [{
            content: '给广大中小内容团队推荐一下这个实时响应配音工具SoundEMS ，如果你的团队看重用户体验又没有额外的预算去聘请多位主播，那么建议你先尝试一下这款叮当“主播，如同打车一样的声音速递，让获得音频如此简单1。',
            company: '北京诺听科技有限公司1',
            auth: '张楚汉1'
        },
        {
            content: '一般由主要信息、主要操作、次要信息、次要操作组成。一般由主要信息、主要操作、次要信息、次要操作组成。一般由主要信息、主要操作、次要信息、次要操作组成。主要信息和主要操作放在列表的左边，次要信息和次要操作放在列表的右边。2。',
            company: '北京诺听科技有限公司2',
            auth: '张楚汉2'
        },
        {
            content: '单个连续模块垂直排列，显示当前的内容、状态和可进行的操作一般由主要信息、主要操作、次要信息、次要操作组成。eg：联系人列表。当你需要一个 infinite scroll 列表时，请使用 ListView。规则3。',
            company: '北京诺听科技有限公司3',
            auth: '张楚汉3'
        },
        {
            content: '给广大中小内容团队推荐一下这个实时响应配音工具SoundEMS ，如果你的团队看重用户体验又没有额外的预算去聘请多位主播，那么建议你先尝试一下这款叮当“主播，如同打车一样的声音速递，让获得音频如此简单4。',
            company: '北京诺听科技有限公司4',
            auth: '张楚汉4'
        }]
    }
  },
  mounted() {
    //设置滚动
     window.addEventListener('scroll', () => {
        this.navFlag = document.documentElement.scrollTop > 100 ? false : true;
        if(!this.navFlag) {
          this.$refs.topTip && this.$refs.topTip.show()
        }
        else {
          this.$refs.topTip && this.$refs.topTip.hide()
        }
        
        
     });

  },
  methods: {
    switchContent(index) {
        this.currentSayIndex = index;
    },
    postDataForm() {
        if(this._checkForm()) return;
        PostData("/api/v1/client/account/myDemand", {
            name: this.name,
            company: this.company,
            email: this.company,
            phone: this.phone,
            demand: this.demand
        }).then(res => {

                this.$alert('发送成功!',{
                    type: 'success',
                    confirmButtonText: '确认'
                });
                //this.$message.error('错了哦，这是一条错误消息');
            }).catch(err => {
                this.$alert('失败!',{
                    type: 'error',
                    confirmButtonText: '确认'
                });
        })
    },
    _checkForm() {
        //校验表单
        const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!this.name) {
            this.error = "请填写姓名"
        }
        else if(!this.company) {
            this.error = "请填写公司名称";
        }
        else if(!this.email) {
            this.error = "请填写您的邮箱地址"
        }
        else if(!this.phone) {
            this.error = "请填写手机号码"
        }
        else if(!this.demand) {
            this.error = "请填写您的需求或您需要了解的内容"
        }
        else if(!reg.test(this.email)) {
            this.error = "请填写正确的邮箱地址"
        }
        else if(!regPhone.test(this.phone)) {
            this.error = "请填写正确的手机号"
        }
        else {
            this.error = ''
        }
        if(this.error) {
            this.$alert(this.error, {
                type: 'error',
                confirmButtonText: '确认'
            })
        }
        return this.error;
    }
},
  components: {
        FloatWindow,
        AppHeader,
        TopTip
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/variable";
.float-window-wrap {
    position: fixed;
    bottom: 100px;
    width: 60px;
    right: 10px;
}
.nav-wrap {
  width: 100%;
  height: 66px;
  background: #fff;
  color: #555;
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
section {
    nav {
        
        /deep/ .nuxt-link-exact-active {
            color: #f90;
        }
        /deep/ .nuxt-link-active {
            color: #f90;
        }
        /deep/ a {
            color: #fff;
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
    p {
        a {
            color: #fff;
        }
    }
    
    width: 100%;
}
section > div {
    width: 1170px;
    margin:  0 auto;
}
.normal:nth-of-type(2n) {
    background: #f8f8f8;
}
.banner {
    height: 900px;
    overflow: hidden;
    background: url('~assets/img/banner.jpg') center center no-repeat;
    background-color: #d7b35f;
}
.banner > div {
    color:  #fff;
    padding-top: 286px;
    padding-left: 126px;
}
.banner > div h2 { font-size: 50px; }
.banner > div p { font-size: 16px; line-height: 66px; margin-bottom: 30px; }
.banner > div .btn { display: block; width: 200px; height: 40px; text-align: center; line-height: 40px; font-size: 16px; background: #ff9900; color: #fff; cursor: pointer; }
.normal { padding-top: 88px; }
.icons-wrap h3 { font-size: 32px; text-align: center; letter-spacing: 16px; margin-bottom: 80px;  }
.icons-wrap {
    padding-bottom: 50px;
}
.icons-wrap h3 strong { color: #f64236; }
.icons-wrap ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 64px;

}
.icons-wrap ul li {
    flex:  0 0 234px;
    width: 234px;
    margin-bottom: 46px;
    text-align: center;
}
.icons-wrap li div { text-align: center; }
.icons-wrap li div img { padding-bottom: 26px; }
.icons-wrap li p {}
.icons-wrap .btn { width: 226px; height: 50px; line-height: 50px; background: #ff9900; color: #fff; text-align: center; margin:  0 auto; cursor: pointer; }
.btn a {
display: inline-block;
width: 100%;
height: 100%;
}

.info-wrap .text { width: 780px; font-size: 18px; line-height: 2; margin: 0 auto 60px; position: relative; }
.info-wrap .text > img { position: absolute; }
.info-wrap .text > img:first-of-type { left: -40px; }
.info-wrap .text > img:last-of-type { right: -40px; }
.info-wrap .text p:last-child { line-height: 1.5; text-align: right; }
.info-wrap ul { display: flex; padding-bottom: 100px; }
.info-wrap ul li { flex:  0 0 247px; width: 247px; margin-right: 60px;  display: flex; align-items: center; cursor: pointer; }
.info-wrap ul li:nth-child(4n) { margin-right: 0; }
.info-wrap li div { }
.info-wrap li div img { width: 100%; min-height: 100%; }
.info-wrap li div:first-child { flex:  0 0 64px; width: 64px; height: 64px; border-radius: 32px; overflow: hidden; margin-right: 10px; }
.info-wrap li div:last-child { flex: 1; }
.info-wrap li div p{ font-size: 14px; }
.info-wrap li div p:last-child { color: #666; margin-top: 10px; }
.form-wrap { width: 630px; margin:  0 auto; }
.form-wrap > div { display: flex; }
.form-wrap > div > p { flex: 0 0 1; width: 300px;  height: 34px; line-height: 34px; font-size: 14px; text-indent: 1em; color: #aeaeae; border: 1px solid #eaeaea; margin-right: 30px; display: flex; margin-bottom: 26px; }
.form-wrap > div > p:nth-child(2n), .form-wrap > div > p:last-child { margin-right: 0; }
.form-wrap .area { width: 100%; height: auto; padding-left: 1em; }
.form-wrap label {  flex: 0 0 5em; width: 4em; }
.form-wrap input {}
.form-wrap textarea { width: 100%; }
textarea::-webkit-input-placeholder { /* WebKit browsers */ 
color: #aeaeae; 
} 
textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #aeaeae; 
} 
textarea::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #aeaeae; 
} 
textarea:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #aeaeae; 
}
.line, .adress-wrap { width: 630px; margin:  0 auto; }
.line {
    height: 22px;
    overflow: hidden;
    margin-top: 50px;
    margin-bottom: 50px;
}
.line img {
    width: 100%;
    height: 100%;
}
.adress-wrap { display: flex; padding-bottom: 100px; }
.adress-wrap p:first-child {  flex: 0 0 156px; width: 156px; font-size: 22px; padding-top: 8px; }
.adress-wrap p:last-child { flex: 0 0 1; font-size: 14px; line-height: 2;}
footer { padding: 50px 0; background: #fff; border-top: 1px solid #f8f8f8; }
footer p { width: 100%; line-height: 1.8; text-align: center; font-size: 12px; color: #c6c6c6; }



</style>

