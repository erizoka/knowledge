import Vue from "vue";
import VueMq from 'vue-mq'

Vue.use(VueMq, {
    brekpoints: {
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})