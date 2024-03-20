<template>
  <ButtonComponent type="button" class="image-create-trigger">
    <span>{{ label }}</span>
    <Icon :icon="['fa', 'image']" class="ml-1"></Icon>
  </ButtonComponent>
</template>

<script>
import { ButtonComponent } from 'vue-elder-button'
import Icon from '@kvass/vue2-icon'

import { Options } from '../../../index'
export default {
  computed: {
    label() {
      return Options.labels.image
    },
  },
  components: {
    ButtonComponent,
    Icon,
  },
}
</script>

<style lang="scss">
@import '../../main';
.image-create-trigger {
  padding: 1rem 0;

  svg {
    color: GetVariable('primary');
  }
}
</style>
