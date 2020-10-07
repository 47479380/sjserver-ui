<template>
    <div>
<!--        <dir-loding></dir-loding>-->
    <dir-toolbar></dir-toolbar>
    <upload-dialog></upload-dialog>
        <v-lazy
                v-model="aa"
                :options="{
          threshold: .5
           }"
                min-height="200"
                transition="fade-transition"
        >

        <v-list subheader  dense>
            <v-divider></v-divider>


                <template v-for="(item,index) in mStore.dir.listData">

                    <v-list-item color="primary" :key="item.name" @contextmenu="showMenu(index,$event) " @click="dirClick(index)">
                        <v-list-item-icon>
                            <v-icon large v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.name"></v-list-item-title>
                            <v-list-item-subtitle style="color: inherit"><span style="color: inherit">{{item.date}}</span><span class="ml-4" >{{item.isDir?"":mStore.dir.renderSize(item.size)}}</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                    <v-divider
                            :key="index"
                    ></v-divider>
                </template>
        </v-list>
        </v-lazy>
        <dir-menu :menu="dirMenu"></dir-menu>
        <v-overlay  :value="overlay"></v-overlay>
        <dir-fab-btn></dir-fab-btn>
    </div>
</template>

<script>
    import DirMenu from "../components/dirMenu";
    import DirToolbar from "../components/dirToolbar";
    import DirFabBtn from "../components/dirFabBtn";
    import {dirMenuFun} from "../mixins";
    import UploadDialog from "../components/UploadDialog";

    export default {
        name: "directory",
        components: {UploadDialog, DirFabBtn, DirToolbar, DirMenu},
        mixins:[dirMenuFun],
        data: () => ({
            aa:true,
            overlay:false,
            index:0,
            dirMenu: {
                showMenu: false,
                x: 0,
                y: 0,
                info: {}
            },

        }),
        methods: {
            showMenu(index, e) {
                e.preventDefault()
                if (!this.dirMenu.showMenu){
                    this.dirMenu.x = e.clientX
                    this.dirMenu.y = e.clientY
                    this.dirMenu.info = this.mStore.dir.listData[index]
                    this.$nextTick(() => {
                        this.dirMenu.showMenu = true
                    })

                }
            },

            dirClick(index) {
                if (this.mStore.dir.listData[index].isDir) {
                    this.goTo(this.mStore.dir.listData[index])
                } else {
                    this.download(this.mStore.dir.listData[index])
                }
            },
            getDir(path){
                let directory=[];
               this.$http.get(this.mStore.dir.api.dir,{
                    params:{
                        path:path
                    }
                }).then(res=>{
                   res.data.forEach((v)=>{
                       directory.push({
                         icon:v.isDir?this.mStore.icon.mdiFolder:this.mStore.icon.mdiFile,
                       name:v.name,
                       date:v.date,
                       size:v.size,
                       isDir:v.isDir,
                       absolutePath:v.absolutePath
                     })

                   })
                   this.mStore.dir.listData=directory
               })
            }
        },
        created() {
            let path=this.$route.query.path
            this.getDir(path)
            this.mStore.dir.updateNavPath(path)
        },
        beforeRouteUpdate (to, from, next) {
            let path=to.query.path
            this.getDir(path)
            this.mStore.dir.updateNavPath(path)
            next()
        },
    }
</script>

<style scoped>

</style>