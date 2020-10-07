<template>
   <v-container fluid>

       <v-row >
           <v-col lg="3" md="4" sm="6" cols="12"  >



               <v-hover
                       v-slot:default="{ hover }"
               >

               <v-card
                        to="/dir/"
                       v-ripple="{class: 'primary--text'}"
                       :elevation="hover ? 4 : 2"
                       dark
                       :color="hover?'#EEEEEE':'#F5F5F5'"
                       class="text-center py-8 transition-ease-in-out ">

                   <div>
                       <v-avatar color="primary" size="120">
                       <v-icon size="80" >{{mStore.icon.mdiFolder}}</v-icon>
                       </v-avatar>
                   </div>
                   <v-card-text class="subtitle-1 font-weight-light
" style="color: #2196F3;user-select: none">文件列表</v-card-text>
               </v-card>
               </v-hover>
           </v-col>

           <v-col  lg="3" md="4" sm="6" cols="12" >
               <v-hover
                       v-slot:default="{ hover }"
               >
               <v-card
                          @click="showNoDevDialog()"
                       v-ripple="{class: 'primary--text'}"
                       :elevation="hover ? 4 : 2"
                       dark
                       :color="hover?'#EEEEEE':'#F5F5F5'"
                       class="text-center py-8 transition-ease-in-out">

                   <div>
                       <v-avatar color="primary" size="120">
                       <v-icon size="80" >{{mStore.icon.mdiContentCopy}}</v-icon>
                       </v-avatar>
                   </div>
                   <v-card-text class="subtitle-1"  style="color: #2196F3;user-select: none">剪切板</v-card-text>
               </v-card>
               </v-hover>
           </v-col>
           <v-col  lg="3" md="4" sm="6" cols="12" >
               <v-hover
                       v-slot:default="{ hover }"
               >
               <v-card
                       @click="showNoDevDialog()"
                       v-ripple="{class: 'primary--text'}"
                       :elevation="hover ? 4 : 2"
                       dark
                       :color="hover?'#EEEEEE':'#F5F5F5'"
                       class="text-center py-8 transition-ease-in-out">

                   <div>
                       <v-avatar color="primary" size="120">
                       <v-icon size="80" >{{mStore.icon.mdiPackageVariant}}</v-icon>
                       </v-avatar>
                   </div>
                   <v-card-text class="subtitle-1"  style="color: #2196F3;user-select: none">软件共享</v-card-text>
               </v-card>
               </v-hover>
           </v-col>
           <v-col  lg="3" md="4" sm="6" cols="12" >
               <v-hover
                       v-slot:default="{ hover }"
               >
                   <v-card
                           @click="showNoDevDialog()"
                           v-ripple="{class: 'primary--text'}"
                           :elevation="hover ? 4 : 2"
                           dark
                           :color="hover?'#EEEEEE':'#F5F5F5'"
                           class="text-center py-8 transition-ease-in-out">

                       <div>
                           <v-avatar color="primary" size="120">
                               <v-icon size="80" >{{mStore.icon.mdiCamera}}</v-icon>
                           </v-avatar>
                       </div>
                       <v-card-text class="subtitle-1"  style="color: #2196F3;user-select: none">手机截图</v-card-text>
                   </v-card>
               </v-hover>
           </v-col>
           <v-col  lg="3" md="4" sm="6" cols="12" >
               <v-hover
                       v-slot:default="{ hover }"
               >
               <v-card
                     href="https://jq.qq.com/?_wv=1027&k=7iqfrIF8"
                       v-ripple="{class: 'primary--text'}"
                       :elevation="hover ? 4 : 2"
                       dark
                       :color="hover?'#EEEEEE':'#F5F5F5'"
                       class="text-center py-8 transition-ease-in-out">

                   <div>
                       <v-avatar color="primary" size="120">
                       <v-icon size="80" >{{mStore.icon.mdiAccountGroup}}</v-icon>
                       </v-avatar>
                   </div>
                   <v-card-text class="subtitle-1"  style="color: #2196F3;user-select: none">交流群</v-card-text>
               </v-card>
               </v-hover>
           </v-col>


       </v-row>

   </v-container>

</template>

<script>
    export default {
        name: "Home",
        methods:{
            showNoDevDialog(){
                this.$dialog.confirm({
                    text:"尚未开发",
                    actions:{ true: {
                            text: '确定',
                            color: 'primary'
                        }}
                })
            }
        }
    }
</script>

<style scoped>

</style>