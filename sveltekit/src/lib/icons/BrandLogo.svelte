<script lang="ts">
  let {
    width,
    height,
    fillColor1,
    fillColor2,
  }: {
    height?: string;
    width?: string;
    fillColor1?: string;
    fillColor2?: string;
  } = $props();
</script>

<svg
  width={width || "36"}
  height={height || "26"}
  viewBox="0 0 36 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="IA symbol" filter="url(#filter0_d_9056_7526)">
    <path
      d="M4.19666 9.46358C3.93445 9.20755 3.93445 8.79245 4.19666 8.53642L12.7426 0.19202C13.0048 -0.0640067 13.43 -0.0640068 13.6922 0.19202L22.2381 8.53642C22.5003 8.79245 22.5003 9.20755 22.2381 9.46358L13.6922 17.808C13.43 18.064 13.0048 18.064 12.7426 17.808L4.19666 9.46358Z"
      fill={fillColor1 || "#09814A"}
    />
    <path
      d="M13.7619 9.46358C13.4997 9.20755 13.4997 8.79245 13.7619 8.53642L22.3078 0.19202C22.57 -0.0640067 22.9952 -0.0640068 23.2574 0.19202L31.8033 8.53642C32.0656 8.79245 32.0656 9.20755 31.8033 9.46358L23.2574 17.808C22.9952 18.064 22.57 18.064 22.3078 17.808L13.7619 9.46358Z"
      fill={fillColor2 || "#98C43D"}
    />
  </g>
  <defs>
    <filter
      id="filter0_d_9056_7526"
      x="0"
      y="0"
      width="36"
      height="26"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset dy="4" />
      <feGaussianBlur stdDeviation="2" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow_9056_7526"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow_9056_7526"
        result="shape"
      />
    </filter>
  </defs>
</svg>
