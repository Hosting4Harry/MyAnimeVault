<script lang="ts">
  const {
    filled = true,
    fillColor = "currentColor",
  }: { filled?: boolean; fillColor?: string } = $props();
</script>

{#if !filled}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <mask
      id="mask0_10130_35914"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="22"
      height="22"
    >
      <rect x="0.5" y="0.5" width="21" height="21" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_10130_35914)">
      <path
        d="M11 17.1256L4.875 11.0006L11 4.87561L17.125 11.0006L11 17.1256ZM11 14.6319L14.6313 11.0006L11 7.36936L7.36875 11.0006L11 14.6319Z"
        fill={fillColor || "#222222"}
      />
    </g>
  </svg>
{:else}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="22"
    viewBox="0 0 21 22"
    fill="none"
  >
    <mask
      id="mask0_10130_34813"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="21"
      height="22"
    >
      <rect y="0.5" width="21" height="21" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_10130_34813)">
      <path
        d="M10.5 17.1247L4.375 10.9997L10.5 4.87469L16.625 10.9997L10.5 17.1247Z"
        fill={fillColor || "#0A84FF"}
      />
    </g>
  </svg>
{/if}
