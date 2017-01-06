<template>
  <div id="timelineBox">
    <el-button class="btn-prev" type="text" icon="caret-left" @click="goPrev"></el-button>
    <div id="timeline"></div>
    <el-button class="btn-next"  type="text"  icon="caret-right" @click="goNext"></el-button>
  </div>
</template>
<style lang="scss">
  #timelineBox {
    position: relative;
    background: #ffffff;
    margin-top:20px;
    padding-bottom: 20px;
    button {
      position: absolute;
      bottom: 15px;
      font-size: 32px;
      &.btn-prev {
        left: 0;
      }
      &.btn-next {
        right: 0;
      }
    }
    g {
      cursor: pointer;
    }
  }
</style>
<script>
  import D3KitTimeline from 'd3kit-timeline'
  export default {
    data () {
      return {
        timelineList: [
          {time: new Date(1977, 4, 25), name: 'A New Hope'},
          {time: new Date(1980, 4, 17), name: 'The Empire Strikes Back'},
          {time: new Date(1984, 4, 25), name: 'Return of the Jedi'},
          {time: new Date(1999, 4, 19), name: 'The Phantom Menace'},
          {time: new Date(2002, 4, 16), name: 'Attack of the Clones'},
          {time: new Date(2005, 4, 19), name: 'Revenge of the Sith'},
          {time: new Date(2015, 11, 18), name: 'The Force Awakens'}
        ]
      }
    },
    methods: {
      goPrev () {
      },
      goNext () {
      }
    },
    mounted () {
      let chartWidth = document.documentElement.clientWidth - 340 - 28
      var chart = new D3KitTimeline('#timeline', {
        direction: 'up',
        initialWidth: chartWidth,
        initialHeight: 250,
        textFn (d) {
          return d.time.getFullYear()
        }
      })
      chart.data(this.timelineList).resizeToFit()
    }
  }
</script>
