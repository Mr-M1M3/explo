<script lang="ts">
  import { toastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";

  import { enhance } from "$app/forms";
  export let form;

  let invalids: Record<string, string> = {};
  $: if (form) {
    console.dir(form);
    invalids = {};
    if (!form.ok) {
      if (form.reason === "invalid") {
        for (let [key, val] of Object.entries(form.invalids)) {
          invalids[key] = val;
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
  method="post"
  class="max-w-xl flex flex-col gap-4 mx-auto my-8"
  use:enhance
>
  <label for="nickname" class="label">
    <span>Nickname</span>
    <input
      type="text"
      id="nickname"
      name="nickname"
      placeholder="Nickname"
      class="input"
      class:input-error={invalids["nickname"]}
    />
    <span class="capitalize text-red-500" class:hidden={!invalids["nickname"]}
      >{invalids["nickname"]}</span
    >
  </label>
  <label for="full-name">
    <span>Full name</span>
    <input
      type="text"
      id="full-name"
      name="full_name"
      placeholder="Full name"
      class="input"
      class:input-error={invalids["full_name"]}
    />
    <span class="capitalize text-red-500" class:hidden={!invalids["full_name"]}
      >{invalids["full_name"]}</span
    >
  </label>

  <fieldset class="grid grid-cols-[0.75fr_0.25fr] gap-4">
    <label for="school">
      <span>School</span>
      <input
        type="text"
        id="school"
        name="school"
        placeholder="School"
        class="input"
        class:input-error={invalids["school"]}
      />
      <span class="capitalize text-red-500" class:hidden={!invalids["school"]}
        >{invalids["school"]}</span
      >
    </label>
    <label for="ssc-batch">
      <span>SSC Batch</span>
      <input
        type="number"
        min="2019"
        max="2023"
        id="ssc-batch"
        name="ssc_batch"
        placeholder="SSC Batch"
        class="input"
        class:input-error={invalids["ssc_batch"]}
      />
      <span
        class="capitalize text-red-500"
        class:hidden={!invalids["ssc_batch"]}>{invalids["ssc_batch"]}</span
      >
    </label>
  </fieldset>

  <label for="email">
    <span>Email</span>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="E-Mail"
      class="input"
      class:input-error={invalids["email"]}
    />
    <span class="capitalize text-red-500" class:hidden={!invalids["email"]}
      >{invalids["email"]}</span
    >
  </label>
  <label for="password">
    <span>Password</span>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Password"
      class="input"
      class:input-error={invalids["password"]}
    />
    <span class="capitalize text-red-500" class:hidden={!invalids["password"]}
      >{invalids["password"]}</span
    >
  </label>
  <label for="password-confirm">
    <span>Password confirm</span>
    <input
      type="password"
      id="password-confirm"
      name="passwordConfirm"
      placeholder="Confirm password"
      class="input"
      class:input-error={invalids["passwordConfirm"]}
    />
    <span
      class="capitalize text-red-500"
      class:hidden={!invalids["passwordConfirm"]}
      >{invalids["passwordConfirm"]}</span
    >
  </label>
  <button type="submit" class="btn variant-soft">Signup</button>
</form>
