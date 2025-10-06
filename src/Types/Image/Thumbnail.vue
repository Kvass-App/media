<template>
  <div class="kvass-media-image__thumbnail" :style="style" @click="$emit('click')"></div>
</template>
<script>
export default {
  props: {
    value: Object,
  },

  computed: {
    style() {
      const backgroundPosition = this.value.focus
        ? `${this.value.focus.x * 100}% ${this.value.focus.y * 100}%`
        : 'center'

      return {
        backgroundImage: `url(${this.value.url})`,
        backgroundPosition: backgroundPosition,
      }
    },
  },
}
</script>

<style lang="scss">
.kvass-media-image__thumbnail {
  position: relative;
  background-position: center;
  background-size: cover;
}
</style>
