<template>
<div>
  <input v-model="phone"/>
  <input v-model="password"/>
  <button @click="login">登陆</button>
</div>
</template>

<script>
  import qs from 'qs'
    export default {
        name: "BaseLogin",
        data(){
          return{
            phone:"",
            password:""
          }
        },
       methods:{
          login(){
           /* let data = qs.stringify({
              phone: '15698268081',
              password:'mcm10011121' /!*this.password*!/
            });*/
            this.$http.get('http://localhost:3000/login/cellphone', {
              params:{
                phone: '15698268081',
                password: 'mcm10011121'
              },
              xhrFields: { withCredentials: true },
            })
              .then(function (response) {
                console.log(response.data);
              })
              .catch(function (response) {
                console.log(response);
              });
          }
       },

    }
</script>

<style scoped>

</style>
