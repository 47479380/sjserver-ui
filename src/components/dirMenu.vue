<template>

    <v-menu
            transition="slide-y-transition"
            v-model="menu.showMenu"
            :position-x="menu.x"
            :position-y="menu.y"
            absolute
            offset-y
    >

        <v-list subheader dense v-if="menu.info.isDir">
            <v-list-item  @click="goTo(menu.info)">
                <v-list-item-icon>
                    <v-icon>{{mStore.icon.mdiCallMissed}}</v-icon>
                </v-list-item-icon>
                    <v-list-item-title >进入</v-list-item-title>
            </v-list-item>
            <v-list-item @click="rename(menu.info)">
                <v-list-item-icon>
                    <v-icon>{{mStore.icon.mdiRenameBox}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title >重命名</v-list-item-title>
            </v-list-item>

            <v-list-item @click="Delete(menu.info)">
                <v-list-item-icon>
                    <v-icon>{{mStore.icon.mdiDelete}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title >删除</v-list-item-title>
            </v-list-item>
        </v-list>
        <v-list subheader dense v-else>
            <v-list-item @click="download(menu.info)">
                <v-list-item-icon>
                    <v-icon>{{mStore.icon.mdiDownload}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title >下载</v-list-item-title>
            </v-list-item>
            <v-list-item @click="rename(menu.info)">
                <v-list-item-icon>
                    <v-icon>{{mStore.icon.mdiRenameBox}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title >重命名</v-list-item-title>
            </v-list-item>

            <v-list-item @click="Delete(menu.info)">
                <v-list-item-icon>
                    <v-icon>{{mStore.icon.mdiDelete}}</v-icon>
                </v-list-item-icon>
                <v-list-item-title >删除</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    import {dirMenuFun} from "../mixins";

    export default {
        name: "dirMenu",
        props: ['menu'],
        mixins:[dirMenuFun],
        data: () => ({
        }),
        methods:{

        }
    }
</script>

<style scoped>

</style>