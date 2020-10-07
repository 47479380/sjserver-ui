<template>
    <div class="text-center">
        <v-dialog
                eager
                v-model="mStore.uploadDialog"
                scrollable
                max-width="800"
        >
            <v-card>
                <v-toolbar
                        flat
                        color="primary"
                        dark
                >
                    <v-toolbar-title>文件上传</v-toolbar-title>
                    <v-spacer></v-spacer>
<!--                    <v-btn  >-->
<!--                   选择文件-->
<!--                    </v-btn>-->
                    <v-btn @click="mStore.uploadDialog=false" icon>
                        <v-icon>{{mStore.icon.mdiClose}}</v-icon>
                    </v-btn>
                </v-toolbar>



                <div v-if="uploaded.length===0"  class="file-upload d-flex justify-center align-center " style="overflow: auto;max-height: 800px;min-height: 320px">
                    <div class="text-center" style="pointer-events: none">
                        <v-icon size="80">{{mStore.icon.mdiCloudUpload}}</v-icon>
                        <div class="body-1 font-weight-light">拖拽或者点击此处上传文件</div>
                    </div>
                </div>
               <v-container   v-else  style="overflow: auto;max-height: 800px;min-height: 320px">
           <v-row class="px-4" >
                      <v-list width="100%" outlined class="pa-0 file-upload">



                          <template v-for="(item,index) in uploaded">

                              <v-list-item class="item" color="primary" :key="item.uuid"  >
                                  <v-list-item-icon>
                                      <v-icon large v-text="mStore.icon.mdiFile"></v-icon>
                                  </v-list-item-icon>

                                  <v-list-item-content>
                                      <v-list-item-title v-text="item.filename"></v-list-item-title>
                                      <v-list-item-subtitle style="color: inherit">{{mStore.dir.renderSize(item.total)}}
                                      </v-list-item-subtitle>
                                      <v-list-item-title>
                                          <v-progress-linear :value="item.progress"></v-progress-linear>
                                      </v-list-item-title>
                                  </v-list-item-content>

                              </v-list-item>
                              <v-divider
                                      v-if="uploaded.length>1"
                                      :key="index"
                              ></v-divider>
                          </template>
                      </v-list>
                  </v-row>

                </v-container>


            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Dropzone from "dropzone"

    export default {
        name: "UploadDialog",
        data() {
            return {
                uploaded:[],
                dropzone:null
            }
        },
        methods: {
            onOpen() {
            },
            // uploadCheck(file){
            //
            // }
        },

        mounted() {
            let $this=this;

            let path=this.$route.query.path

            Dropzone.autoDiscover=false
            // TODO 修复dropzone多次实例化问题 待测试
            if (this.dropzone===null){
                this.dropzone = new Dropzone(".file-upload", {
                    url: this.mStore.dir.api.upload,
                    paramName:"file",
                    previewTemplate:false,
                    maxFilesize:10000,
                    addedfile:function (file) {
                        let uploadItem=file.upload;
                        $this.uploaded.push(uploadItem)

                    },
                    uploadprogress: function(file, progress) {
                        $this.uploaded.forEach(v=>{
                            if (v.uuid===file.uuid){
                                v.progress=progress;
                            }
                        })
                    }

                });
            }

            this.dropzone.on("success",(_,data)=>{
              if (data.status===1){
                  $this.$dialog.notify.success(data.msg)
                  $this.mStore.dir.listData.push({
                      icon: data.data.isDir ? this.mStore.icon.mdiFolder : this.mStore.icon.mdiFile,
                      name: data.data.name,
                      date: data.data.date,
                      size: data.data.size,
                      isDir: data.data.isDir,
                      absolutePath: data.data.absolutePath
                  })
              }else {
                  $this.$dialog.notify.error(data.msg)
              }
            })
            this.dropzone.on("sending",function (file,request){
                $this.$http.get($this.mStore.dir.api.uploadCheck,{
                    params:{
                        path:path,
                        name:file.name
                    }
                }).then(res=>{
                    if (res.data.status===-1){
                        this.cancelUpload(file)
                        $this.$dialog.notify.error(res.data.msg)
                    }
                })
              request.setRequestHeader("path",encodeURI(path));
            })


        }
    }
</script>

<style scoped>

</style>