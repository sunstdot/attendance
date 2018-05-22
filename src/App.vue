<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body{
    height: 100%
  }
  body {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 18px;
    line-height: 1.42857143;
    color: #333;
    background-color: #E0FFFF;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    
  }
</style>
