<script lang="ts">
  import Checkbox from "$lib/components/building-blocks/Checkbox.svelte";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import { onMount } from "svelte";
  import FormMessage from "./FormMessage.svelte";
  import type { Option } from "$lib/types/data.types";
  import DynamicIcon from "./DynamicIcon.svelte";

  let showMenu = $state(false);
  let searchValue = $state("");
  let selectRef = $state<HTMLDivElement | null>(null);
  let selectedDiv = $state<HTMLDivElement | null>(null);
  let dropdownRef = $state<HTMLDivElement | null>(null);
  let filteredOptions = $state<Option[]>([]);
  let dropdownPosition = $state({ top: 0, left: 0, width: 0 });
  let selectOptionPosition = $state({ top: false, bottom: true });

  let {
    id = "",
    name,
    options,
    placeholder,
    selectedValues = $bindable([]),
    disabled = false,
    required = false,
    maxHeight = "200px",
    noOptionsMessage = "No options available",
    customClass = "",
    inputClass = "",
    optionContainerClass = "",
    optionClass = "",
    mode = "multi",
    onChange,
    enableSearch = true,
    errorMessage,
    enableRemoveOption = false,
  }: {
    id?: string;
    name?: string;
    options: Option[];
    placeholder: string;
    selectedValues: Option[];
    disabled?: boolean;
    required?: boolean;
    maxHeight?: string;
    noOptionsMessage?: string;
    customClass?: string;
    inputClass?: string;
    optionContainerClass?: string;
    optionClass?: string;
    mode?: "single" | "multi";
    onChange?: (selected: Option[]) => void;
    enableSearch?: boolean;
    errorMessage?: string;
    enableRemoveOption?: boolean;
  } = $props();

  $effect(() => {
    if (!searchValue.trim()) {
      filteredOptions = options;
    } else {
      filteredOptions = options.filter((item) =>
        item.label
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim())
      );
    }
  });

  $effect(() => {
    if (!showMenu) {
      searchValue = "";
    }
  });

  function handleSelect(option: Option) {
    if (disabled) return;
    let newSelectedValues: Option[];

    if (mode === "single") {
      newSelectedValues = [option];
      showMenu = false;
    } else {
      const isSelected = selectedValues.some(
        (selected) => selected.value === option.value
      );

      if (isSelected) {
        newSelectedValues = selectedValues.filter(
          (selected) => selected.value !== option.value
        );
      } else {
        newSelectedValues = [...selectedValues, option];
      }
    }

    selectedValues = newSelectedValues;
    onChange?.(newSelectedValues);

    // Scroll to end of selection area for multi-select
    if (mode === "multi") {
      setTimeout(() => {
        selectedDiv?.scrollTo({
          left: selectedDiv.scrollWidth,
          behavior: "smooth",
        });
      }, 100);
    }
  }

  // Remove selected option
  function removeOption(optionValue: string | number) {
    if (disabled) return;
    const newSelectedValues = selectedValues.filter(
      (selected) => selected.value !== optionValue
    );
    selectedValues = newSelectedValues;
    onChange?.(newSelectedValues);
  }

  // Click outside handling
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (mode !== "single" && dropdownRef?.contains(target)) {
      return;
    }
    if (!target.closest(`.multi-select-area-${id}`)) {
      showMenu = false;
    }
  }

  // Calculate dropdown position and width
  function calculateDropdownPosition() {
    if (!selectRef) return;

    // Get dimensions after ensuring the DOM is up to date
    setTimeout(() => {
      if (!selectRef || !dropdownRef) return;

      const rect = selectRef.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const dropdownRect = dropdownRef.getBoundingClientRect();
      const dropdownHeight = dropdownRect.height;

      // Update width to match the select input
      dropdownPosition = {
        top: rect.bottom + 5,
        left: rect.left,
        width: rect.width,
      };

      // Check if there's room below
      const spaceBelow = windowHeight - rect.bottom;

      // Position above if there's not enough space below
      if (spaceBelow < dropdownHeight) {
        selectOptionPosition = { top: true, bottom: false };
        // Position completely above the select element
        dropdownPosition.top = rect.top - 5 - dropdownHeight;
      } else {
        selectOptionPosition = { top: false, bottom: true };
        dropdownPosition.top = rect.bottom + 5;
      }
    }, 10);
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", calculateDropdownPosition);
    window.addEventListener("resize", calculateDropdownPosition);

    // Initialize filtered options
    filteredOptions = options;

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", calculateDropdownPosition);
      window.removeEventListener("resize", calculateDropdownPosition);
    };
  });
</script>

<div
  class="relative text-[#222222] {customClass} rounded group {disabled &&
    'cursor-not-allowed'}"
  bind:this={selectRef}
