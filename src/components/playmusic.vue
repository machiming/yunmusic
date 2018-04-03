<template>
  <div>
    <div></div>
    <audio :src="play.url" controls="controls" @timeupdate="time" ref="song" v-model="isPlaying"></audio>
    <button @click="plays">点击</button>
    <button @click="stops">点击</button>
    <button @click="change">点击</button>
    <ul>
      <li v-for="items  in deallrc">
         <div v-for="(key,value) in items" ref="a"
              :class="{it:onslt==parseInt(value.split(':')[0]*60)+parseInt(value.split(':')[1])}"
              :data-id="parseInt(value.split(':')[0]*60)+parseInt(value.split(':')[1])" v-show="nowdata>(parseInt(value.split(':')[0]*60)+parseInt(value.split(':')[1])-30)">

           {{key}}<!--{{Math.abs(parseInt(nowdata)-parseInt(value.split(':')[0]*60)+parseInt(value.split(':')[1]))}}-->
         </div>
      </li>
    </ul>
    <audio src="http:aaa.mp3"></audio>
  </div>
</template>

<script>
    export default {
        name: "playmusic",
      data(){
          return{
            play: '',
            detail:[],
            lrc:'',
            isPlaying:false,
            deallrc:[],
            nowdata:'',
            onslt: 0
          }
      },
      created(){

      },
      computed:{

      },
      methods:{
        plays(){
          var audio = this.$refs.song;
          console.log();
            audio.play();
        },
        stops(){
          var audio = this.$refs.song;
            audio.pause();
            // audio.currentTime = 0;
        },
        change(){
          var audio = this.$refs.song;
          if(!this.isPlaying){
            audio.play();
          }else {
            audio.pause();
          }
          this.isPlaying = !this.isPlaying;

        },
        time(){
          var audio = this.$refs.song;
          this.nowdata = audio.currentTime;
          let olds = 0;
          let news = 0;
          this.$refs.a.forEach(value=>{
            news=value.getAttribute("data-id");
             if (news>this.nowdata&&olds<this.nowdata){
               this.onslt = olds;
               return;
             }
             olds = news;
          })
        },
        lrcToJson(obj){
          let a = obj.replace(/[\r\n]/g,"'},").replace(/\[/g,"{'").replace(/\]/g,"':'").replace(/,$/,"");
          let c = "[" + a + "]";
          this.deallrc = eval('(' + c + ')');
         /* this.deallrc = c.split(",");*/
          console.log(this.deallrc);
        }

      },
      mounted(){
        this.$nextTick(() =>{
          let id = this.$route.query.id;
          let that = this;
          that.$http.get('http://192.168.1.115:3000/music/url', {
            params: {
              id: id
            },
            xhrFields: {withCredentials: true}
          })
            .then(function (respon) {
              console.log(respon.data.data[0]);
              that.play = respon.data.data[0];
            })
            .catch(function (err) {
              console.log(err)
            });
          that.$http.get('http://192.168.1.115:3000/song/detail', {
            params: {
              ids: id
            },
            xhrFields: {withCredentials: true}
          }).then(function (respon) {
            that.detail = respon.data.songs[0];
            console.log(that.detail);
          }).catch(function (err) {
            console.log(err);
          });

          that.$http.get('http://192.168.1.115:3000/lyric',{
            params:{
              id: id
            },
            xhrFields: { withCredentials: true }
          }).then(function (respon) {
            that.lrc = respon.data.lrc.lyric
            ;
            console.log(that.lrc);
            that.lrcToJson(that.lrc)
          }).catch(function (err) {
            console.log(err)
          })

        })
      }
    }
</script>

<style scoped>
.it{
  color: red;
}
</style>
