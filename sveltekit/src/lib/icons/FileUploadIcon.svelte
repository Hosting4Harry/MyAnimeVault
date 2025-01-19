<script lang="ts">
  let { size = "small" }: { size?: "small" | "large" } = $props();
</script>

{#if size === "small"}
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="upload_file">
      <mask
        id="mask0_2968_4420"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="21"
      >
        <rect id="Bounding box" width="21" height="21" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2968_4420)">
        <path
          id="upload_file_2"
          d="M9.62549 16.625H11.3755V12.9719L12.7755 14.3719L14.0005 13.125L10.5005 9.625L7.00049 13.125L8.24736 14.35L9.62549 12.9719V16.625ZM5.25049 19.25C4.76924 19.25 4.35726 19.0786 4.01455 18.7359C3.67184 18.3932 3.50049 17.9813 3.50049 17.5V3.5C3.50049 3.01875 3.67184 2.60677 4.01455 2.26406C4.35726 1.92135 4.76924 1.75 5.25049 1.75H12.2505L17.5005 7V17.5C17.5005 17.9813 17.3291 18.3932 16.9864 18.7359C16.6437 19.0786 16.2317 19.25 15.7505 19.25H5.25049ZM11.3755 7.875V3.5H5.25049V17.5H15.7505V7.875H11.3755Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
{:else}
  <svg
    width="65"
    height="65"
    viewBox="0 0 65 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="upload_file">
      <mask
        id="mask0_9837_5308"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="65"
        height="65"
      >
        <rect
          id="Bounding box"
          x="0.5"
          y="0.5"
          width="64"
          height="64"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_9837_5308)">
        <path
          id="upload_file_2"
          d="M29.8307 51.1615H35.1641V40.0281L39.4307 44.2948L43.1641 40.4948L32.4974 29.8281L21.8307 40.4948L25.6307 44.2281L29.8307 40.0281V51.1615ZM16.4974 59.1615C15.0307 59.1615 13.7752 58.6392 12.7307 57.5948C11.6863 56.5503 11.1641 55.2948 11.1641 53.8281V11.1615C11.1641 9.69479 11.6863 8.43924 12.7307 7.39479C13.7752 6.35035 15.0307 5.82812 16.4974 5.82812H37.8307L53.8307 21.8281V53.8281C53.8307 55.2948 53.3085 56.5503 52.2641 57.5948C51.2196 58.6392 49.9641 59.1615 48.4974 59.1615H16.4974ZM35.1641 24.4948V11.1615H16.4974V53.8281H48.4974V24.4948H35.1641Z"
          fill="currentColor"
        />
      </g>
    </g>
  </svg>
{/if}
