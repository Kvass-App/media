<template>
  <Portal>
    <div class="kvass-media-type-editor">
      <ModalComponent :show="Boolean(show)" @close="close" class="kvass-media-type-editor__modal">
        <Card theme="flat" tag="form" @submit.prevent="submit">
          <template #default>
            <component
              v-if="show"
              :is="show.components.Create"
              :is-valid.sync="isValid"
              :upload="upload"
              :value="value"
              ref="creator"
              v-on="$listeners"
            />
          </template>
          <template #footer>
            <ButtonComponent :label="label.cancel" type="button" @click="close" />
            <ButtonComponent
              theme="primary"
              :disabled="!isValid"
              :promise="promise"
              :label="label.save"
              type="submit"
              @onSuccess="close"
            />
          </template>
        </Card>
      </ModalComponent>
    </div>
  </Portal>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import Card from '@kvass/card'
import { ModalComponent } from 'vue-elder-modal'
import { Options } from '../index'

export default {
  props: {
    value: {
      type: [String, Object],
      default: null,
    },
    upload: Function,
    show: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      promise: null,
      isValid: true,
    }
  },
  computed: {
    label() {
      return Options.labels
    },
  },
  methods: {
    close() {
      this.$emit('update:show', null)
    },
    submit() {
      if (!this.isValid) return
      this.promise = this.$refs.creator.prepareData().then((data) => {
        this.$emit('submit', data)
      })
    },
  },
  components: {
    Portal,
    ModalComponent,
    Card,
  },
}
</script>

<style lang="scss">
.kvass-media-type-editor {
  .kvass-card {
    max-width: 700px;
    width: 100%;
  }
}
</style>
