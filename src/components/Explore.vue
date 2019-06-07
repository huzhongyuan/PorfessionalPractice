<template>
  <div>
    <!-- 走马灯 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <!-- <h3>{{ item }}</h3> -->
        <!-- <img src="./assets/images/banner3.jpg" /> -->
        <img :src="item.src" class="bannerImg">
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐 -->
    <div class="recommend">
      <div
        class="RchildOne"
        v-for="(item , index) in recommend"
        v-bind:key="item.id"
        @click="enterDetail(item,index)"
      >
        <div class="recommendLB">
          <div class="recommendLB1">高手妙招</div>
          <div class="recommendLB2">告别杂乱告别杂乱告别杂乱告别杂乱告别杂乱</div>
          <div
            class="recommendLB3"
          >lalalallalalalalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalall</div>
        </div>
        <div class="recommendRB">
          <img :src="item.src" alt>
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 最爱的游戏和APP -->
    <div class="loveGameandAPP">
      <div class="loveGameandAPPtitleBox">
        <div class="loveGameandAPPtitleName">{{ loverGame.name }}</div>
        <div class="checkMore" @click="checkMore">查看全部</div>
      </div>
      <div class="loveGameandAPPContent">
        <div
          class="loveGameandAPPCcard"
          v-for="(item , index) in loverGame.items"
          v-bind:key="item.id"
          @click="enterDetail(item,index)"
        >
          <div class="loveGameandAPPCcardL">
            <img :src="item.src" alt>
          </div>
          <div class="loveGameandAPPCcardR">
            <div class="loveGameandAPPCcardRT overflow">
                {{ item.title }}
            </div>
            <div class="loveGameandAPPCcardRc overflow">
                {{ item.des }}
            </div>
            <div class="loveGameandAPPCcardRBox">
              <div class="loveGameandAPPCcardRs ">
                  {{ item.status }}
              </div>
              <div class="loveGameandAPPCcardRi" v-if="item.isInPrograme">
                  {{ item.isInPrograme }}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 免费APP和游戏排行 -->
    <div class="loveGameandAPP">
      <div class="loveGameandAPPtitleBox">
        <div class="loveGameandAPPtitleName">{{ freeApp.name }}</div>
        <div class="checkMore" @click="checkMore">查看全部</div>
      </div>
      <div class="loveGameandAPPContent">
        <div
          class="loveGameandAPPCcard"
          v-for="(item , index) in freeApp.items"
          v-bind:key="item.id"
          @click="enterDetail(item,index)"
        >
          <div class="loveGameandAPPCcardL">
            <img :src="item.src" alt>
          </div>
          <div class="loveGameandAPPCcardR">
            <div class="loveGameandAPPCcardRT overflow">
                {{ item.title }}
            </div>
            <div class="loveGameandAPPCcardRc overflow">
                {{ item.des }}
            </div>
            <div class="loveGameandAPPCcardRBox">
              <div class="loveGameandAPPCcardRs ">
                  {{ item.status }}
              </div>
              <div class="loveGameandAPPCcardRi" v-if="item.isInPrograme">
                  {{ item.isInPrograme }}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  
      <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 免费APP和游戏排行 -->
    <div class="loveGameandAPP">
      <div class="loveGameandAPPtitleBox">
        <div class="loveGameandAPPtitleName">{{ PayApp.name }}</div>
        <div class="checkMore" @click="checkMore">查看全部</div>
      </div>
      <div class="loveGameandAPPContent">
        <div
          class="loveGameandAPPCcard"
          v-for="(item , index) in freeApp.items"
          v-bind:key="item.id"
          @click="enterDetail(item,index)"
        >
          <div class="loveGameandAPPCcardL">
            <img :src="item.src" alt>
          </div>
          <div class="loveGameandAPPCcardR">
            <div class="loveGameandAPPCcardRT overflow">
                {{ item.title }}
            </div>
            <div class="loveGameandAPPCcardRc overflow">
                {{ item.des }}
            </div>
            <div class="loveGameandAPPCcardRBox">
              <div class="loveGameandAPPCcardRs ">
                  {{ item.status }}
              </div>
              <div class="loveGameandAPPCcardRi" v-if="item.isInPrograme">
                  {{ item.isInPrograme }}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Explore",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      recommend: [
        {
          id: 0,
          describ1: "高手妙招",
          discrib2: "告别杂乱告别杂乱告别杂乱告别杂乱告别杂乱",
          describ3: "lalalallalal",
          src:
            "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true"
        },
        {
          id: 1,
          describ1: "高手妙招",
          discrib2: "告别杂乱告别杂乱告别杂乱告别杂乱告别杂乱",
          describ3:
            "lalalallalalalalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalallalalall",
          src:
            "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true"
        }
      ],
      loverGame: {
        name: "我们最喜爱的App和游戏",
        items: [
          {
            id: 0,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 1,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 2,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 3,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 4,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          }
        ]
      },
            freeApp: {
        name: "免费APP和游戏排行",
        items: [
          {
            id: 0,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 1,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 2,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 3,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 4,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          }
        ]
      },
        PayApp: {
        name: "付费APP和游戏排行",
        items: [
          {
            id: 0,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 1,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 2,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 3,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
          {
            id: 4,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          }
        ]
      }
    };
  },
  methods: {
    enterDetail(item, index) {
      this.$emit('toSoftwareInfo', this.toSoftwareInfo)

    },
    checkMore() {
      this.$emit('func', this.changeNowmodel)
    }
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
  border-radius: 50%;
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
  width:100%;
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
  background-color: #F2F0F7;
  text-align: center;
  border-radius:10%;
  color: #137AF8;
  cursor: pointer;
}

.loveGameandAPPCcardRi {
  font-size: 10px;
  margin-left: 5%;
  color: #cccccc;
}
</style>
