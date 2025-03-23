<script lang="ts">
  import { fly } from "svelte/transition";
  import SuccessIcon from "$lib/icons/SuccessIcon.svelte";
  import ErrorIcon from "$lib/icons/ErrorIcon.svelte";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import clsx from "clsx";
  import type { ToastType } from "$lib/store/toast-store";
  import WarningIcon from "$lib/icons/WarningIcon.svelte";
  import InformationIcon from "$lib/icons/InformationIcon.svelte";

  let {
    type = "error",
    dismissible = true,
    dismissToast,
    position,
    children,
  }: {
    type?: ToastType;
    dismissible?: boolean;
    dismissToast?: () => void;
    position: string;
    children: any;
  } = $props();

  let xValue = $derived.by(() => {
    return ["bottom-right", "top-right"].includes(position) ? 100 : -100;
  });
</script>

<div
  class={clsx(
    "text-white p-3.5 rounded-[3px] flex items-start justify-between mx-auto mb-2 w-80 shadow-md",
    {
      "bg-[#313131]": type === "default",
      "bg-[#43a047]": type === "success",
      "bg-[#d32f2f]": type === "error",
      "bg-[#ff9800]": type === "warning",
      "bg-[#2196f3]": type === "info",
    }
  )}
  role="alert"
  in:fly={{ x: xValue, duration: 250 }}
  out:fly={{ x: xValue, duration: 250 }}
>
  <div class="flex items-start justify-center">
    {#if type === "success"}
      <SuccessIcon />
    {:else if type === "error"}
      <ErrorIcon />
    {:else if type === "info"}
      <InformationIcon />
    {:else if type === "warning"}
      <WarningIcon />
    {/if}

    <div class="leading-[16px] font-normal text-[0.875rem] mt-[2px]">
      {@render children()}
    </div>
  </div>

  {#if dismissible}
    <button
      class="text-white bg-transparent border-0 margin-0 leading-[16px] font-normal text-[0.875rem]"
      onclick={() => dismissToast?.()}
    >
      <CloseIcon fillColor="#ffffff" />
    </button>
  {/if}
</div>
