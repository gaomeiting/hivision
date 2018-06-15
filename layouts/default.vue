<template>
    <div>
        <nuxt />
        <app-footer></app-footer>
    </div>
</template>
<script>
import AppFooter from '~/components/app-footer/app-footer.vue'

export default {
    components: {AppFooter}
}
</script>
<style lang="scss">
body {
    min-height: 100vh;
}
body > div:first-child {
    min-height: 100vh;
    padding-bottom: 100px;
    position: relative;
}
footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
