<template>
    <v-toolbar   class="pa-0 hidden-sm-and-down"   elevation="0" >
        <v-slide-group
                class="pa-0"
                multiple
        >
        <v-breadcrumbs :items="mStore.dir.dirNav">
            <template v-slot:divider class="pa-1">
                <v-icon>{{mStore.icon.mdiChevronRight}}</v-icon>
            </template>
            <template v-slot:item="{ item }">
                <v-btn class="text-capitalize" text
                       :to='{path:"/dir",query:{path:item.href}}'>
                    {{ item.text }}
                </v-btn>
            </template>
        </v-breadcrumbs>
        </v-slide-group>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>

    export default {
        name: "dirToolbar",
        data(){
            return{
                items: [
                    {
                        text: 'Dashboard',
                        href: 'breadcrumbs_dashboard',
                    },
                    {
                        text: 'Link 1',
                        href: 'breadcrumbs_link_1',
                    },
                    {
                        text: 'Link 2',
                        href: 'breadcrumbs_link_2',
                    },
                ],
            }
        }
    }
</script>

<style >

    /*.v-slide-group__next{*/
    /*    display: none;*/
    /*}*/
    .v-breadcrumbs li:nth-child(even) {
        padding: 0 6px;
    }
</style>