<script lang="ts">
  let { isOpen }: { isOpen: boolean } = $props();
</script>

{#if isOpen}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="22"
    viewBox="0 0 21 22"
    fill="none"
  >
    <mask
      id="mask0_10256_2576"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="21"
      height="22"
    >
      <rect y="0.5" width="21" height="21" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_10256_2576)">
      <path
        d="M7.7875 17.9996L6.5625 16.7746L10.5 12.8371L14.4375 16.7746L13.2125 17.9996L10.5 15.2871L7.7875 17.9996ZM10.5 9.16213L6.5625 5.22463L7.7875 3.99963L10.5 6.71213L13.2125 3.99963L14.4375 5.22463L10.5 9.16213Z"
        fill="#222222"
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
      id="mask0_10256_5913"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="21"
      height="22"
    >
      <rect y="0.5" width="21" height="21" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_10256_5913)">
      <path
        d="M10.5 18.8756L6.5625 14.9381L7.83125 13.6694L10.5 16.3381L13.1688 13.6694L14.4375 14.9381L10.5 18.8756ZM7.83125 8.41938L6.5625 7.15063L10.5 3.21313L14.4375 7.15063L13.1688 8.41938L10.5 5.75063L7.83125 8.41938Z"
        fill="#222222"
      />
    </g>
  </svg>
{/if}
