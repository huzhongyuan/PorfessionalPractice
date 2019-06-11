<template>
  <div>
    <!-- {{ this.$store.state.LoadPage }} -->
    <!-- 最爱的游戏和APP -->
    <div class="loveGameandAPP">
      <div class="loveGameandAPPtitleBox" v-if="title">
        <div class="loveGameandAPPtitleName">{{ title }}</div>
        <div class="checkMore" @click="checkMore" v-if="title != '已购买APP'">查看全部</div>
      </div>
      <div class="loveGameandAPPContent">
        <div
          class="loveGameandAPPCcard"
          v-for="(item , index) in items"
          v-bind:key="index"
          @click="enterDetail(item,index)"
        >
          <div class="loveGameandAPPCcardL">
            <img :src="item.src" alt>
          </div>
          <div class="loveGameandAPPCcardR">
            <div class="loveGameandAPPCcardRT overflow">{{ item.title }}</div>
            <div class="loveGameandAPPCcardRc overflow">{{ item.des }}</div>
            <div class="loveGameandAPPCcardRBox" @click.stop>
              <div class="loveGameandAPPCcardRs" @click="getApp(index)">{{ item.status }}</div>
              <div class="loveGameandAPPCcardRi" v-if="item.isInPrograme">{{ item.isInPrograme }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "SoftwareList",
  props: ["pageMessage"],
  data() {
    return {
      msg: "",
      items: [],
      title: null
    };
  },
  methods: {
    //app详情
    enterDetail(item, index) {
      console.log(item);
      this.$store.commit("changeAppId", item.id);
      console.log("app详情" + this.$store.state.appId);
      this.$emit("enterDetail", this.enterDetail);
    },
    //查看更多
    checkMore() {
      this.$emit("checkMore", this.checkMore);
    },
    //获取APP
    getApp(index) {
      let that = this;
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [
          h(
            "span",
            null,
            "此软降将花费" + this.items[index].appCost + "元, 是否确认"
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            if (
              that.$store.state.userInfo.account >= that.items[index].appCost
            ) {
              that.$axios
                .post(
                  that.$url + "user/reduce",
                  that.$qs.stringify({
                    userId: sessionStorage.getItem("userId"),
                    account: that.items[index].appCost
                  })
                )
                .then(res => {
                  console.log(res);
                  if (res.data.code == 1) {
                    this.$store.commit("changeAccount", res.data.data);
                    window.open(that.items[index].appDownLoad);
                    done();
                    //调用下载成功接口
                    let appid = that.items[index].id;
                    //下载成功
                    that.$axios
                      .post(
                        that.$url + "user/download",
                        that.$qs.stringify({
                          userId: sessionStorage.getItem("userId"),
                          appId: appid
                        })
                      )
                      .then(res => {
                        if (res.data.code == 1) {
                          console.log("success!");
                        }
                      });
                  }
                });
            } else {
              const h = this.$createElement;
              this.$notify({
                title: "标题名称",
                message: h("i", { style: "color: teal" }, "请先充值")
              });
            }
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: "success",
          message: "购买成功！"
        });
      });
    },
    //探索中的推荐
    ExploreIndex(response) {
      let that = this;
      that.title = "我们最喜爱的app";
      let arr = response.data.slice(0, 6);
      for (let i in arr) {
        that.items.push({
          id: arr[i].appId,
          src: arr[i].appIcon,
          title: arr[i].appName,
          appDownLoad: arr[i].appDownLoad,
          des: arr[i].appWord,
          appCost: arr[i].appCost,
          status: "获取",
          isInPrograme: "APP内购买项目"
        });
      }
    },
    //探索所有
    ExploreAll(response) {
      let that = this;
      let arr = response.data;
      console.log("~~~~~~", arr);
      for (let i in arr) {
        that.items.push({
          id: arr[i].appId,
          src: arr[i].appIcon,
          title: arr[i].appName,
          des: arr[i].appWord,
          appDownLoad: arr[i].appDownLoad,
          appCost: arr[i].appCost,
          status: "获取",
          isInPrograme: "APP内购买项目"
        });
      }
    },
    //已安装app
    hasInstall(response) {
      let that = this;
      that.title = "已购买APP";
      let arr = response;
      console.log(arr);
      for (let i in arr) {
        that.items.push({
          id: arr[i].appId,
          src: arr[i].appIcon,
          title: arr[i].appName,
          appDownLoad: arr[i].appDownLoad,
          des: arr[i].appWord,
          appCost: arr[i].appCost,
          status: "获取",
          isInPrograme: "APP内购买项目"
        });
      }
    },

    excuseType(api) {
      let that = this;
      that.$axios
        .get(that.$url + "AppList" + api)
        .then(function(response) {
          if (that.$store.state.LoadPage == "ExploreAll") {
            that.ExploreAll(response.data);
          } else if (that.$store.state.LoadPage == "ExploreIndex") {
            that.ExploreIndex(response.data);
          } else {
            that.ExploreAll(response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    excuseInstall() {
      let that = this;
      that.$axios
        .get(that.$url + "users/" + sessionStorage.getItem("userId"))
        .then(function(response) {
          that.hasInstall(response.data.data.hasInstalled);
        })
        .catch(function(error) {
        });
    },
    handleData() {
      let that = this;

      //判断具体调用的软件类型
      let api = "";
      console.log(that.$store.state.LoadPage);
      if (that.$store.state.LoadPage == "ExploreAll") {
        that.excuseType(api);
      } else if (that.$store.state.LoadPage == "ExploreIndex") {
        that.excuseType(api);
      } else if (that.$store.state.LoadPage == "hasInstalled") {
        that.excuseInstall();
      } else if (that.$store.state.LoadPage == "work") {
        api = "/work";
        console.log("work");
        that.excuseType(api);
      } else if (that.$store.state.LoadPage == "game") {
        console.log("game");
        api = "/game";
        that.excuseType(api);
      } else if (that.$store.state.LoadPage == "develop") {
        api = "/develop";
        that.excuseType(api);
      } else if (that.$store.state.LoadPage == "av") {
        api = "/av";
        that.excuseType(api);
      } else if (that.$store.state.LoadPage == "life") {
        api = "/life";
        that.excuseType(api);
      }
    }
  },
  mounted() {
    console.log(11111);
    this.handleData();
  },
  watch: {
    pageMessage(newVal, OldVal) {
      this.items = [];
      this.handleData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 最喜爱的App和游戏模块 */
.loveGameandAPP {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.checkMore {
  color: #1878ef;
  cursor: pointer;
}
.loveGameandAPPtitleBox {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  position: relative;
  width: 100%;
}
.loveGameandAPPtitleName {
  font-size: 20px;
}
.loveGameandAPPContent {
  position: relative;
  height: 100%;
  width: 100%;
  float: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.loveGameandAPPCcard {
  cursor: pointer;
  display: flex;
  width: 32%;
  height: 120px;
  margin-top: 20px;
  margin-right: 1%;
}
.loveGameandAPPCcardL {
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
}
.loveGameandAPPCcardL img {
  width: 70%;
  /* border-radius: 50%; */
}
.loveGameandAPPCcardR {
  display: flex;
  justify-content: center;
  width: 70%;
  flex-direction: column;
}
.loveGameandAPPCcardR > div {
  margin-left: 10px;
  width: 100%;
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.loveGameandAPPCcardRT {
  /* margin-top: 10px; */
}
.loveGameandAPPCcardRc {
  color: #cccccc;
  font-size: 13px;
}
.loveGameandAPPCcardRBox {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
}
.loveGameandAPPCcardRs {
  width: 20%;
  flex: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 3px;
  background-color: #f2f0f7;
  text-align: center;
  border-radius: 10%;
  color: #137af8;
  cursor: pointer;
}

.loveGameandAPPCcardRi {
  font-size: 10px;
  margin-left: 5%;
  color: #cccccc;
}
</style>
