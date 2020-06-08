<style lang='scss'>
.rMenuLink {
  display: flex;
  text-decoration: none;
  &:hover &-description {
    color: $dark;
  }
  &-icon {
    display: block;
    margin-right: 24px;
  }
  &-description {
    @include h2;
    color: $grey-5;
    text-decoration: none;
    transition: color.3s;
    &.mDark {
      color: $dark;
    }
  }
}
</style>
<template>
  <router-link class="rMenuLink" :to="to">
    <r-icon class="rMenuLink-icon" :colored="isActive || isHover" :name="iconName"></r-icon>
    <div class="rMenuLink-description" :class="{mDark: isActive || isHover}">{{label}}</div>
  </router-link>
</template>
<script>
import rIcon from "../common/r-icon";
export default {
  components: { rIcon },
  data: function() {
    return {
      isHover: false
    };
  },
  props: {
    to: {
      type: Object,
      required: true
    },
    iconName: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive() {
      return this.$route.name === this.to.name;
    }
  }
};
</script>