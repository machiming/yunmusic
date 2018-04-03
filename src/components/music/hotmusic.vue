<template>
  <div class="hot">
    <div class="topimg"><img src="static/images/hot_music_bg_3x.jpg"></div>
    <ul class="list">
      <li v-for="(item, index) in message" v-if="index<count">
        <div class="xuhao" :class="{hotm:index<3}"> {{index+1}}</div>
        <div class="content">
          <div class="name">{{item.al.name}}</div>
          <div class="author"><i></i>{{item.ar[0].name}}-{{item.al.name}}</div>
        </div>
        <div class="play" @click="music(item.id)">
          <span></span>
        </div>
      </li>
      <li @click="count=count+20">more</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "hotmusic",
    data() {
      return {
        count: 20
      };
    },
    props: {
      message: Array
    },
    methods: {
      music(obj) {
        this.$router.push({'path': '/play', query: {id: obj}});
      }
    },

  };
</script>
<style scoped lang="scss">
  .hot {
    width: 100%;
    .topimg {
      width: 100%;
      img {
        width: 100%;
        background-origin: padding-box;
        background: url("/static/images/index_icon_2x.png") no-repeat -24px 0;
        background-size: 166px 97px;
      }
    }
    .list {
      li {
        display: flex;
        justify-content: space-between;
        flex-flow: nowrap;
        height: 55px;
        box-sizing: border-box;
        padding: 2.5px;

        .xuhao {
          width: 10%;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          color: #888;
        }
        .hotm {
          color: #d33a31;
        }
        .content {
          width: 75%;
          text-align: left;
          box-sizing: padding-box;
          padding: 4px 0;
          &:after {
            content: "";
            height: 1px;
            width: 200%;
            background: #8080801a;
            display: flex;
            margin-top: 7px;
          }
          .name {
            height: 22px;
            line-height: 25px;
            font-size: 17px;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .author {
            height: 18px;
            line-height: 18px;
            font-size: 12px;
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            i {
              display: inline-block;
              width: 22px;
              height: 18px;
              background-origin: padding-box;
              background: url("/static/images/index_icon_2x.png") no-repeat 5px 6px;
              background-size: 166px 97px;
              vertical-align: sub;
            }
          }
        }
        .play {
          width: 15%;
          height: 50px;
          line-height: 50px;
          span {
            display: inline-block;
            width: 22px;
            height: 22px;
            background-origin: padding-box;
            background: url("/static/images/index_icon_2x.png") no-repeat -24px 0;
            background-size: 166px 97px;
            vertical-align: sub;
          }
        }
      }
    }
  }
</style>
