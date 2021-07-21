<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="3"
    :row-height="580"
    :is-draggable="true"
    :is-resizable="false"
    :vertical-compact="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="item in layout"
      :static="item.static"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
    >
      <span class="text">{{ itemTitle(item) }}</span>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
export default {
  components: {
    GridLayout,
    GridItem,
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 1, i: "0", static: false },
        { x: 2, y: 0, w: 1, h: 1, i: "1", static: false },
        { x: 0, y: 0, w: 2, h: 1, i: "2", static: false },
        { x: 2, y: 0, w: 1, h: 1, i: "3", static: false },
      ],
      index: 0,
    };
  },
  methods: {
    itemTitle(item) {
      let result = item.i;
      if (item.static) {
        result += " - Static";
      }
      return result;
    },
  },
};
</script>

<style lang='less' scoped>
.vue-grid-layout {
  background: #888;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid red;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
</style>

