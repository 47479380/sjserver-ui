<template>
    <v-navigation-drawer
            v-model="mStore.drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
    >
        <v-list  dense>
            <template v-for="item in items">
                <v-list-item
                        color="primary"
                        :to="item.to"
                        :key="item.text"
                >
                    <v-list-item-icon>
                      <v-icon> {{item.icon}}</v-icon>
                    </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
        <v-divider></v-divider>
        <v-list  dense>
            <template v-for="item in standard_Folder_items">
                <v-list-item
                        color="primary"
                        :to="item.to"
                        :key="item.text"
                >
                    <v-list-item-icon>
                      <v-icon> {{item.icon}}</v-icon>
                    </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>

</template>

<script>

    export default {
        name: "drawer",
        data(){
            return{
                drawer: null,
                items:null,
                standard_Folder_items:null
            }
        },
        created() {
            let icon=this.mStore.icon;
            this.items=[
                {icon: icon.mdiHome,text: "首页",to:"/"},
                {icon:icon.mdiFolder,text:"目录列表" ,to: "/dir" },
               ]
            this.standard_Folder_items=[
                // { icon:icon.mdiCamera, text: '图片', to: "/aa" },
                // { icon: icon.mdiDownload, text: '下载' ,to: "/bb"},
            ]
        }
    }
</script>

<style scoped>

</style>