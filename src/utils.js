import * as Mime from 'mime/lite'

function AttributeBoolean(key) {
  return function () {
    return ['', true, 'true'].includes(this.$attrs[key])
  }
}

function BytesToSize(bytes) {
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function Clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function IsAccepted(file, accept) {
  if (!accept) return true
  return accept
    .split(',')
    .map((v) => v.trim())
    .some((v) => {
      if (v.startsWith('.')) {
        let type = Mime.getType(v.substring(1))
        return type === file.type
      }
      if (v.includes('*')) return file.type.startsWith(v.replace('*', ''))
      return file.type === v
    })
}

export { AttributeBoolean, BytesToSize, Clone, IsAccepted }
