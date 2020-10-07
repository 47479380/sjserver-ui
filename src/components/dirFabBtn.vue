<template>
    <v-speed-dial
            fixed
            v-model="fab"
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :transition="transition"
    >
        <template v-slot:activator>
            <v-btn
                    v-model="fab"
                    color="blue darken-2"
                    dark
                    fab
            >
                <v-icon v-if="!fab">{{mStore.icon.mdiPlus}}</v-icon>
                <v-icon v-else>{{mStore.icon.mdiChevronUp}}</v-icon>
            </v-btn>
        </template>
        <v-tooltip  :open-on-click="true" left >
            新建目录
            <template v-slot:activator="{ on, attrs }">
        <v-btn
                @click="openCreateDialog()"
                fab
                dark
          color="blue "
                v-bind="attrs" v-on="on"
        >
            <v-icon>{{mStore.icon.mdiFolderPlus}}</v-icon>
        </v-btn>
            </template>
        </v-tooltip>
        <v-tooltip  :open-on-click="true" left >
            文件上传
            <template v-slot:activator="{ on, attrs }">
        <v-btn
                @click.stop="openUploadDialog()"
                dark
                fab
                color="pink "
                v-bind="attrs" v-on="on"
        >
            <v-icon>{{mStore.icon.mdiFileUpload}}</v-icon>
        </v-btn>
            </template>
        </v-tooltip>
    </v-speed-dial>
</template>

<script>
    import {dirMenuFun} from "../mixins";

    export default {
        name: "dirFabBtn",
        mixins:[dirMenuFun],
        data: () => ({
            showTip:true,
            direction: 'top',
            fab: false,
            fling: false,
            hover: true,
            tabs: null,
            top: false,
            right: true,
            bottom: true,
            left: false,
            transition: 'slide-y-reverse-transition',
        }),
        methods:{
            openCreateDialog(){
                this.$dialog.prompt({
                    title:"创建目录",
                    text:"目录名称",
                    showClose:false,
                    actions: {
                        false: {
                            text: "取消",
                            color: 'primary'
                        },
                        true: {
                            text: "创建",
                            color: 'primary'
                        },
                    }
                }).then(res=>{
                    if (res)
                    this.create(res)
                })

            },
            openUploadDialog(){
                this.mStore.uploadDialog=true;

            },

        }
        ,
        computed: {
            activeFab () {
                switch (this.tabs) {
                    case 'one': return { class: 'purple', icon: 'account_circle' }
                    case 'two': return { class: 'red', icon: 'edit' }
                    case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
                    default: return {}
                }
            },
        },

        watch: {
            top (val) {
                this.bottom = !val
            },
            right (val) {
                this.left = !val
            },
            bottom (val) {
                this.top = !val
            },
            left (val) {
                this.right = !val
            },
        },
    }
</script>

<style scoped>

</style>