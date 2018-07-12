<template>
<transition name="fade" mode="out-in">
	<div class="page">
		<div class="form-wrap">
			<sub-title title="提交样音"></sub-title>
			<part title="试音说明" paragraph="直接在手机上录制1分钟音频，将你擅长的风格都表现出来。如需发送更清晰的音频样音，请发邮箱到XXX，发送时请注明你的姓名、手机号。"></part>
			<submit-btns :config="config"></submit-btns>
			<part title="重要提示" paragraph="Mint UI 包含丰富的 CSS 和 JS 组件，能够满足日常的移动端开发需要。通过它，可以快速构建出风格统一的页面，提升开发效率。"></part>
			
		</div>
	</div>
</transition>
</template>
<script type="text/ecmascript-6">
import SubTitle from '~/components/htitle/htitle'
import Part from '~/components/part/part'
import SubmitBtns from '~/components/submit-dome-btns/submit-dome-btns'
/*import { wxconfig } from '~/assets/js/mixin'*/
	export default {
		/*mixins: [wxconfig],*/
		data() {
			return {
				
			}
		},
		
		components: {
			SubTitle,
			Part,
			SubmitBtns
		}
	}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
@import "~assets/scss/mixin";
.page {
	padding: 16px;
}
.form-wrap {
	border: 1px solid $color-text-ll;
	background: $color-background-d;
	padding: 10px 16px 30px;
	border-radius: 5px;
	
	
}

</style>