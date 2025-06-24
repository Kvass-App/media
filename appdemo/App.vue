<template>
  <div id="app">
    <div class="container">
    
      <div class="component-wrapper">
        <media-component 
          v-model="mediaData"
          @change="onMediaChange"
          @focus-point-changed="onFocusPointChanged"
          :upload="uploadFunction"
          :multiple="true"
          :size="'contain'"
          :placement="'outside'"
        />
      </div>
      
      <div class="data-display" v-if="mediaData && mediaData.length > 0">
        <h3>📊 Opplastet Data:</h3>
        <pre>{{ JSON.stringify(mediaData, null, 2) }}</pre>
      </div>
      
    
    </div>
  </div>
</template>

<script>
import MediaComponent from '../src/Component.vue'

export default {
  name: 'App',
  components: { 
    MediaComponent 
  },
  data() {
    return {
      mediaData: [],
      focusPointData: null
    }
  },
  methods: {
    onMediaChange(data) {
      this.mediaData = data || [];
    },
    onFocusPointChanged(focusPoint) {
      this.focusPointData = focusPoint;
      
    },
    uploadFunction: async (file, onProgress) => {
      return new Promise(resolve => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          if (onProgress) {
            onProgress(progress);
          }
          if (progress >= 100) {
            clearInterval(interval);
            const result = {
              url: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              type: file.type,
            };
            resolve(result);
          }
        }, 100);
      });
    },
  },
  watch: {
    mediaData: {
      handler(newVal, oldVal) {
        // Media data changed
      },
      deep: true,
    },
    focusPointData: {
      handler(newVal) {
        // Focus point data changed
      },
    },
  },
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
}

#app {
  padding: 100px 50px;
}

.container {
  
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 30px;

}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.component-wrapper {
  border: 2px dashed #ddd;
  border-radius: 20px;
  margin: 20px 0;
  
  width: 100%;
}

/* Gjør preview-komponenten mye større */
.component-wrapper .kvass-media {
  width: 100%;
  height: 100%;
}

.component-wrapper .kvass-media-image-preview {
  min-height: 500px !important;
  height: 500px !important;
  width: 100% !important;
}

.component-wrapper .kvass-media-image-preview__background {
  min-height: 500px !important;
  height: 500px !important;
  width: 100% !important;
  background-size: contain !important;
  background-position: center !important;
}

.component-wrapper .kvass-media__thumbnails {
  margin-top: 20px;
}

.data-display {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
}

.data-display pre {
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.focus-point-info {
  background: #e3f2fd;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  border-left: 4px solid #2196f3;
}

.focus-point-info h3 {
  margin-top: 0;
  color: #2196f3;
}

.focus-point-info pre {
  font-family: monospace;
  font-size: 14px;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.debug-info {
  background: #e9ecef;
  padding: 15px;
  border-radius: 6px;
  margin-top: 20px;
  border-left: 4px solid #007bff;
}

.debug-info h3 {
  margin-top: 0;
  color: #007bff;
}

.debug-info p {
  margin: 5px 0;
  text-align: left;
  font-family: monospace;
}
</style> 