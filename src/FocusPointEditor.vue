<template>
  <div class="focus-point-editor">
    <div class="focus-point-editor__main">
      <div class="focus-point-editor__image-wrapper" ref="imageWrapper" @mousedown="onImageClick">
        <img :src="value.url" ref="image" @load="getImageDimensions" />
        <div class="focus-point-editor__handle" :class="{ 'is-dragging': isDragging}" :style="handleStyle" @mousedown.stop="onDragStart"></div>
      </div>
    </div>
    <div class="focus-point-editor__previews">
      <h4>Live Previews</h4>
      <div class="focus-point-editor__preview-box" :style="previewStyle(16, 9)">
        <div class="focus-point-editor__preview-aspect">16:9</div>
      </div>
      <div class="focus-point-editor__preview-box" :style="previewStyle(1, 1)">
        <div class="focus-point-editor__preview-aspect">1:1</div>
      </div>
      <div class="focus-point-editor__preview-box" :style="previewStyle(9, 16)">
        <div class="focus-point-editor__preview-aspect">9:16</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      focus: { x: 0.5, y: 0.5 },
      imageDimensions: { width: 0, height: 0 },
      isDragging: false,
    }
  },
  computed: {
    handleStyle() {
      return {
        left: `${this.focus.x * 100}%`,
        top: `${this.focus.y * 100}%`,
      }
    },
  },
  methods: {
    previewStyle(w, h) {
      return {
        'padding-top': `${(h / w) * 100}%`,
        'background-image': `url(${this.value.url})`,
        'background-position': `${this.focus.x * 100}% ${this.focus.y * 100}%`,
      }
    },
    getImageDimensions() {
      if (this.$refs.image) {
        this.imageDimensions = {
          width: this.$refs.image.clientWidth,
          height: this.$refs.image.clientHeight,
        }
      }
    },
    updateFocusPoint(event) {
      if (!this.$refs.imageWrapper) return
      const rect = this.$refs.imageWrapper.getBoundingClientRect()
      let x = (event.clientX - rect.left) / rect.width
      let y = (event.clientY - rect.top) / rect.height

      this.focus.x = Math.max(0, Math.min(1, x))
      this.focus.y = Math.max(0, Math.min(1, y))
    },
    onImageClick(event) {
      this.updateFocusPoint(event)
    },
    onDragStart(event) {
      this.isDragging = true
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.onDragEnd)
    },
    onDrag(event) {
      if (this.isDragging) {
        this.updateFocusPoint(event)
      }
    },
    onDragEnd() {
      this.isDragging = false
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.onDragEnd)
    },
    save() {
      this.$emit('save', { ...this.value, focus: this.focus })
    },
  },
  created() {
    if (this.value.focus) {
      this.focus = { ...this.value.focus }
    }
  },
  mounted() {
    this.getImageDimensions()
    window.addEventListener('resize', this.getImageDimensions)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getImageDimensions)
  },
}
</script>

<style lang="scss">
.focus-point-editor {
  display: flex;
  gap: 2rem;
  padding: 1rem;
  min-height: 400px;
  max-height: 75vh;

  &__main {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #474747;
    border-radius: 4px;
    overflow: hidden;
  }

  &__image-wrapper {
    position: relative;
    cursor: crosshair;
    line-height: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
      user-select: none;
      pointer-events: none;
    }
  }

  &__handle {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid white;
    background-color: rgba(58, 154, 205, 0.75);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.5);
    cursor: move;
    transition: transform 150ms ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background: white;
      opacity: 0.75;
    }
    &::before {
      left: -2000px;
      right: -2000px;
      top: 50%;
      height: 1px;
      margin-top: -0.5px;
    }
    &::after {
      top: -2000px;
      bottom: -2000px;
      left: 50%;
      width: 1px;
      margin-left: -0.5px;
    }

    &.is-dragging {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  &__previews {
    flex: 1;
    min-width: 200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-content: start;
    align-items: start;

    h4 {
      grid-column: 1 / -1;
      margin-top: 0;
      margin-bottom: 0;
      color: #666;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 0.8em;
      letter-spacing: 0.05em;
    }
  }

  &__preview-box {
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    border: 1px solid #ccc;
    border-radius: 3px;
    position: relative;
    background-color: #f0f0f0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);

    &:nth-of-type(1) {
      grid-column: 1 / -1;
    }
  }

  &__preview-aspect {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 0.7rem;
    padding: 2px 5px;
    border-radius: 3px;
  }
}
</style>