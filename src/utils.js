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

/**
 * Utility functions for focus point handling
 */

/**
 * Get focus point from image data
 * @param {Object} imageData - Image data object
 * @returns {Object|null} Focus point coordinates {x, y} or null
 */
export function getFocusPoint(imageData) {
  return imageData?.focusPoint || null
}

/**
 * Set focus point on image data
 * @param {Object} imageData - Image data object
 * @param {Object} focusPoint - Focus point coordinates {x, y}
 * @returns {Object} Updated image data
 */
export function setFocusPoint(imageData, focusPoint) {
  return {
    ...imageData,
    focusPoint,
  }
}

/**
 * Remove focus point from image data
 * @param {Object} imageData - Image data object
 * @returns {Object} Updated image data
 */
export function removeFocusPoint(imageData) {
  const { focusPoint, ...rest } = imageData
  return rest
}

/**
 * Check if image has a focus point
 * @param {Object} imageData - Image data object
 * @returns {Boolean} True if image has focus point
 */
export function hasFocusPoint(imageData) {
  return !!getFocusPoint(imageData)
}

/**
 * Get CSS background position from focus point
 * @param {Object} focusPoint - Focus point coordinates {x, y}
 * @returns {String} CSS background position value
 */
export function getBackgroundPosition(focusPoint) {
  // Returnerer alltid 'center' for å unngå zooming-effekt
  // Fokuspunktet lagres fortsatt for fremtidig bruk (f.eks. ved beskjæring)
  return 'center'
}

/**
 * Validate focus point coordinates
 * @param {Object} focusPoint - Focus point coordinates {x, y}
 * @returns {Boolean} True if coordinates are valid
 */
export function isValidFocusPoint(focusPoint) {
  if (!focusPoint) return false
  return (
    typeof focusPoint.x === 'number' &&
    typeof focusPoint.y === 'number' &&
    focusPoint.x >= 0 &&
    focusPoint.x <= 1 &&
    focusPoint.y >= 0 &&
    focusPoint.y <= 1
  )
}

export { AttributeBoolean, BytesToSize, Clone, IsAccepted }
