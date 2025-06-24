<template>
  <svg 
    :class="iconClass" 
    :style="iconStyle"
    viewBox="0 0 24 24" 
    fill="currentColor"
    v-html="iconSvg"
  />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  computed: {
    iconClass() {
      return {
        'kvass-icon': true,
        [`kvass-icon--${this.size}`]: true
      }
    },
    iconStyle() {
      const sizes = {
        sm: '16px',
        md: '20px', 
        lg: '24px',
        xl: '32px'
      }
      return {
        width: sizes[this.size] || sizes.md,
        height: sizes[this.size] || sizes.md
      }
    },
    iconSvg() {
      const icons = {
        ban: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
        download: '<path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>',
        trash: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
        eye: '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',
        edit: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
        close: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
        check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
        plus: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
        minus: '<path d="M19 13H5v-2h14v2z"/>',
        arrow_up: '<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>',
        arrow_down: '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>',
        arrow_left: '<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/>',
        arrow_right: '<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>'
      }
      return icons[this.icon] || icons.close
    }
  }
}
</script>

<style lang="scss" scoped>
.kvass-icon {
  display: inline-block;
  vertical-align: middle;
  
  &--sm {
    width: 16px;
    height: 16px;
  }
  
  &--md {
    width: 20px;
    height: 20px;
  }
  
  &--lg {
    width: 24px;
    height: 24px;
  }
  
  &--xl {
    width: 32px;
    height: 32px;
  }
}
</style> 