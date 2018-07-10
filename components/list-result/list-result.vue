<template>
  <div>
    <div v-if="list.length > 0">
      <loading v-if="hasMore"></loading>
      <p v-else>没有更多了</p>
    </div>
    <div v-else class="pre-wrap">
      <no-result v-if="!loading"></no-result>
      <loading v-else></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import NoResult from '~/components/no-result/no-result';
import Loading from '~/components/loading/loading';
  export default {
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: true
      },
      hasMore: {
        type: Boolean,
        default: true
      }
    },
    components: {
      NoResult,
      Loading
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~assets/scss/variable";
  @import "~assets/scss/mixin";


</style>