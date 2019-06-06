<template>
  <div>
          <div class="loveGameandAPP">
      <div class="loveGameandAPPContent">
        <div
          class="loveGameandAPPCcard"
          v-for="(item , index) in loverGame.items"
          v-bind:key="item.id"
          @click="enterDetail(index)"
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
  name: 'Singletype',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
          },
                    {
            id: 5,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
                    {
            id: 6,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
                    {
            id: 7,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
                    {
            id: 8,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
                    {
            id: 9,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          },
                    {
            id: 10,
            src:
              "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
            title: "hahha",
            des: "llalalalal",
            status: "获取",
            isInPrograme: "APP内购买项目"
          }
        ]
      },
    }
  }
}
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
  margin-bottom: 200px;
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
