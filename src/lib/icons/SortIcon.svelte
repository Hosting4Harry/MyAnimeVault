<script lang="ts">
  let { fillColor1, fillColor2 }: { fillColor1: string; fillColor2: string } =
    $props();
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M12 18L7 13H17L12 18Z" fill={fillColor1} />
  <path d="M7 11L12 6L17 11H7Z" fill={fillColor2} />
</svg>
