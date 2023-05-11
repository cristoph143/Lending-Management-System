// store/modules/penaltyCalculator.js
import store from '@/store';
import { shared } from '../common/shared';
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
    getCurrentDate: () => shared.getCurrentDate(),
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
    capitalizeString({ commit }, date) {
        const result = shared.capitalize(date);
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
            state.formData.actualDate = shared.getCurrentDate();
        }
        if (state.formData.dueDate === "") {
            state.formData.dueDate = shared.getCurrentDate();
        }
        console.log(state.formData)

        if (errors.length > 0) {
            store.dispatch('toast/toast', {
                messages: errors,
                type: 'warning',
            });
        } else {
            store.dispatch('formula/calculatePenalty', state.formData)
                .then((penaltyResult) => {
                    // Handle the penalty result here
                    console.log("Penalty Result:", penaltyResult);
                    commit("SET_PAYMENT_RESULT", penaltyResult);
                    return penaltyResult;
                })
                .catch((error) => {
                    // Handle the error here
                    console.error("Error calculating penalty:", error);
                });
        }
    },
    resetForm({ commit }) {
        commit("RESET_FORM");
    },
    // other actions
    fetchCurrentDate({ commit }) {
        console.log('Fetching current date...');
        const date = shared.getCurrentDate();
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
            dueDate: shared.getCurrentDate(),
            actualDate: shared.getCurrentDate(),
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

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};