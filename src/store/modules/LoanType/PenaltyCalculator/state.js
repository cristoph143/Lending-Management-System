import actions from "./actions";
const state = {
    errorMessage: "",
    dates: ["dueDate", "actualDate"],
    formData: {
        amountDue: 0,
        dueDate: actions.getCurrentDate(),
        actualDate: actions.getCurrentDate(),
    },
    amountDue: "0",
    dividerContent: '<hr :style="dividerStyles" />',
    dividerStyles: {
        borderColor: "#d1d5db",
        marginTop: "8px",
        paddingBottom: "8px",
    },
    rules: ["required", "numeric", "min:0"],
    conditions: [
        ["container.amountDue", ">", "1"],
        [
            ["container.actualDate", "not_empty"],
            ["container.actualDate", "before", "today"],
            ["container.actualDate", "after", "today"],
        ],
        [
            ["container.dueDate", "not_empty"],
            ["container.dueDate", "before", "today"],
            ["container.dueDate", "after", "today"],
        ],
    ],
    showError: false,
};

export default state;