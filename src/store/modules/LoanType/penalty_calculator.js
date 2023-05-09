// store/modules/penaltyCalculator.js
import store from '@/store';

const state = {
    errorMessage: "",
    dates: ["dueDate", "actualDate"],
    formData: {
        amountDue: 0,
        dueDate: "",
        actualDate: "",
    },
    paymentResult: {},
    capitalizedStrings: {},
    amountDue: "0",
    add_class: "vf-penalty-calculator",
    date_format: "MMMM D, YYYY",
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
    ]
};

const getters = {
    loan_type: (state) => state.destinationsStore.loan_type.loan_type,
    getCurrentDate: () => getCurrentDate(),
    capitalizedString: (state) => (date) => {
        return state.capitalizedStrings[date] || '';
    },
    paymentResult: (state) => state.paymentResult,
};



const actions = {
    setError({ commit }) {
        commit("SET_SHOW_ERROR", true);
    },
    onChange({ commit, state }, { date, event }) {
        commit("SET_FORM_DATA", {...state.formData, [date]: event });
    },
    capitalize({ commit }, str) {
        console.log(str)
        console.log(str + ": " + str);
        let result = str.replace(/([A-Z])/g, " $1");
        result = result.charAt(0).toUpperCase() + result.slice(1);
        console.log(result)
        commit('SET_CAPITALIZED_STRING', result);
        return result;

    },
    capitalizeString({ commit }, date) {
        console.log(date)
        console.log(date + ": " + date);
        let result = date.replace(/([A-Z])/g, " $1");
        result = result.charAt(0).toUpperCase() + result.slice(1);
        console.log(result)
        commit('SET_CAPITALIZED_STRING', { date, str: result });
        return result;
    },
    calculatePayment({ state, commit }) {
        console.log(":::::::::::::::::::::::::::::::::::::::")
        const errors = [];
        console.log(state.formData)
        if (state.formData.amountDue < 1) {
            errors.push("Amount due should be greater than 1.");
        }

        if (state.formData.actualDate == state.formData.dueDate) {
            errors.push("Actual date should not be the same as the due date.");
        }

        // Set actualDate and dueDate to current date if they are empty strings
        if (state.formData.actualDate === "") {
            state.formData.actualDate = getCurrentDate();
        }
        if (state.formData.dueDate === "") {
            state.formData.dueDate = getCurrentDate();
        }
        console.log(state.formData)

        if (errors.length > 0) {
            store.dispatch('toast/toast', {
                messages: errors,
                type: 'warning',
            });
        } else {
            // Calculate the payment and return the result
            const payment = state.formData.amountDue * 1.1;
            commit("SET_PAYMENT_RESULT", payment);
            return payment;
        }
    },
    resetForm({ commit }) {
        commit("RESET_FORM");
    },
    // other actions
    fetchCurrentDate({ commit }) {
        console.log('Fetching current date...');
        const date = getCurrentDate();
        commit('setCurrentDate', date);
    },
};

const mutations = {
    SET_FORM_DATA(state, formData) {
        state.formData = formData;
    },
    RESET_FORM(state) {
        state.formData = {
            amountDue: 0,
            dueDate: getCurrentDate(),
            actualDate: getCurrentDate(),
        };
    },
    SET_CAPITALIZED_STRING(state, { date, str }) {
        state.capitalizedStrings[date] = str;
    },
    // other mutations
    setCurrentDate(state, date) {
        console.log('Setting current date:', date);
        state.currentDate = date;
    },
    SET_PAYMENT_RESULT(state, paymentResult) {
        state.paymentResult = paymentResult;
    },
};

function getCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return formattedDate;
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};