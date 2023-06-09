<script lang="ts">
  import { enhance } from '$app/forms';

  // TODO: Improve type-safety
  export let form;
  
</script>
{#if form?.message}
  <p>{form?.message}</p>
{/if}
<form method="post" use:enhance>
  <input type="email" name="email" id="email" placeholder="E-mail" class:invalid={form?.invalids?.email}>
  <br>
  <input type="password" name="password" id="password" placeholder="Password" class:invalid={form?.invalids?.password}>
  <br>
  <button type="submit">Login</button>
</form>

<style>
  .invalid{
    border: 1px solid red;
  }
</style>