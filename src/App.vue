<template>
	<div id="app" class="app">
		
		<!-- <keep-alive> -->
		 <router-view></router-view>
		<!-- </keep-alive> -->
		
	</div>
</template>

<script>
import {
    wxShare,
    commonWxConfig
} from 'assets/js/mixin'

export default {
	mixins: [wxShare, commonWxConfig],
	created() {
		this._getShareConfig()
		//this._getCurrentInfoWx()
	}
}
</script>

<style lang="scss" scoped>

.app {
	min-height: 100vh;
}
</style>
