<script lang="ts">
  import { enhance } from '$app/forms';
  export let form;
  $: console.log(form);
  
</script>
<form method="post" use:enhance>
    <input type="text" name="nickname" placeholder="Nickname">
    <br>
    <input type="text" name="full_name" placeholder="Full name">
    <br>
    <input type="school" name="school" placeholder="School">
    <br>
    <input type="number" name="ssc_batch" placeholder="SSC Batch">
    <br>
    <input type="email" name="email" placeholder="E-Mail">
    <br>
    <input type="password" name="password" placeholder="Password">
    <br>
    <input type="password" name="passwordConfirm" placeholder="Confirm password">
    <br>
    <button type="submit">Signup</button>
</form>