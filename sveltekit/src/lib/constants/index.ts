

//Validation constants  
export const ValiationMessage: { [key: string]: string } = {
    required: 'This field is required.',
    email: 'Invalid email address.',
    phone: 'Phone number must be 10 digits long.',
    phone2: 'Phone number must be 10 digits long.',
    accountNumber: 'Account number must be greater than or equal to 10 digits long.',
    minLength: 'Name can not be less than 2 characters.',
    maxLength: 'Name can not be greater than 25 characters.'
}
export const ValidationRegex: { [key: string]: RegExp } = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    accountNumber: /^[0-9]{10,}$/,
    phone: /^\(\d{3}\) \d{3}-\d{4}$/,
    phone2: /^\d{3}-\d{3}-\d{4}$/
}
