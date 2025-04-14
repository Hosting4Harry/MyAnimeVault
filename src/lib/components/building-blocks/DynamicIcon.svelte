<script lang="ts">
  import type { Component } from "svelte";
  let {
    icon,
    fillColor = "currentColor",
  }: { icon: string; fillColor?: string } = $props();

  async function getIcon(iconName: string): Promise<Component> {
    try {
      switch (iconName) {
        case "heart":
          return (await import("$lib/icons/HeartIcon.svelte")).default;
        case "lock":
          return (await import("$lib/icons/LockIcon.svelte")).default;
        case "settings":
          return (await import("$lib/icons/SettingsIcon.svelte")).default;
        case "billing":
          return (await import("$lib/icons/CreditCardIcon.svelte")).default;
        case "api":
          return (await import("$lib/icons/APIIcon.svelte")).default;
        case "paypal":
          return (await import("$lib/icons/PayPalIcon.svelte")).default;
        case "master-card":
          return (await import("$lib/icons/MasterCardIcon.svelte")).default;
        case "visa":
          return (await import("$lib/icons/VisaIcon.svelte")).default;
        case "bank":
          return (await import("$lib/icons/BankIcon.svelte")).default;
        case "organization":
        case "appartment":
          return (await import("$lib/icons/AppartmentIcon.svelte")).default;
        case "group":
          return (await import("$lib/icons/GroupIcon.svelte")).default;
        case "unit":
          return (await import("$lib/icons/UnitIcon.svelte")).default;
        case "us-flag":
          return (await import("$lib/icons/FlagUS.svelte")).default;
        case "canada-flag":
          return (await import("$lib/icons/FlagCanada.svelte")).default;
        default:
          return (await import("$lib/icons/SettingsIcon.svelte")).default;
      }
    } catch (error) {
      console.error("Error loading icon:", error);
      return (await import("$lib/icons/SettingsIcon.svelte")).default;
    }
  }

  const Icon = $derived(getIcon(icon));
</script>

{#await Icon}
  <!-- Optional loading state -->
{:then IconComponent}
  <IconComponent {fillColor} />
{:catch error}
  <!-- Optional error handling -->
{/await}
