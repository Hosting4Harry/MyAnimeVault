<script lang="ts">
  let {
    fillColor = "#262626",
    // fillColor = "#111928",
    direction = "up",
  }: { fillColor?: string; direction: "up" | "down" | "right" | "left" } =
    $props();
</script>

{#if direction === "up"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <mask
      id="mask0_5663_11406"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="21"
      height="21"
    >
      <rect
        width="21"
        height="21"
        transform="matrix(1 0 0 -1 0 21)"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_5663_11406)">
      <path
        d="M10.5 6.99961L5.25 12.2496L6.475 13.4746L10.5 9.44961L14.525 13.4746L15.75 12.2496L10.5 6.99961Z"
        fill={fillColor}
      />
    </g>
  </svg>
{:else if direction === "down"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <mask
      id="mask0_5663_11407"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="21"
      height="21"
    >
      <rect width="21" height="21" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_5663_11407)">
      <path
        d="M10.5 13.4535L5.25 8.20352L6.475 6.97852L10.5 11.0035L14.525 6.97852L15.75 8.20352L10.5 13.4535Z"
        fill={fillColor}
      />
    </g>
  </svg>
{:else if direction === "right"}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <mask
      id="mask0_10952_17058"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="21"
      height="21"
    >
      <rect width="21" height="21" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_10952_17058)">
      <path
        d="M11.025 10.5L7 6.475L8.225 5.25L13.475 10.5L8.225 15.75L7 14.525L11.025 10.5Z"
        fill={fillColor}
      />
    </g>
  </svg>
{:else if direction === "left"}
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="21"
  height="21"
  viewBox="0 0 21 21"
  fill="none"
>
  <mask
    id="mask0_10952_17058"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="21"
    height="21"
  >
    <rect width="21" height="21" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_10952_17058)">
    <path
      d="M9.975 10.5L14 6.475L12.775 5.25L7.525 10.5L12.775 15.75L14 14.525L9.975 10.5Z"
      fill={fillColor}
    />
  </g>
</svg>
{/if}
