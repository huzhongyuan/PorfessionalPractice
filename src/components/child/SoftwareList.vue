<template>
  <div>
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
            <div class="loveGameandAPPCcardRBox">
              <div class="loveGameandAPPCcardRs">{{ item.status }}</div>
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
      msg: "Welcome to Your Vue.js App",
      items: [],
      title: null
    };
  },
  methods: {
    enterDetail(item, index) {
      sessionStorage.setItem('appId',item.id);
      this.$emit("enterDetail", this.enterDetail);
    },
    checkMore() {
      this.$emit("checkMore", this.checkMore);
    },
    //探索中的推荐
    ExploreIndex(response) {
      let that = this;
      that.title = "我们最喜爱的app";
      let arr = response.data.slice(0, 6);
      console.log(arr);
      for (let i in arr) {
        that.items.push({
          id: arr[i].appId,
          src: arr[i].appIcon,
          title: arr[i].appName,
          des: arr[i].appWord,
          des: arr[i].appWord,
          status: "获取",
          isInPrograme: "APP内购买项目"
        });
      }
    },
    //探索所有
    ExploreAll(response) {
      let that = this;
      let arr = response.data;
      console.log(arr);
      for (let i in arr) {
        that.items.push({
          id: arr[i].appId,
          src: arr[i].appIcon,
          title: arr[i].appName,
          des: arr[i].appWord,
          des: arr[i].appWord,
          status: "获取",
          isInPrograme: "APP内购买项目"
        });
      }
    },
    //已安装app
    hasInstall (response) {
      let that = this;
      that.title = "已购买APP";
      let arr = response.data;
      console.log(arr);
      for (let i in arr) {
        that.items.push({
          id: arr[i].appId,
          src: arr[i].appIcon,
          title: arr[i].appName,
          des: arr[i].appWord,
          des: arr[i].appWord,
          status: "获取",
          isInPrograme: "APP内购买项目"
        });
      }
    },
    handleData() {
      let that = this;

      that.$axios
        .get(that.$url + "software")
        .then(function(response) {
          console.log(response);
          if(sessionStorage.getItem('LoadPage') == 'ExploreAll') {
            console.log(145214552)
            that.ExploreAll(response)
            //清空缓存
            sessionStorage.setItem('LoadPage' , '')
          }else if (that.pageMessage == "ExploreIndex") {
            console.log(12244)
            that.ExploreIndex(response);
            //console.log(localStorage.getItem('LoadPage'));
          } else if (that.pageMessage == 'hasInstalled') {
            console.log(1111)
            that.hasInstall(response);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    //console.log(11111);
      this.handleData();
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
  border-radius: 50%;
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
