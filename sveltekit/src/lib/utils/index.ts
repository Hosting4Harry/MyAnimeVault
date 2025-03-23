export const formatPhoneNumberAsYouType = (input: string, type = "(000) 000-0000") => {
    // Remove all non-digit characters
    input = input.replace(/\D/g, '');
    if (type === "000-000-0000") {
        // Format the phone number as XXX-XXX-XXXX
        if (input.length === 0) {
            input = ''; // Handle clear state
        } else if (input.length <= 3) {
            input = `${input}`;
        } else if (input.length <= 6) {
            input = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else {
            input = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
        }
    } else {
        if (input.length === 0) {
            input = ''; // Handle clear state
        } else if (input.length <= 3) {
            input = `(${input}`;
        } else if (input.length <= 6) {
            input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
        } else {
            input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
        }
    }
    return input;
};

export function randomId(): string {
    return (Math.random() + new Date().getTime()).toString();
}

export function numericFormatter(input: string | number, pattern: string): string {
    if (!input) return "";

    const inputStr = input.toString().replace(/\D/g, ""); // Remove non-numeric characters
    let formatted = "";
    let inputIndex = 0;

    for (const char of pattern) {
        if (inputIndex >= inputStr.length) break; // Stop processing when input runs out

        if (char === "#") {
            formatted += inputStr[inputIndex]; // Fill with number
            inputIndex++;
        } else {
            formatted += char; // Keep formatting characters
        }
    }

    return formatted;
}