const actions = {
    onChange({ commit, state }, { date, event }) {
        const formData = {...state.formData };
        formData[date] = event;
        commit("setFormData", formData);
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
    calculatePayment({ state, commit }) {
        const errors = [];

        if (state.formData.amountDue < 1) {
            errors.push("Amount due should be greater than 1.");
        }

        if (state.formData.actualDate == state.formData.dueDate) {
            errors.push("Actual date should be the same as the due date.");
        }

        if (errors.length > 0) {
            commit("setErrorMessage", errors[0]);
            errors.shift();
            setTimeout(() => {
                commit("setShowError", false);
            }, 2000);
        } else {
            console.log(state.formData);
        }
    },
    hideError({ state, commit }) {
        if (state.errors.length > 0) {
            commit("setErrorMessage", state.errors[0]);
            state.errors.shift();
            setTimeout(() => {
                commit("setShowError", false);
            }, 2000);
        } else {
            commit("setShowError", false);
        }
    },
    resetForm({ commit }) {
        commit("setFormData", {
            amountDue: 0,
            dueDate: this.getCurrentDate(),
            actualDate: this.getCurrentDate(),
        });
    },
};

export default actions;