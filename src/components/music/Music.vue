<template>
    <div>
      <input v-model="keys"/>
      <ul>
        <li v-for="item in mL2" >
          <img :src="item.al.picUrl"/>
          {{item.al.name}}|{{item.ar[0].name}}
        </li>
      </ul>
      <router-view />
    </div>
</template>

<script>
    export default {
        name: "Music",
        data(){
          return{
            mL: [],
            keys:''
          }
        },
      computed:{
          mL2:function () {
            var keys = this.keys;
            return this.mL.filter(function (item) {
              return item.al.name.indexOf(keys) > -1||item.ar[0].name.indexOf(keys) > -1;
            })
          }
      },
      created(){
        let that = this;
        this.$http.get('http://localhost:3000/top/list', {
          params:{
            idx: '1',
          },
          xhrFields: { withCredentials: true },
        })
          .then(function (response) {
            console.log(response);
            that.mL = response.data.playlist.tracks;
          })
          .catch(function (response) {
            console.log(response);
          });
      },
      mounted(){

      }
    }
</script>

<style scoped lang="scss">
  ul{
    list-style: none;
    display: flex;
    width: 100%;
    height: auto;
    justify-content: flex-start;
    flex-flow: wrap;
    li{
      list-style: none;
      width: 100px;
      padding: 5px;
      img{
        width: 100%;
        height: 100px;
      }

    }
  }
</style>
