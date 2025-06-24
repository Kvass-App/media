import CreateTrigger from './CreateTrigger'
import Thumbnail from './Thumbnail'
import Preview from './Preview'
import FocusPoint from './FocusPoint'

export default {
  name: 'Image',
  condition: (x) => {
    return /^image\/.+/i.test(x.type)
  },
  components: {
    CreateTrigger,
    Thumbnail,
    Preview,
    FocusPoint,
  },
}
