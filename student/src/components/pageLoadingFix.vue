<template>
  <div class="scroll" ref="page">
    <slot>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'page-loading',
    props: {
      'height': {
        type: String
      }
    },
    data () {
      return {
        active: false  // 此项用来防止下拉到底部后 多次触发事件
      }
    },
    mounted () {
      this.$refs.page.addEventListener('scroll', this.scrollHandle);
      this.$refs.page.style = 'height:' + this.height;
    },
    methods: {
      scrollHandle: function () {
        let node = this.$refs.page;
        /**
         * 屏幕滚动的总结
         * element.scrollTop是滚轮移动的距离
         * element.offsetHeight是屏幕可视区域的高度
         * element.scrollHeight是元素的本身高度
         */
          // 当前情况下，滚动条距离元素底部的距离
        let offsetBottom = node.scrollHeight - node.scrollTop - node.offsetHeight;
        if (offsetBottom <= 5 && this.active === false) {
          this.active = true;
        }
        // 这个判断用来防止下拉到底部后 多次触发事件
        if (offsetBottom > 5) {
          this.active = false;
        }
      }
    }
  }
</script>

<style scoped>
  .scroll {
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
