<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'GDHI Application'
      }
    },
    mounted: function () {
      console.log('monting')
      this.fetchData()
    },

    methods: {
      fetchData: function () {
        axios.get('/api/countries')
          .then(function (response) {
            console.log('Response', response)
          })
          .catch(function (err) {
            console.log('Errr', err)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
