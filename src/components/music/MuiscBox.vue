<template>
   <div>
     <div class="navbox">
       <ul>
         <li v-for="item in list" @click="choose(item)"><router-link :to="item.path"><span :class="{active:item.active}">{{item.name}}</span></router-link></li>
       </ul>
     </div>
     <router-view :message="mL"/>
   </div>
</template>

<script>
    export default {
        name: "MuiscBox",
        data(){
          return {
            list: [],
            mL: [],
          };
        },
      methods:{
        choose(obj){
          this.list.forEach(function (value) {
            value.active = false;
          });
          obj.active = true;
        }
      },
      created(){
        let that = this;
        this.$http
          .get("http://192.168.1.115:3000/top/list", {
            params: {
              idx: "1"
            },
            xhrFields: { withCredentials: true }
          })
          .then(function(response) {
            console.log(response);
            that.mL = response.data.playlist.tracks;
          })
          .catch(function(response) {
            console.log(response);
          });
      },
      mounted(){
          let that = this;
        this.$http.get('static/data/data.json').then(function (respon) {
          that.list = respon.data.musicColum
        }).catch(function (err) {
          console.log(err)
        });

      }
    }
</script>

<style scoped lang="scss">
  .navbox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    ul{
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      flex-flow: nowrap;
      li{
        width: 100%;
        height: 40px;
        line-height: 40px;
        span{
          display: inline-block;
          font-size: 15px;
        }
      }
    }
  }
  .active{
    border-bottom: 3px solid #d33a31;
  }
</style>
