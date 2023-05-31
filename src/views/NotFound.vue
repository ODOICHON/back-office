<template>
    <div class="row">
        <div class="p-4" id="container">
            <img src="@/assets/Group-1015.png"/>

        </div>
        <div class="p-4" id="container-second">

            <img src="@/assets/Group-965.png" />
        </div>
        <div class="p-4" id="container-third">

            <img src="@/assets/Group-947.png" @click="moveToMain()"/>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import router from '@/router';
  export default {
    setup() {
        const moveToMain = () => {
            router.push({
                path: "/",
            });
        };
        return {
        moveToMain
      }
    }};
  </script>
  
  <style>
#container{
    margin-left: 45%;
    margin-top: 10%;
}
#container-second {
    margin-left: 25%;
}
#container-third {
    margin-left: 40%;
    margin-bottom: 30%;
}
</style>