<script lang="ts">
  let { fillColor = "#98C43D" }: { fillColor?: string } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="21"
  height="22"
  viewBox="0 0 21 22"
  fill="none"
>
  <mask
    id="mask0_12541_6969"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="21"
    height="22"
  >
    <rect y="0.5" width="21" height="21" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_12541_6969)">
    <path
      d="M4.375 18.875C3.89375 18.875 3.48177 18.7036 3.13906 18.3609C2.79635 18.0182 2.625 17.6062 2.625 17.125V4.875C2.625 4.39375 2.79635 3.98177 3.13906 3.63906C3.48177 3.29635 3.89375 3.125 4.375 3.125H10.5V4.875H4.375V17.125H10.5V18.875H4.375ZM14 15.375L12.7969 14.1062L15.0281 11.875H7.875V10.125H15.0281L12.7969 7.89375L14 6.625L18.375 11L14 15.375Z"
      fill={fillColor}
    />
  </g>
</svg>
