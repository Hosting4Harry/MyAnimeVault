<script lang="ts">
  let { fillColor = "#222222" }: { fillColor?: string } = $props();
</script>

<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <mask
    id="mask0_2968_4929"
    style="mask-type:alpha"
    maskUnits="userSpaceOnUse"
    x="0"
    y="0"
    width="20"
    height="20"
  >
    <rect width="20" height="20" fill="#D9D9D9" />
  </mask>
  <g mask="url(#mask0_2968_4929)">
    <path
      d="M5.33268 15.8346L4.16602 14.668L8.83268 10.0013L4.16602 5.33464L5.33268 4.16797L9.99935 8.83464L14.666 4.16797L15.8327 5.33464L11.166 10.0013L15.8327 14.668L14.666 15.8346L9.99935 11.168L5.33268 15.8346Z"
      fill={fillColor}
    />
  </g>
</svg>
