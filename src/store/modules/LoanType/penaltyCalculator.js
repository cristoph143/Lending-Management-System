import { mapGetters } from 'vuex';
const penalty_Calculator = {
    state: {
        errorMessage: "",
        dates: ["dueDate", "actualDate"],
        formData: {
            amountDue: 0,
            dueDate: this.getCurrentDate(),
            actualDate: this.getCurrentDate(),
        },
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
        ],
        showError: false,
    },
    getters: {
        getCurrentDate: () => {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return formattedDate;
        },
        capitalize: () => (str) => {
            let result = str.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        },
    },
    mutations: {
        setError(state) {
            state.showError = true;
        },
        onChange(state, payload) {
            state.formData[payload.date] = payload.event;
        },
        hideError(state) {
            if (state.errors.length > 0) {
                state.errorMessage = state.errors[0];
                state.errors.shift();
                setTimeout(() => {
                    this.hideError();
                }, 2000);
            } else {
                state.showError = false;
            }
        },
        resetForm(state) {
            state.$refs.vueform.resetForm();
        },
    },
    actions: {
        calculatePayment({ state, commit }) {
            const errors = [];

            if (state.formData.amountDue < 1) {
                errors.push("Amount due should be greater than 1.");
            }

            if (state.formData.actualDate == state.formData.dueDate) {
                errors.push("Actual date should be the same as the due date.");
            }

            if (errors.length > 0) {
                state.errorMessage = errors[0];
                errors.shift();
                state.errors = errors;
                commit("setError");
                setTimeout(() => {
                    commit("hideError");
                }, 2000);
            } else {
                console.log(state.formData);
            }
        },
        resetForm({ commit }) {
            commit("resetForm");
        },
    },
};

export default penalty_Calculator;