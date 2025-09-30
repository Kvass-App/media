<template>
  <div class="kvass-media-image-preview" :style="style"></div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    style() {
      const backgroundPosition = this.value.focus
        ? `${this.value.focus.x * 100}% ${this.value.focus.y * 100}%`
        : 'center'

      return {
        padding: this.size === 'cover' ? '0' : '1rem',
        backgroundSize: this.size,
        backgroundImage: `url(${this.value.url})`,
        backgroundPosition: backgroundPosition,
      }
    },
  },
}
</script>

<style lang="scss">
.kvass-media-image-preview {
  text-align: center;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: inherit;
  background-origin: content-box;
  flex-grow: 1;
  height: 100%;
  width: 100%;
}
</style>