>
  <div
    role="none"
    class="multi-select-area-{id} relative inline-block  text-left w-full"
    onclick={() => {
      if (!disabled) {
        showMenu = !showMenu;
        if (showMenu) setTimeout(calculateDropdownPosition, 0);
      }
    }}
  >
    {#if enableRemoveOption && selectedValues.length > 0}
      <button
        type="button"
        class="focus:outline-none absolute top-1/2 -translate-y-1/2 right-10 transition-transform rounded-full bg-transparent disabled:cursor-not-allowed"
        onclick={(e) => {
          e.stopPropagation();
          removeOption(selectedValues[0].value);
        }}
        {disabled}
      >
        <CloseIcon height="16" width="16" fillColor="#6B7280" />
      </button>
    {/if}
    <i
      class="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 transition-transform {showMenu
        ? 'rotate-180'
        : ''}"
    >
      <DownArrowHead fillColor="currentColor" />
    </i>
    <div
      bind:this={selectedDiv}
      class="absolute flex gap-1 ms-2 top-1/2 -translate-y-1/2 max-w-[80%] whitespace-nowrap overflow-auto scrollbar-hide"
    >
      {#if mode === "multi"}
        {#each selectedValues as selected (selected.value)}
          <span
            class="flex gap-2 items-center self-stretch px-1.5 text-center whitespace-nowrap rounded bg-zinc-100 {disabled &&
              '!bg-iaLightGrey'}"
          >
            <span class="self-stretch text-sm">{selected.label}</span>
            <button
              type="button"
              class="focus:outline-none disabled:cursor-not-allowed"
              onclick={(e) => {
                e.stopPropagation();
                removeOption(selected.value);
              }}
              {disabled}
            >
              <CloseIcon height="16" width="16" fillColor="#6B7280" />
            </button>
          </span>
        {/each}
      {:else if selectedValues.length > 0}
        <div
          class="flex gap-4 items-center self-stretch px-1.5 text-center whitespace-nowrap rounded"
        >
          {#if selectedValues[0]?.icon}
            <i class="h-5 w-5 flex-shrink-0" aria-hidden="true">
              <DynamicIcon icon={selectedValues[0]?.icon.toLowerCase()} />
            </i>
          {/if}
          <span class="self-stretch my-auto text-sm">
            {selectedValues[0].label}
          </span>
        </div>
      {/if}
    </div>

    <input
      {id}
      {name}
      class="flex justify-between items-center bg-white appearance-none p-3 border border-[#9c9c9c] rounded outline outline-0 w-full disabled:bg-gray-500 !pr-6 disabled:cursor-not-allowed {inputClass}"
      placeholder={selectedValues.length > 0 ? "" : placeholder}
      {required}
      {disabled}
      style="padding-left:{selectedDiv?.clientWidth + 10}px;"
      value={searchValue}
      readonly={!enableSearch}
      oninput={(e) => {
        searchValue = e.currentTarget.value;
        showMenu = true;
        calculateDropdownPosition();
      }}
      autocomplete="off"
    />
  </div>

  {#if showMenu}
    <div
      bind:this={dropdownRef}
      class="select-dropdown fixed z-40 border rounded shadow-2xl bg-white {optionContainerClass}"
      style="top: {dropdownPosition.top}px; left: {dropdownPosition.left}px; width: {dropdownPosition.width}px;"
    >
      <div class="overflow-y-auto rounded" style="max-height: {maxHeight}">
        {#if filteredOptions?.length > 0}
          {#each filteredOptions as option (option.value)}
            <div
              role="none"
              class="w-full flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer {optionClass}"
              onclick={() => handleSelect(option)}
            >
              {#if mode === "multi"}
                <Checkbox
                  id={"checkbox-" + option.value}
                  checked={selectedValues.some(
                    (o) => o.value === option.value
                  )}
                />
              {/if}
              <label
                role="none"
                class="flex cursor-pointer flex-1 gap-4 items-center"
                for={mode === "multi"
                  ? "checkbox-" + option.value
                  : undefined}
                onclick={(e) => {
                  if (mode === "multi") {
                    e.stopPropagation();
                  }
                }}
              >
                {#if mode !== "multi" && option?.icon}
                  <i class="h-5 w-5 flex-shrink-0" aria-hidden="true">
                    <DynamicIcon icon={option.icon.toLowerCase()} />
                  </i>
                {/if}
                <span>{option.label}</span>
                {#if mode === "multi" && option?.icon}
                  <i class="h-5 w-5 flex-shrink-0" aria-hidden="true">
                    <DynamicIcon icon={option.icon.toLowerCase()} />
                  </i>
                {/if}
              </label>

              {#if mode === "single" && selectedValues.some((o) => o.value === option.value)}
                <i class="text-[#007AFF]">✓</i>
              {/if}
            </div>
          {/each}
        {:else}
          <div class="p-2">{noOptionsMessage}</div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<FormMessage message={errorMessage as string} />