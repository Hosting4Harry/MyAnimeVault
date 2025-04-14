import { writable } from "svelte/store";
export type ToastType = "default" | "info" | "success" | "warning" | "error";
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export type Toast = {
    id?: number;
    message: string;
    type?: ToastType
    dismissible?: boolean;
    timeout?: number,
    position?: ToastPosition
}
// Create a writable store for toasts
export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Toast) => {
    // Create a unique ID
    const id = Math.floor(Math.random() * 10000);

    // Default toast properties
    const defaults: Toast = {
        id,
        type: "default",
        dismissible: false,
        timeout: 3000,
        position: "bottom-left",
        message: "",
    };

    // Add new toast to the beginning of the array
    toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

    // Handle automatic dismissal if timeout is set
    setTimeout(() => dismissToast(id), toast.timeout || defaults.timeout);
};

export const dismissToast = (id: number) => {
    toasts.update((all) => all.filter(t => t.id !== id));
};

// If you need a derived store, use get() to access the value
import { derived } from "svelte/store";
export const activeToasts = derived(toasts, $toasts => $toasts);