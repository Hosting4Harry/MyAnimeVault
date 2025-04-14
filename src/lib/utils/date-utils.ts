export const convertDateTime = (dateTimeString: string | undefined) => {
    if (!dateTimeString || dateTimeString === "") return 'N/A';
    dateTimeString = new Date(dateTimeString).toISOString();
    // Split the given date string
    const dateTimeParts = dateTimeString?.split("T") ?? '';
    const datePart = dateTimeParts[0];
    const timePart = dateTimeParts[1];

    // Split the date part into year, month, and day
    const [year, month, day] = datePart?.split("-") ?? '';

    // Split the time part into hours, minutes, and seconds
    let [hours, minutes] = timePart?.split(":") ?? '';

    // Determine the AM or PM period
    const period = +hours >= 12 ? "PM" : "AM";

    // Create the formatted string
    const formattedDate = `${month}/${day}/${year} at ${+hours % 12 || '00'}:${minutes || '00'} ${period || 'AM'}`;

    return formattedDate;

}

export const convertDate = (dateTimeString: string | undefined) => {
    if (!dateTimeString || dateTimeString === "") return '';
    dateTimeString = dateTimeString?.replaceAll('T', ' ') ?? "";
    const datePart = dateTimeString?.split(' ')[0] ?? '';
    const [year, month, day] = datePart?.split("-") ?? '';
    return `${month}/${day}/${year}`;
}