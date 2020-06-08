<style lang='scss'>
.rIcon {
  display: block;
  &.mPointer {
    cursor: pointer;
  }
}
</style>
<template>
  <img
    @click="$emit('click')"
    @mouseover="hovered = true"
    @mouseout="hovered = false"
    class="rIcon"
    :class="{mPointer: pointer}"
    :style="iconStyle"
    :src="require(`@/img/icons/${iconName}.svg`)"
  />
</template>
<script>
export default {
  data: function() {
    return {
      hovered: false
    };
  },
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: "24"
    },
    colored: Boolean,
    pointer: Boolean
  },
  computed: {
    iconName() {
      return this.colored || this.hovered ? this.name : `${this.name} dark`;
    },
    iconStyle() {
      return {
        width: this.size + "px",
        height: this.size + "px"
      };
    }
  }
};
</script>