<script lang="ts">
  let {
    fillColor = "currentColor",
    filled = true,
  }: { fillColor?: string; filled?: boolean } = $props();
</script>

{#if !filled}
  <svg
    width="21"
    height="22"
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Group">
      <mask
        id="mask0_9405_10497"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="22"
      >
        <rect id="Bounding box" y="0.5" width="21" height="21" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_9405_10497)">
        <path
          id="Icon"
          d="M10.5 12.7506L0.875 7.50061L10.5 2.25061L20.125 7.50061L10.5 12.7506ZM10.5 16.2506L1.37813 11.285L3.21563 10.2787L10.5 14.26L17.7844 10.2787L19.6219 11.285L10.5 16.2506ZM10.5 19.7506L1.37813 14.785L3.21563 13.7787L10.5 17.76L17.7844 13.7787L19.6219 14.785L10.5 19.7506ZM10.5 10.76L16.4719 7.50061L10.5 4.24124L4.52813 7.50061L10.5 10.76Z"
          fill={fillColor}
        />
      </g>
    </g>
  </svg>
{:else}
  <svg
    width="21"
    height="18"
    viewBox="0 0 21 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="stacks"
      d="M10.5 10.7506L0.875 5.50061L10.5 0.25061L20.125 5.50061L10.5 10.7506ZM10.5 14.2506L1.37813 9.28498L3.21563 8.27873L10.5 12.26L17.7844 8.27873L19.6219 9.28498L10.5 14.2506ZM10.5 17.7506L1.37813 12.785L3.21563 11.7787L10.5 15.76L17.7844 11.7787L19.6219 12.785L10.5 17.7506Z"
      fill={fillColor}
    />
  </svg>
{/if}
