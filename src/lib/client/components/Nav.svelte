<script>
    import { AppBar } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <h1 class="text-3xl font-logo">Explo</h1>
    </svelte:fragment>
    <svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>