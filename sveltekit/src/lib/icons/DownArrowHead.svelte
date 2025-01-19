<script lang="ts">
  let { opacity = "", fillColor }: { opacity?: string; fillColor: string } =
    $props();
</script>

<svg
  class="-mr-1 h-5 w-5 text-gray-400 {opacity} "
  width="25"
  height="24"
  viewBox="0 0 25 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.4995 15.3746L6.49951 9.37461L7.89951 7.97461L12.4995 12.5746L17.0995 7.97461L18.4995 9.37461L12.4995 15.3746Z"
    fill={fillColor}
  />
</svg>
