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
            <i class="el-icon-search el-input__icon search" slot="suffix" @click="handleIconClick"></i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
          </el-autocomplete>
        </div>
        <div class="category">
          <div v-for="(item, index) in items" v-bind:key="item.id" class="categoryBox" @click="toExplore(index)">
            <i :class="item.icon" class="icon"></i>
            {{ item.text }}
            <div v-if="item.number" class="tips">{{ item.number }}</div>
          </div>
        </div>
        <div class="personCount" @click="toPersonal">
            <div class="auheader">
                <img :src="personInfo.img" alt="">
            </div>
            <div class="personIBox">
                <div class="personName">
                    {{ personInfo.name }}
                </div>
                <div class="personMoney">
                    {{ personInfo.money }}
                </div>
            </div>
        </div>
        </div>

      </el-aside>
      <el-main class="main" style="padding: 0 25px;">
        <div :is="currentView" v-on:func="changeNowmodel" v-on:toSoftwareInfo="toSoftwareInfo" v-on:toExplore="toExplore" v-on:AccountInfo="AccountInfo" ref="mychild"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Explore from "./Explore.vue";  //主页
import Singletype from "./Singletype.vue";  //软件List
import AccountInfo from "./AccountInfo.vue";  //账户详情
import Account from "./Account.vue";  //账户
import SoftwareInfo from "./SoftwareInfo.vue"; //软件详情

export default {
  name: "home",
  data() {
    return {
      currentView: "AccountInfo", // 默认选中第一项
      msg: "Welcome to Your Vue.js App",
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
          text: "创作",
          id: 1
        },
        {
          text: "工作",
          id: 2
        }
      ],
      personInfo: {
          img: "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
          name: '杨雨涵',
          money: '124元',
          id: 1
      }
    };
  },
  components: {
    Explore,
    Singletype,
    Account,
    SoftwareInfo,
    AccountInfo,
  },
  methods: {
    //动态搜索查询
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      let that = this;
      let arr = [];
      that.$axios.get(that.$url + "software")
        .then(function (response) {
          console.log(response);
          for (let i in response.data) {
            let a = {
              value: response.data[i].appName,
              address: response.data[i].appWord,
              appId: response.data[i].appId
            }
            arr.push(a);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      cb(arr);
      console.log(results);
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
      that.$axios.get(that.$url + "software")
        .then(function (response) {
          console.log(response);
          for (let i in response.data) {
            let a = {
              value: response.data[i].appName,
              address: response.data[i].appWord
            }
            arr.push(a);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log(arr);
      return arr;
    },
    handleSelect(item) {
      console.log(item);
      sessionStorage.setItem('appId',item.appId);
      this.toSoftwareInfo();
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //查询个人信息
    personalInfo () {
      let that = this;
      that.$axios.get(that.$url + "user")
        .then(function (response) {
          console.log(response);
          that.personInfo.name = response.data[0].userName;
          that.personInfo.money = response.data[0].account;
          that.personInfo.id = response.data[0]._id;  
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //转到探索
    toExplore (val = 0) {
        console.log(val)
        let that = this;
        if (val == 0) {
            that.currentView = "Explore";
        }
    },

    // 转到账户界面
    toPersonal() {
        let that = this;
        that.currentView = "Account";
    },
  //转到账户详情
      AccountInfo() {
        let that = this;
        that.currentView = "AccountInfo";
    },
    //转到软件详情
    toSoftwareInfo () {
      //console.log(val);
      console.log(122354456)
      let that = this;
      that.currentView = 'SoftwareInfo'
    },

    //改变模块
    changeNowmodel () {
        let that = this;
        that.currentView = "Singletype";
    }
  },
  mounted() {
    // this.restaurants = this.loadAll();

    //获取个人信息
    this.personalInfo();
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
  width:300px;
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
.auheader img{
    width: 45px;
    border-radius: 50%;
    margin-left: 20px;
}
.personIBox {
    margin-left: 15px;
    font-size: 14px;
}
</style>
