import Vue from 'vue';
import App from './App.vue';
import { MediaComponent, setup } from '../index.js';

setup({
    upload: (file, onProgress) => {
        console.log('Starting mock upload for:', file.name)
        return new Promise((resolve, reject) => {
            let progress = 0
            const interval = setInterval(() => {
                progress += 25
                onProgress(progress)
                if (progress >= 100) {
                    clearInterval(interval)
                    let reader = new FileReader()
                    reader.onloadend = function () {
                        console.log('Mock upload finished.')
                        resolve({
                            url: reader.result,
                            type: file.type,
                            name: file.name,
                        })
                    }
                    reader.readAsDataURL(file)
                }
            }, 250)
        })
    },
})

Vue.component('media-component', MediaComponent);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app')