<script lang="ts">
  let {
    fillColor = "#1C1B1F",
    height = 19,
    width = 18,
  }: { fillColor?: string; height?: number; width?: number } = $props();
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8.25 10.25H3.75V8.75H8.25V4.25H9.75V8.75H14.25V10.25H9.75V14.75H8.25V10.25Z"
    fill={fillColor}
  />
</svg>
