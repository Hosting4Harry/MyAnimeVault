<script lang="ts">
  let { opacity="", fillColor }: { opacity?: string; fillColor: string } = $props();
</script>

<svg
  class="-mr-[1px] h-5 w-5 text-gray-400 {opacity}"
  width="21"
  height="20"
  viewBox="-5 -6 21 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8.825 6.5L5 2.68333L1.175 6.5L0 5.325L5 0.325L10 5.325L8.825 6.5Z"
    fill={fillColor}
  />
</svg>
