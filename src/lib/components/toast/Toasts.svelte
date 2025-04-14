<script lang="ts">
  import {
    toasts,
    dismissToast,
    type ToastPosition,
  } from "$lib/store/toast-store";
  import Toast from "$lib/components/toast/Toast.svelte";

  let { position = "bottom-right" }: { position?: ToastPosition } = $props();

  let toastPosition = $derived.by(() => {
    return {
      "bottom-left": "bottom-0 left-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "top-right": "top-0 right-0",
    }[position];
  });
</script>

{#if $toasts}
  <div class="fixed z-[9999999] flex flex-col gap-2 p-4 {toastPosition}">
    {#each $toasts as toast (toast.id)}
      <Toast
        type={toast.type}
        dismissible={toast.dismissible}
        dismissToast={() => dismissToast(toast.id as number)}
        {position}
      >
        {toast.message}
      </Toast>
    {/each}
  </div>
{/if}
