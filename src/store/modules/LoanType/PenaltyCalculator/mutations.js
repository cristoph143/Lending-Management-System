const mutations = {
    setErrorMessage(state, message) {
        state.errorMessage = message;
    },
    setFormData(state, data) {
        state.formData = data;
    },
    setAmountDue(state, amountDue) {
        state.amountDue = amountDue;
    },
    setShowError(state, value) {
        state.showError = value;
    },
};

export default mutations;