<script lang="ts">
  import { clsx } from "clsx"; // For conditional class handling

  let {
    checked = $bindable(),
    color = "#000000",
    onCheckedChange,
    class: customClass = "",
    disabled = false,
    id,
    indeterminate = false,
  }: {
    checked?: boolean;
    color?: string;
    onCheckedChange?: (checked: boolean | undefined) => void;
    class?: string;
    disabled?: boolean;
    id?: string;
    indeterminate?: boolean;
  } = $props();

  const checkboxClass = clsx(
    "appearance-none align-middle rounded-sm bg-center bg-cover border-2  min-w-16px w-4 h-4",
    {
      "border-[#000000] cursor-pointer": !disabled,

      "hover:border-[#98c43d] checked:border-[#98c43d] checked:bg-[url('/images/icon-check-parrot.svg')]":
        color === "#98c43d" && !disabled,

      "hover:border-[#000000] checked:border-[#000000] checked:bg-[url('/images/icon-check.svg')] indeterminate:bg-[url('/images/icon-indeterminate-check.svg')]":
        color === "#000000" && !disabled,

      "hover:border-[#0A84FF] checked:border-[#0A84FF] checked:bg-[url('/images/icon-check-blue.svg')]":
        color === "#0A84FF" && !disabled,

      "border-[#666666] checked:border-[#666666] checked:bg-[url('/images/icon-check-gray.svg')] cursor-not-allowed":
        disabled,
    },
    customClass // Additional classes passed from the parent
  );
</script>

<input
  {id}
  type="checkbox"
  bind:checked
  onchange={() => !disabled && onCheckedChange?.(checked)}
  class={checkboxClass}
  {disabled}
  {indeterminate}
/>
