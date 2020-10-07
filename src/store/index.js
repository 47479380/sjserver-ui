import Vue from "vue"
import {
    mdiChevronRight,
    mdiPlus,
    mdiChevronUp,
    mdiFileUpload,
    mdiCloudUpload,
    mdiFolderUpload,
    mdiFolderPlus,
    mdiFile,
    mdiFolder,
    mdiClose,
    mdiContentCopy,
    mdiPackageVariant,
    mdiAccountGroup,
    mdiCamera,
    mdiDownload,
    mdiCallMissed,
    mdiRenameBox,
    mdiDelete,
    mdiHome
} from "@mdi/js"
// let baseUrl="http://127.0.0.1:8090";
let baseUrl="";
let store = {
    drawer: null,
    appTitle: "手机服务器",
    icon: {
        mdiHome,
        mdiDelete,
        mdiRenameBox,
        mdiCallMissed,
        mdiDownload,
        mdiClose,
        mdiChevronRight,
        mdiPlus,
        mdiChevronUp,
        mdiFileUpload,
        mdiFolderUpload,
        mdiFolderPlus,
        mdiFile, mdiFolder,
        mdiCloudUpload,
        mdiContentCopy,
        mdiPackageVariant,
        mdiAccountGroup,
        mdiCamera
    },
    dir:{
        api: {

            dir: `${baseUrl}/list`,
            delete: `${baseUrl}/delete`,
            create: `${baseUrl}/create`,
            upload: `${baseUrl}/upload`,
            download: `${baseUrl}/download`,
            rename: `${baseUrl}/rename`,
            uploadCheck: `${baseUrl}/uploadcheck`,
        },
        dirNav: [{
            text: "根目录",
            href: ""
        }],
        updateNavPath: function (path) {

            let dirNav = [];
            let href = "";
            dirNav.push({
                text: "根目录",
                href: href
            })
            if (path===undefined)return;
            path.split("/").forEach((v) => {

               if (v==="")return;
                href=(href + "/" + v)
                dirNav.push({
                    text: v,
                    href
                })
            })
            this.dirNav = dirNav;
        },
        renderSize: function (filesize) {
            if (null === filesize || filesize === ''||filesize===0) {
                return "0 Bytes";
            }
            let unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            let index = 0;
            let srcsize = parseFloat(filesize);
            index = Math.floor(Math.log(srcsize) / Math.log(1024));
            let size = srcsize / Math.pow(1024, index);
            size = size.toFixed(2);//保留的小数位数
            return size + unitArr[index];
        },
        listData:[]
    },
    uploadDialog:false,

}
Vue.mixin({
    data: () => {
        return {
            mStore: store
        }
    }
})
