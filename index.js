import MediaComponent from './src/Component.vue'

const Options = {
  upload(file, onProgress) {
    console.warn('[@kvass/media]: You need to setup the upload function before using this plugin')
    onProgress(50)
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onloadend = function () {
        resolve({
          url: reader.result,
          type: file.type,
        })
      }
      reader.readAsDataURL(file)
    })
  },
  serialize(val) {
    return val
  },
  dropMessage: 'Drag an image here or <b>browse</b> to upload.',
  labels: {
    image: 'Image',
    save: 'Save',
    cancel: 'Cancel',
    select: 'Select',
    descriptionPlaceholder: 'Add caption...',
    tagsPlaceholder: 'Add tag...',
    selectMessage: 'Select a type from the menu',
    dragInstructions: 'Click or drag to set the focus point',
    focusPointTitle: 'Focus Point Previews',
    focusPointDescription: 'How the image will be cropped in different layouts.',
    resetFocusPoint: 'Reset focus point',
  },
}

const install = (Vue) => {
  Vue.component('media-component', MediaComponent)
}

const setup = (options) => {
  for (let key in options) {
    if (!(key in Options)) return
    Options[key] = options[key]
  }
}

export default {
  install,
}

export { MediaComponent, install as MediaComponentInstaller, setup, Options }
