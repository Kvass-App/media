<template>
  <div class="kvass-media-focus-point">
    <div 
      class="kvass-media-focus-point__container" 
      @click="handleClick" 
      ref="container"
      :style="backgroundStyle"
    >
      <div
        v-if="focusPoint"
        class="kvass-media-focus-point__marker"
        :style="markerStyle"
        @click.stop="removeFocusPoint"
        title="Klikk for å fjerne fokuspunkt"
      >
        <div class="kvass-media-focus-point__marker-inner"></div>
      </div>
      <div
        v-if="!focusPoint"
        class="kvass-media-focus-point__overlay"
        title="Klikk for å sette fokuspunkt"
      >
        <div class="kvass-media-focus-point__overlay-text">
          Klikk for å sette fokuspunkt
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FocusPoint',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    imageUrl: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'cover',
    },
  },
  data() {
    return {
      focusPoint: null,
    }
  },
  computed: {
    markerStyle() {
      if (!this.focusPoint) return {}
      return {
        left: `${this.focusPoint.x * 100}%`,
        top: `${this.focusPoint.y * 100}%`,
      }
    },
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.imageUrl})`,
        backgroundSize: this.size,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    },
  },
  watch: {
    value: {
      handler(newValue) {
        this.focusPoint = newValue.focusPoint || null
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleClick(event) {
      if (this.disabled) return
      
      const rect = this.$refs.container.getBoundingClientRect()
      const focusPoint = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      }
      
      this.setFocusPoint(focusPoint)
    },
    setFocusPoint(focusPoint) {
      this.focusPoint = focusPoint
      this.$emit('input', { ...this.value, focusPoint })
      this.$emit('focus-point-changed', focusPoint)
    },
    removeFocusPoint() {
      this.focusPoint = null
      this.$emit('input', { ...this.value, focusPoint: null })
      this.$emit('focus-point-changed', null)
    },
  },
}
</script>

<style lang="scss">
.kvass-media-focus-point {
  position: relative;
  width: 100%;
  height: 100%;

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: crosshair;
    border-radius: inherit;
    overflow: hidden;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  &__overlay-text {
    color: white;
    background: rgba(0, 0, 0, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 0.9em;
    text-align: center;
  }

  &__marker {
    position: absolute;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    cursor: pointer;
    z-index: 10;

    &:hover .kvass-media-focus-point__marker-inner {
      transform: scale(1.2);
    }
  }

  &__marker-inner {
    width: 100%;
    height: 100%;
   
    border-radius: 50%;
    background: #007bff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
