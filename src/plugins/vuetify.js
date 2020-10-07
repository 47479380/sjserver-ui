import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(Vuetify);

let vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
});

Vue.use(VuetifyDialog, {
    context: {
        vuetify
    },
    warning: {
        actions: {
            false: {text:'取消',   color: 'primary'},
            true: {
                text: '确定',
                color: 'primary'
            }
        },
        icon: false, // to disable icon just put false
        width: 500,
        showClose:false
    },
    confirm: {
        actions: {
            false: {text:'取消',   color: 'primary'},
            true: {
                text: '确定',
                color: 'primary'
            }
        },
        icon: false, // to disable icon just put false
        width: 500,
        showClose:false
    },
})



export default vuetify;
