import qs from "qs";
const dirMenuFun = {
    methods: {
        goTo(dir) {
            let path=this.$route.query.path;
            console.log(path);
            this.$router.push({
                path:"/dir",
                query:{
                    path:`${path}/${dir.name}`
                }
                // path: `/dir/${this.$route.params.pathMatch===undefined?"":this.$route.params.pathMatch}/${dir.name}`,

            })
        },
        download(dir) {
            this.$dialog.confirm({
                title: "是否下载",
                text: dir.name,

            }).then((res) => {
                if (res) {
                    let link = document.createElement('a');
                //设置下载的文件名
                    link.download = dir.name;
                    link.tagget = "_blank";
                    link.style.display = 'none';
                 //设置下载路径
                    link.href = encodeURI(`${this.mStore.dir.api.download}?path=${this.$route.query.path}/${dir.name}`);
                   //触发点击
                    document.body.appendChild(link);
                    link.click();
                  //移除节点
                    document.body.removeChild(link);
                    // window.location.href = `${this.mStore.dir.api.download}?path=${this.$route.params.pathMatch}/${dir.name}`
                }
            })
        },
        Delete: function (dir) {

            this.$dialog.confirm({
                title: "是否删除",
                text: dir.isDir ? `删除"${dir.name}"和它里面的内容?` : `删除"${dir.name}"?`,

            }).then((res) => {
                if (res) {
                    this.$http.delete(this.mStore.dir.api.delete, {
                        params: {
                            path:this.$route.query.path + "/" + dir.name,
                        }
                    }).then(res => {
                        if (res.data.status === 1) {
                            let index = this.mStore.dir.listData.indexOf(dir);
                            this.mStore.dir.listData.splice(index, 1)
                            this.$dialog.notify.success(res.data.msg)
                        } else {
                            this.$dialog.notify.error(res.data.msg)
                        }


                    })
                }
            })
        },
        create: function (name) {
            this.$http.post(this.mStore.dir.api.create, qs.stringify({
                path: this.$route.query.path,
                name
            }),).then(res => {

                if (res.data.status === 1) {
                    this.mStore.dir.listData.push({
                            icon: res.data.data.isDir ? this.mStore.icon.mdiFolder : this.mStore.icon.mdiFile,
                            name: res.data.data.name,
                            date: res.data.data.date,
                            size: res.data.data.size,
                            isDir: res.data.data.isDir,
                            absolutePath: res.data.data.absolutePath
                        }
                    )
                    this.$dialog.notify.success(res.data.msg)
                } else {
                    this.$dialog.notify.error(res.data.msg)
                }


            })
        },
        rename: function (dir) {

            this.$dialog.prompt({
                title: "重命名" + dir.name,
                text: "新名称",
                showClose: false,
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
            }).then(res => {
                if (res)
                    this.$http.get(this.mStore.dir.api.rename, {
                        params: {
                            path: this.$route.query.path,
                            name: dir.name,
                            newName:res
                        }
                    }).then(res => {
                        if (res.data.status===1){
                            let listData=this.mStore.dir.listData;
                            listData.splice(listData.indexOf(dir),1,{
                                icon: res.data.data.isDir ? this.mStore.icon.mdiFolder : this.mStore.icon.mdiFile,
                                name: res.data.data.name,
                                date: res.data.data.date,
                                size: res.data.data.size,
                                isDir: res.data.data.isDir,
                                absolutePath: res.data.data.absolutePath
                            })
                            this.$dialog.notify.success(res.data.msg)
                        }else {
                            this.$dialog.notify.error(res.data.msg)
                        }
                    })
            })

        },
        refresh() {

        }
    },

}
export {
    dirMenuFun
}