export const validateForm = (form: HTMLFormElement) => {
    let inputElements = (Array.from(
        form?.elements
    ) as HTMLInputElement[]).filter(
        (element) =>
            element.tagName === "INPUT" && !element?.checkValidity()
    );
    inputElements.forEach((element) => {
        element?.focus();
        element?.blur();
    });
    return form?.checkValidity();
};