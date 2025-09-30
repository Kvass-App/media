<template>
    <div id="app">
        <h1>Media Component Demo</h1>
        <p>
            Drag & drop an image below or browse to upload.
        </p>
        <media-component
            v-model="media"
            :multiple="true"
            :tags="true"
            :description="true"
            label="My Media Libriary"
            sublabel="Supports multiple images, tags and descriptions."
            style="height: 400px;"
        />

        <div class="data-preview">
            <h3>Live v-model data:</h3>
            <pre>{{ media }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            media: [],
        };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arian, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 60px;
}
.data-preview {
    margin-top: 2rem;
    background-color: #f3f3f3;
    padding: 1rem;
    border-radius: 8px;
}
pre {
    white-space: pre-wrap;
    word-break: break-all;
}
</style>