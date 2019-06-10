<template>
  <div>
    <!-- 走马灯 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in Carouselsrc" :key="index">
        <!-- <h3>{{ item }}</h3> -->
        <!-- <img src="./assets/images/banner3.jpg" /> -->
        <img :src="item" class="bannerImg">
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐 -->
    <div class="recommend">
      <div
        class="RchildOne"
        v-for="(item , index) in recommend"
        v-bind:key="index"
        @click="enterDetail(item,index)"
      >
        <div class="recommendLB">
          <div class="recommendLB1"> {{ item.appWord }} </div>
          <div class="recommendLB2">{{ item.appName }}</div>
          <div
            class="recommendLB3"
          >{{ item.appDetail }}</div>
        </div>
        <div class="recommendRB">
          <img :src="item.src" alt>
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <SoftwareList v-on:enterDetail="enterDetail" v-on:checkMore="checkMore" ></SoftwareList>
  </div>
</template>

<script>
import SoftwareList from "./child/SoftwareList";

export default {
  name: "Explore",
  components: {
    SoftwareList
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      Carouselsrc: [],
      recommend: []
    };
  },
  methods: {
    //转到软件详情
    enterDetail(item, index) {
      console.log(item);
      //sessionStorage.setItem('appId',item.appId)
      //this.$store.commit('changeAppId', item.appId);
      this.$emit("toSoftwareInfo", this.toSoftwareInfo);
    },

    //查看更多
    checkMore() {
      //sessionStorage.setItem('LoadPage', 'ExploreAll')
      this.$store.commit('changeLoadpage', 'ExploreAll');
      this.$emit("func", this.changeNowmodel);
    },

    //加载首页轮播图
    loadIndexcarousel() {
      let that = this;
      that.$axios
        .get(that.$url + "homeSlider")
        .then(function(response) {
          console.log(response);
          for (let i in response.data.data) {
            that.Carouselsrc.push(response.data.data[i].appPhoto);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //加载首页两个APP推荐
    loadIndexRecommend() {
        let that = this;
      that.$axios
        .get(that.$url + "homeRecommed")
        .then(function(response) {
          console.log(response);
          for (let i in response.data.data.slice(0,2)) {
            let arr = {
              appId: response.data.data[i].appId,
              appWord: response.data.data[i].appWord,
              appName: response.data.data[i].appName,
              appDetail: response.data.data[i].appDetail,
              src: response.data.data[i].appPhoto
            }
            that.recommend.push(arr);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  beforeCreate() {
    //显示为首页6个推荐
    //sessionStorage.setItem('LoadPage', 'ExploreIndex');
    this.$store.commit('changeLoadpage', 'ExploreIndex');
  },
  mounted() {
    this.loadIndexcarousel();
    this.loadIndexRecommend();
    //this.$store.commit('changeLoadpage', 'ExploreIndex');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 轮播模块 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 推荐模块 */
.recommend {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.recommend > div {
  width: 49%;
  background-color: #f8f7fa;
  height: 200px;
}
.RchildOne:first-child {
  margin-right: 2%;
}
.RchildOne {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}
.recommendLB {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.recommendLB > div {
  width: 80%;
}
.recommendLB1 {
  font-size: 12px;
  color: #cccccc;
  margin-top: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recommendLB2 {
  margin-top: 5px;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recommendLB3 {
  height: 80px;
  word-wrap: break-word;
  overflow: hidden;
  margin-top: 10px;
  color: #b6a3ab;
}

.recommendRB {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.recommendRB img {
  width: 70%;
  /* border-radius: 50%; */
}

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
