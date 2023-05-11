import moment from 'moment';
export const shared = {
    capitalize(str) {
        console.log(str)
        console.log(str + ": " + str);
        let result = str.replace(/([A-Z])/g, " $1");
        result = result.charAt(0).toUpperCase() + result.slice(1);
        console.log(result)
        return result;
    },
    getCurrentDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formattedDate;
    },
    disabledDates(date) {
        return date.isBefore(moment().startOf("day"));
    },
}