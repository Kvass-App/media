<template>
  <div class="kvass-media-image-preview" :style="style">
    <div class="kvass-media-image-preview__toolbar">
      <button 
        v-if="!isFocusPointMode"
        @click="enableFocusPointMode"
        class="kvass-media-image-preview__focus-button"
        title="Aktiver fokuspunkt-modus"
        :disabled="disabled"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Sett fokuspunkt
      </button>
      <button 
        v-else
        @click="disableFocusPointMode"
        class="kvass-media-image-preview__focus-button kvass-media-image-preview__focus-button--active"
        title="Deaktiver fokuspunkt-modus"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        Avbryt
      </button>
    </div>
    
    <FocusPoint
      v-if="isFocusPointMode"
      :value="value"
      :image-url="value.url"
      :disabled="disabled"
      :size="size"
      @input="updateValue"
      @focus-point-changed="onFocusPointChanged"
    />
    <div v-else class="kvass-media-image-preview__background" :style="backgroundStyle"></div>
  </div>
</template>

<script>
import FocusPoint from './FocusPoint.vue'
import { getBackgroundPosition } from '../../utils'

export default {
  components: {
    FocusPoint,
  },
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocusPointMode: false,
    }
  },
  computed: {
    style() {
      return {
        padding: this.size === 'cover' ? '0' : '1rem',
        position: 'relative',
      }
    },
    backgroundStyle() {
      return {
        backgroundSize: this.size,
        backgroundImage: `url(${this.value.url})`,
        backgroundPosition: this.getBackgroundPosition(),
      }
    },
  },
  methods: {
    enableFocusPointMode() {
      this.isFocusPointMode = true
      this.$emit('focus-point-mode-changed', true)
    },
    disableFocusPointMode() {
      this.isFocusPointMode = false
      this.$emit('focus-point-mode-changed', false)
    },
    updateValue(newValue) {
      this.$emit('input', newValue)
    },
    onFocusPointChanged(focusPoint) {
      this.$emit('focus-point-changed', focusPoint)
      if (focusPoint) {
        // Automatisk deaktiver fokuspunkt-modus etter at punktet er satt
        this.$nextTick(() => {
          this.disableFocusPointMode()
        })
      }
    },
    getBackgroundPosition() {
      return getBackgroundPosition(this.value.focusPoint)
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
  position: relative;
  
  &__toolbar {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 10;
  }
  
  &__focus-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background: rgba(0, 0, 0, 0.9);
      transform: translateY(-1px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &--active {
      background: #007bff;
      
      &:hover {
        background: #0056b3;
      }
    }
  }
  
  &__background {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    border-radius: inherit;
  }
}
</style>
