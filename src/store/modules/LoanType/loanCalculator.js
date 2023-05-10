import store from '@/store';

const state = {
    // Validation rules for form fields
    rules: ["required"],
    // Minimum value for form fields
    min: 1,
    // Data for sliders in the form
    slidersData: [{
            name: "loanAmount",
            label: "Loan amount",
            max: 10000
        },
        {
            name: "loanTerm",
            label: "Loan term",
            max: 28
        },
    ],
    // Data for payment frequency dropdown in the form
    paymentFrequency: {
        name: "paymentFrequency",
        label: "Payment Frequency",
        default: "365",
        items: [{
                value: "365",
                label: "Daily",
            },
            {
                value: "52",
                label: "Weekly",
            },
            {
                value: "2",
                label: "Twice a Month",
            },
            {
                value: "1",
                label: "Monthly",
            },
        ],
    },
    // HTML content for divider in the form
    dividerContent: '<hr :style="dividerStyles" />',
    // Styles for divider in the form
    dividerStyles: {
        borderColor: "#d1d5db",
        marginTop: "8px",
        paddingBottom: "8px",
    },
    // Conditions for resetting the form
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
}
const actions = {
    setLoanType({ commit }, loanType) {
        commit('SET_LOAN_TYPE', loanType);
    },
    calculatePayment({ commit }, { formData }) {
        console.log(formData);
        store.dispatch('formula/calculateLoan', formData)
            .then((penaltyResult) => {
                // Handle the penalty result here
                // console.log("Penalty Result:", penaltyResult);
                // commit("SET_PAYMENT_RESULT", penaltyResult);
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