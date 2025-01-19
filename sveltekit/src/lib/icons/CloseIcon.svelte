<script lang="ts">
  let {
    height = "21",
    width = "21",
    fillColor = "#222222",
  }: { height?: string; width?: string; fillColor?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={height}
  height={width}
  viewBox="0 0 21 21"
  fill="none"
>
  <mask
    id="mask0_10130_34825"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="21"
    height="21"
  >
    <rect width="21" height="21" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_10130_34825)">
    <path
      d="M5.6 16.625L4.375 15.4L9.275 10.5L4.375 5.6L5.6 4.375L10.5 9.275L15.4 4.375L16.625 5.6L11.725 10.5L16.625 15.4L15.4 16.625L10.5 11.725L5.6 16.625Z"
      fill={fillColor}
    />
  </g>
</svg>
