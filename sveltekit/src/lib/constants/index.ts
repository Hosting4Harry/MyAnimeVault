

//Validation constants  
export const ValidationMessage: { [key: string]: string } = {
    required: 'This field is required.',
    email: 'Invalid email address.',
    phone: 'Phone number must be 10 digits long.',
    accountNumber: 'Account number must be greater than or equal to 10 digits long.',
    minLength: 'Name can not be less than 2 characters.',
    maxLength: 'Name can not be greater than 25 characters.',
    username: "Invalid user name."
}
export const ValidationRegex: { [key: string]: RegExp } = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    accountNumber: /^\d{10,}$/,
    phone: /^\(\d{3}\) \d{3}-\d{4}$/,    
    username: /^[a-zA-Z0-9._-]{2,20}$/
}
