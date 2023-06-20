<script lang="ts">
  import { enhance } from "$app/forms";
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";

  export let form;

  let invalids: Record<string, string> = {};
  $: if (form) {
    console.dir(form);
    invalids = {};
    if (!form.ok) {
      if (form.reason === "invalid") {
        for (let [key, val] of Object.entries(form.invalids)) {
          invalids[key] = val as string;
        }
      }
      if (form.reason === "client-error") {
        const toast_msg: ToastSettings = {
          message: form.message,
        };
        toastStore.trigger(toast_msg);
      }
    }
  }
</script>

<form
  method="POST"
  class="max-w-xl flex flex-col gap-4 mx-auto my-8"
  use:enhance
>
  <label for="email" class="label">
    <span>Email</span>
    <input
      type="text"
      name="email"
      id="email"
      placeholder="E-mail"
      class="input"
      class:input-error={invalids["email"]}
    />
    <span class="capitalize text-red-500" class:hidden={!invalids["email"]}
      >{invalids["email"]}</span
    >
  </label>
  <label for="password" class="label">
    <span>Password</span>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      class="input"
      class:input-error={invalids["password"]}
    />
    <span class="capitalize text-red-500" class:hidden={!invalids["password"]}
      >{invalids["password"]}</span
    >
  </label>

  <button class="btn variant-soft">Login</button>
</form>
