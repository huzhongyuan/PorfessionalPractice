<template>
  <div class="BBOX">
    <div class="back">
      <el-button type="info" icon="el-icon-back" @click="toback" circle></el-button>
    </div>
    <div class="header">
      <div class="headerphoto">
        <img :src="info.src" alt>
      </div>
      <div class="headerContent">
        <div class="headerContentT">
          <div class="headerContentTLB">
            <div class="headerContentTLBTitle">{{ info.title }}</div>
            <div class="headerContentTLBtype">{{ info.type }}</div>
            <div class="headerContentTLBtipes">{{ info.tipes }}</div>
          </div>
          <div class="headerContentTRB">
            <el-button type="primary" round>{{ info.money }}</el-button>
          </div>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <div class="score">
          <el-rate v-model="value" @change="score" show-text></el-rate>

          <div class="age">{{ info.age }}</div>
        </div>
      </div>
    </div>

    <!-- 走马灯 -->
    <div class="lunbo">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in appPhoto" :key="index">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 折叠面板 -->
    <div class="collapes">
      <el-collapse accordion>
        <el-collapse-item title="软件详情">
          <div>{{ appDetail }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 新功能 -->
    <div class="newfunction">
      <div class="newfunctiontips">新功能</div>
      <div class="newfunctionnews">{{ newFunctionInfo.info }}</div>
      <div class="newfunctionnewsTime">{{ newFunctionInfo.time }}</div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 信息 -->
    <div class="messages">
      <div class="messageTitle">信息</div>
      <div class="messageBox" v-for="(item , index) in messages" v-bind:key="index">
        <div class="messagechild1" v-if="item.tip1">
          <div class="messageTitleTip">{{ item.tip1 }}</div>
          <div>{{ item.create }}</div>
        </div>
        <div class="messagechild2" v-if="item.tip1">
          <div class="messageTitleTip">{{ item.tip2 }}</div>
          <div>{{ item.size }}</div>
        </div>
        <div class="messagechild3" v-if="item.tip1">
          <div class="messageTitleTip">{{ item.tip3 }}</div>
          <div>{{ item.type }}</div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      info: {
        src:'',
        title: "",
        type: "",
        tipes: "",
        money: "",
        age: ""
      },
      value: '',
      appPhoto: [],
      appDetail: '',
      newFunctionInfo: {
        id: 0,
        info: "",
        time: "2019/06/07"
      },
      messages: [
        {
          tip1: "开发者",
          tip2: "大小",
          tip3: "类别",
          create: "",
          size: "",
          type: ""
        },
        {
          tip1: "兼容性",
          tip2: "语言",
          tip3: "年龄",
          create: "",
          size: "",
          type: ""
        },
        {
          tip1: "开发者",
          create: "huzhongyuan"
        }
      ]
    };
  },
  methods: {
    toback() {
      //this.$router.go(-1);//返回上一层
      this.$emit("toExplore", this.toExplore);
    },
    score() {
      console.log(this.value);
    },
    //加载软件详情
    LoadSoftInfo() {
      //let appId = sessionStorage.getItem('appId');
      let appId = this.$store.state.appId;
      console.log('appId' + appId);
      let that = this;
      that.$axios
        .get(that.$url + "appDetail/" + appId)
        .then(function(response) {
          console.log(response);
          response = response.data;
          console.log(response);
          that.info.src = response.data.appIcon;
          that.info.title = response.data.appName;
          that.info.type = response.data.appType;
          that.info.tipes = response.data.appDeveloper;
          that.info.money = response.data.appCost;
          that.info.age = "4+";
          that.value = response.data.appRate;
          that.appPhoto = response.data.appPhoto;
          that.appDetail =  response.data.appDetail;
          that.messages[0].create = response.data.appDeveloper;
          that.messages[0].size = response.data.appSize;   
          that.messages[0].type = response.data.appType;   
          that.messages[1].create ='可在window7及以上使用';
          that.messages[1].size = response.data.appLanguage;   
          that.messages[1].type = '4+';
          that.newFunctionInfo.info = response.data.appCopyRight    
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.LoadSoftInfo();
  },
  
  computed: {
      listenshowpage1() {
        console.log('changelalalallalalalal')
        return this.$store.state.appId;
      }
    },
  watch:{
    listenshowpage1(newVal,OldVal){
      console.log('changeId');
      this.info = {
        src:'',
        title: "",
        type: "",
        tipes: "",
        money: "",
        age: ""
      };
      this.value = '';
      this.appPhoto =  [];
      this.appDetail = '';
      this.newFunctionInfo = {
        id: 0,
        info: "",
        time: "2019/06/07"
      };
      this.messages =  [
        {
          tip1: "开发者",
          tip2: "大小",
          tip3: "类别",
          create: "",
          size: "",
          type: ""
        },
        {
          tip1: "兼容性",
          tip2: "语言",
          tip3: "年龄",
          create: "",
          size: "",
          type: ""
        },
        {
          tip1: "开发者",
          create: "huzhongyuan"
        }
      ]
      this.LoadSoftInfo();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.BBOX {
  position: relative;
  width: 100%;
  height: 100%;
}
.back {
  height: 80px;
  display: flex;
  align-items: center;
}
.header {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
}
.headerphoto {
  width: 20%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.headerphoto img {
  border-radius: 5%;
  position: relative;
  height: 150px;
}
.headerContent {
  width: 80%;
  display: flex;
  margin-left: 40px;
  flex-direction: column;
}

.headerContentT {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: center;
}
.headerContentTLBTitle {
  font-size: 20px;
}
.headerContentTLBtype {
  color: #808080;
}

.headerContentTLBtipes {
  color: #0e76fe;
}
.score {
  display: flex;
  justify-content: space-between;
}
.headerContentTRB {
  margin-right: 50px;
}
.headerContentTRB > div {
  border-radius: 40%;
  background-color: #1379fe;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.age {
  font-size: 20px;
}

/* 轮播 */
.lunbo {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.collapes {
  margin: 40px 0px;
}

/* 新功能 */
.newfunctiontips {
  font-size: 20px;
}
.newfunction > div {
  margin-bottom: 10px;
}
.newfunctionnewsTime {
  color: #cccccc;
  font-size: 14px;
}

/* 信息 */
.messageTitle {
  font-size: 20px;
}
.messageBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  margin-top: 20px;
}
.messageBox > div {
  margin-bottom: 10px;
}
.messagechild1 {
  width: 30%;
}
.messagechild2 {
  width: 30%;
}
.messagechild3 {
  width: 30%;
}
.messageTitleTip {
  color: #cccccc;
}
</style>
