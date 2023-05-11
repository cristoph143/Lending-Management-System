import store from '@/store';
import { shared } from '../common/shared.js';
const state = {
    rules: ["required", "integer"],
    min: 1,
    inputsData: [
        { name: "loanAmount", label: "Loan amount", },
        { name: "loanTerm", label: "Loan term", },
    ],
    starting_date: shared.getCurrentDate(),
    paymentFrequency: {
        name: "paymentFrequency",
        label: "Payment Frequency",
        default: 365,
        items: [
            { value: 365, label: "Daily", },
            { value: 52, label: "Weekly", },
            { value: 2, label: "Twice a Month", },
            { value: 1, label: "Monthly", },
        ],
    },
    dividerContent: '<hr :style="dividerStyles" />',
    dividerStyles: {
        borderColor: "#d1d5db",
        marginTop: "8px",
        paddingBottom: "8px",
    },
    resetConditions: [
        [
            ["container.loanAmount", ">", "1"],
            ["container.loanTerm", ">", "1"],
            ["container.paymentFrequency", "not_in", ["365"]],
        ],
    ],
    loanType: "",
};
const mutations = {
    SET_LOAN_TYPE(state, loanType) {
        state.loan_type = loanType;
    },
    SET_FORM_DATA(state, formData) {
        state.formData = formData;
    },
    SET_DATE(state, date) {
        state.starting_date = date;
    },
};
const actions = {
    setLoanType({ commit }, loanType) {
        commit('SET_LOAN_TYPE', loanType);
    },

    onChange({ commit }, { event }) {
        commit("SET_DATE", event);
    },
    calculatePayment({ commit, state }, { formData }) {
        console.log(formData);
        console.log(state.starting_date)
        console.log(formData.loanAmount)
        store.dispatch('formula/calculateLoan', formData)
            .then((penaltyResult) => {
                return penaltyResult;
            })
            .catch((error) => {
                // Handle the error here
                console.error("Error calculating penalty:", error);
            });
        commit('SET_FORM_DATA', formData);
    },
    resetForm({ commit }) {
        commit('SET_FORM_DATA', {});
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}