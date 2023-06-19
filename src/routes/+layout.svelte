<script lang="ts">
  import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import Nav from "$lib/client/components/Nav.svelte";
</script>

<svelte:head>
  <!-- google fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
<link href="https://fonts.googleapis.com/css2?family=Merienda:wght@900&display=swap" rel="stylesheet">
</svelte:head>

<main class="max-w-screen-xl mx-auto my-2">
  <Nav />
  <slot />
</main>
