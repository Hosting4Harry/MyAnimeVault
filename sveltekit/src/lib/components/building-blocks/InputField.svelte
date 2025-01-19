<script lang="ts">
  import clsx from "clsx";
  import FormMessage from "./FormMessage.svelte";
  import type { FullAutoFill } from "svelte/elements";
  import { formatPhoneNumberAsYouType } from "$lib/utils";
  import { ValiationMessage, ValidationRegex } from "$lib/constants";

  type InputProps = {
    error?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    id?: string;
    value?: string | number;
    minlength?: number;
    maxlength?: number;
    max?: number;
    min?: number;
    autocomplete?: FullAutoFill;
    required?: boolean;
    readonly?: boolean;
    validationName?: string;
    numberOnly?: boolean;
    aplphaOnly?: boolean;
    oninput?: (e: Event) => void;
    disabled?: boolean;
    onblur?: (e: Event) => void;
    class?: string;
    errorClass?: string;
  };
  let {
    error,
    name,
    placeholder,
    type = "text",
    id,
    value = $bindable(),
    required,
    autocomplete,
    validationName,
    minlength,
    maxlength,
    numberOnly,
    aplphaOnly,
    readonly,
    oninput,
    disabled,
    onblur,
    class: customClass,
    errorClass,
  }: InputProps = $props();
  let errorMessage = $state(error);
  const nameFields = ["firstName", "lastName", "middleName"];
  let inputElement = $state();

  const checkInputValidity = (e: Event) => {
    let input = e.target as HTMLInputElement;
    if (numberOnly) {
      input.value = input.value.replace(/\D/g, "");
    }
    if (aplphaOnly) {
      input.value = input.value.replace(/[^a-zA-Z ]/g, "");
    }
    if (validationName === "phone") {
      input.value = formatPhoneNumberAsYouType(input.value);
    }
    if (validationName === "phone2") {
      input.value = formatPhoneNumberAsYouType(input.value, "000-000-0000");
    }
    value = input.value;
    checkValidation(input.name, input.value);
  };

  const handleOnInput = (e: Event) => {
    checkInputValidity(e);
    oninput?.(e);
  };

  const handleOnBlur = (e: Event) => {
    let input = e.target as HTMLInputElement;
    if (["text", "password", "email"].includes(type)) {
      input.value = input.value.trim();
    }
    onblur?.(e);
    checkInputValidity(e);
  };

  const checkValidation = (name: string, value: string) => {
    const isNameField = nameFields.includes(name);
    if (required && value?.length === 0) {
      errorMessage = ValiationMessage.required;
    } else if (
      minlength &&
      value.length &&
      value.length < minlength &&
      isNameField
    ) {
      errorMessage = ValiationMessage.minLength;
    } else if (
      maxlength &&
      value.length &&
      value.length > maxlength &&
      isNameField
    ) {
      errorMessage = ValiationMessage.maxLength;
    } else if (validationName && !ValidationRegex[validationName].test(value)) {
      errorMessage = ValiationMessage[validationName];
    } else {
      errorMessage = "";
    }
    (inputElement as HTMLInputElement).setCustomValidity(
      errorMessage as string,
    );
  };
</script>

<input
  bind:this={inputElement}
  bind:value
  {name}
  {placeholder}
  {type}
  {id}
  {required}
  {autocomplete}
  {minlength}
  {maxlength}
  {readonly}
  {disabled}
  class={clsx(
    "block w-full border border-[#9C9C9C] rounded p-3 focus:outline-none focus:border-[#222222] disabled:bg-[#EEEEEE] disabled:cursor-not-allowed leading-5",
    customClass,
  )}
  onblur={handleOnBlur}
  oninput={handleOnInput}
/>
<FormMessage message={(errorMessage || error) as string} {errorClass} />
