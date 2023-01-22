export const convertDateSting = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
};

export const clickOnButton = (button, selectedDates) => {
    const abbr = button.getElementsByTagName("abbr")[0];
    if (abbr) {
        const buttonValue = abbr.ariaLabel;
        const date = new Date(buttonValue);
        const year = date.getFullYear();
        const dateString = convertDateSting(date);

        if (selectedDates[year] && selectedDates[year].has(dateString)) {
            button.click()
        }
    }
}