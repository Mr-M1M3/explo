<script lang="ts">
  import { enhance } from "$app/forms";
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { browser } from "$app/environment";

//   ATTENTION: could it be implemented using `form` prop only?
  const enhancer: SubmitFunction = () => {
    return ({ result, update }) => {
      console.log(result);

      if (result.type === "failure") {
        console.log(result);

        if (result.data?.reason === "client-error") {
          if (browser) {
            const toast_message: ToastSettings = {
              message: result.data?.message,
              autohide: false,
            };
            toastStore.trigger(toast_message);
          }
        }
        if (result.data?.reason === "invalid") {
          if (browser) {
            for (let [key, val] of Object.entries(result.data.invalids)) {
              const toast_message: ToastSettings = {
                message: `${key}: ${val}`,
              };
              toastStore.trigger(toast_message);
            }
          }
        }
      }
      update();
    };
  };
</script>

<form
  method="POST"
  class="max-w-xl flex flex-col gap-4 mx-auto my-8"
  use:enhance={enhancer}
>
  <label for="email" class="label">
    <span>Email</span>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="E-mail"
      class="input"
    />
  </label>
  <label for="password" class="label">
    <span>Password</span>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      class="input"
    />
  </label>

  <button class="btn variant-soft">Login</button>
</form>
