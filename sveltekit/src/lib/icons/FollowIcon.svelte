<script lang="ts">
  let { fillColor = "#0A84FF" }: { fillColor?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="21"
  height="21"
  viewBox="0 0 21 21"
  fill="none"
>
  <mask
    id="mask0_10541_8851"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="21"
    height="21"
  >
    <rect width="21" height="21" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_10541_8851)">
    <path
      d="M14.002 6.12537L12.7551 7.35037L16.7801 11.3754L12.7551 15.4004L14.002 16.6254L19.252 11.3754L14.002 6.12537ZM1.75195 4.37537V7.87537C1.75195 9.08578 2.17852 10.1176 3.03164 10.9707C3.88477 11.8238 4.91654 12.2504 6.12695 12.2504H11.5301L8.38008 15.4004L9.62695 16.6254L14.877 11.3754L9.62695 6.12537L8.38008 7.35037L11.5301 10.5004H6.12695C5.39779 10.5004 4.77799 10.2452 4.26758 9.73474C3.75716 9.22432 3.50195 8.60453 3.50195 7.87537V4.37537H1.75195Z"
      fill={fillColor}
    />
  </g>
</svg>
