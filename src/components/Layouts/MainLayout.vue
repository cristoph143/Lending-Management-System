<template>
    <q-layout view="hHh lpR fFf">
    
        <q-header elevated class="bg-primary text-white">
        <q-toolbar>
            <q-btn dense flat round icon="menu" aria-label="Menu" />
            <q-toolbar-title>Quasar App</q-toolbar-title>
        </q-toolbar>
        </q-header>
    
        <q-page-container>
        <router-view />
        </q-page-container>
    
        <q-footer elevated class="bg-primary text-white">
        <q-toolbar>
            <q-toolbar-title>Quasar App</q-toolbar-title>
        </q-toolbar>
        </q-footer>
    
    </q-layout>
</template>

<script>
export default {
    name: "MainLayout",
    components: {},
    data() {
        return {};
    },
    computed: {},
    methods: {},
    created() {},
    mounted() {},
    beforeUnmount() {},

}
</script>


<style>


</style>