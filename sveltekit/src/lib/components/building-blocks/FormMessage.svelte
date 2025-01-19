<script lang="ts">
  let {
    message,
    type = "Error",
    errorClass = "",
  }: {
    message: string;
    type?: "Success" | "Error";
    errorClass?: string | undefined;
  } = $props();
</script>

{#if message?.length > 0}
  <p
    class="text-sm {type === 'Success'
      ? 'text-[#09814A]'
      : 'text-red'} pt-2 {errorClass}"
  >
    {message}
  </p>
{/if}
