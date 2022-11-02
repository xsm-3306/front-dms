<template>
    <head>
        <title>404 Not Found</title>
    </head>
    <body>
        <h1>Not Found</h1>

        <p>The request URL {{url}} was not found on this server</p>
    </body>
    
    
</template>

<script setup>
    import router from '../router';
    const url=router.currentRoute.value.fullPath
</script>