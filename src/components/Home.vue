<template>
  <div>
    <el-container>
      <el-aside class="aside">
        <div class="asideBack">
          <div class="searchBox">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="state"
              :fetch-suggestions="querySearch"
              placeholder="搜索"
              @select="handleSelect"
              style="width:250px;"
            >
              <i
                class="el-icon-search el-input__icon search"
                slot="suffix"
                @click="handleIconClick"
              ></i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template>
            </el-autocomplete>
          </div>
          <div class="category">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="categoryBox"
              @click="toExplore(index)"
            >
              <i :class="item.icon" class="icon"></i>
              {{ item.text }}
              <!-- <div v-if="item.number" class="tips">{{ item.number }}</div> -->
            </div>
          </div>
          <div class="personCount" @click="toPersonal">
            <div class="auheader">
              <!-- <img :src="personInfo.img" alt> -->
              <!-- <div>{{ sessionStorage.setItem('appId',item.appId) }}</div> -->
               <div class="surname">{{ surname }}</div>
            </div>
            <div class="personIBox">
              <div class="personName">{{ this.$store.state.userInfo.userName }}</div>
              <div class="personMoney">{{ this.$store.state.userInfo.account }}</div>
            </div>
          </div>
        </div>
      </el-aside>
      <el-main class="main" style="padding: 0 25px;">
        <div
          :is="currentView"
          v-on:func="changeNowmodel"
          v-on:toSoftwareInfo="toSoftwareInfo"
          v-on:toExplore="toExplore"
          v-on:AccountInfo="AccountInfo"
          :pageMessage = pageMessage
          ref="mychild"
          v-if="hackReset"
        ></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Explore from "./Explore.vue"; //主页
import Singletype from "./Singletype.vue"; //软件Lists
import AccountInfo from "./AccountInfo.vue"; //账户详情
import Account from "./Account.vue"; //账户
import SoftwareInfo from "./SoftwareInfo.vue"; //软件详情
export default {
  name: "home",
  data() {
    return {
      hackReset: true,
      currentView: "Explore", // 默认选中第一项
      pageMessage: "",
      msg: "Welcome to Your Vue.js App",
      surname: '', //姓
      restaurants: [],
      state: "",
      items: [
        {
          text: "探索",
          id: 0,
          icon: "el-icon-star-on",
          number: 3
        },
        {
          text: "工作",
          id: 1,
          icon: "el-icon-s-platform",
          number: 3
        },
        {
          text: "游戏",
          id: 2,
          icon: "el-icon-s-opportunity",
          number: 3
        },

        {
          text: "开发",
          id: 3,
          icon: "el-icon-menu",
          number: 3
        },
        {
          text: "影音",
          id: 4,
          icon: "el-icon-video-camera-solid",
          number: 3
        },

        {
          text: "生活",
          id: 5,
          icon: "el-icon-cold-drink",
          number: 3
        }
      ],
      personInfo: {
        img: this.$store.state.userInfo.HeadPortrait
      }
    };
  },
  components: {
    Explore,
    Singletype,
    Account,
    SoftwareInfo,
    AccountInfo
  },
  methods: {
    //动态搜索查询
    querySearch(queryString, cb) {
      console.log(queryString);
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      let that = this;
      let arr = [];

      this.$axios
        .post(
          that.$url + "homeSearch",
          that.$qs.stringify({
            searchValue: queryString
          })
        )
        .then(response => {
          for (let i in response.data.data) {
            let a = {
              value: response.data.data[i].appName,
              address: response.data.data[i].appWord,
              appId: response.data.data[i].appId
            };
            arr.push(a);
          }
        });

      cb(arr);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      let that = this;
      let arr = [];
      that.$axios
        .get(that.$url + "software")
        .then(function(response) {
          for (let i in response.data) {
            let a = {
              value: response.data[i].appName,
              address: response.data[i].appWord
            };
            arr.push(a);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      return arr;
    },
    //选择详细软件
    handleSelect(item) {
      console.log(item);
      this.$store.commit("changeAppId", item.appId);
      this.toSoftwareInfo();
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //查询个人信息
    personalInfo() {
      let that = this;
      that.$axios
        .get(that.$url + "users/" + sessionStorage.getItem('userId'))
        .then(function(response) {
          that.personInfo.name = response.data.data.userName;
          that.personInfo.money = response.data.data.account;
          that.personInfo.id = response.data.data._id;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //转到探索
   toExplore(val) {
      console.log(val);
      let that = this;
      if (val == "0") {
         this.$store.commit("changeLoadpage", "ExploreIndex");
         that.currentView ="Explore";
      } else if (val == "1") {
        this.$store.commit("changeLoadpage", "work");
        that.currentView = "Singletype";
        that.pageMessage = 'work';
      } else if (val == "2") {
       this.$store.commit("changeLoadpage", "game");
       that.currentView = "Singletype";
       that.pageMessage = 'game';
      } else if (val == "3") {
        this.$store.commit("changeLoadpage", "develop");
        that.pageMessage = 'develop';
        that.currentView = "Singletype";
      } else if (val == "4") {
        this.$store.commit("changeLoadpage", "av");
        this.pageMessage ="av";
        that.currentView = "Singletype";
      } else if (val == "5") {
        this.$store.commit("changeLoadpage", "life");
        this.pageMessage="life";
        that.currentView = "Singletype";
      }
    },

    // 转到账户界面
    toPersonal() {
      let that = this;

      that.currentView = "Account";
      this.$store.commit("changeLoadpage", "hasInstalled");
    },
    //转到账户详情
    AccountInfo() {
      let that = this;
      that.currentView = "AccountInfo";
    },
    //转到软件详情
    toSoftwareInfo() {
      let that = this;
      that.currentView = "SoftwareInfo";
    },

    //改变模块
    changeNowmodel() {
      let that = this;
      that.currentView = "Singletype";
    }
  },
  mounted() {
    //获取个人信息
    this.personalInfo();
    this.surname = sessionStorage.getItem('surname').slice(0,1);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside {
  width: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.surname {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4B4A4B;
  color: white;
  font-size: 18px;
  margin-left: 30px;
}
.asideBack {
  position: fixed;
  width: 300px;
  height: 100%;
  background-color: #e1dedf;
}
.main {
  overflow: hidden;
}
.searchBox {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 300px;
}

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete .highlighted .addr {
  color: #ddd;
}
.search {
  cursor: pointer;
}
.category {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;
  height: 500px;
  position: fixed;
  width: 300px;
  top: 70px;
}

.categoryBox {
  display: flex;
  align-items: center;
  padding: 0px 25px;
  height: 50px;
  cursor: pointer;
}
.categoryBox:hover {
  background-color: #a8a5a6;
}
.icon {
  margin-right: 10px;
}
.icon:hover {
  color: #7eafdb;
}

.tips {
  margin-left: 150px;
  height: 20px;
  width: 20px;
  background-color: #5f5e5c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 50%;
}
.personCount {
  position: fixed;
  bottom: 0px;
  width: 300px;
  height: 80px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.personCount:hover {
  background-color: #a8a5a6;
  color: white;
}
.auheader img {
  width: 45px;
  border-radius: 50%;
  margin-left: 20px;
}
.personIBox {
  margin-left: 15px;
  font-size: 14px;
}
</style>
