import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

const penaltyCalculatorModule = {
    namespaced: true,
    mutations,
    state,
    actions,
};

export default penaltyCalculatorModule;