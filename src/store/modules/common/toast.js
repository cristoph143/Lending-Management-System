import { useToast } from "vue-toastification";

const actions = {
    toast({ commit }, { messages, type }) {
        commit(`${type}_toast`, messages);
        const $toast = useToast();
        console.log(messages)
        const options = {
            position: "bottom-right",
            timeout: 978,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
        };
        switch (type) {
            case "default":
                messages.forEach((message) => {
                    $toast(message, options);
                });
                break;
            case "success":
                messages.forEach((message) => {
                    $toast.success(message, options);
                });
                break;
            case "info":
                messages.forEach((message) => {
                    $toast.info(message, options);
                });
                break;
            case "warning":
                messages.forEach((message) => {
                    $toast.warning(message, options);
                });
                break;
            case "error":
                messages.forEach((message) => {
                    $toast.error(message, options);
                });
                break;
            default:
                messages.forEach((message) => {
                    $toast(message, options);
                });
                break;
        }
    },
};

export default {
    namespaced: true,
    actions,
};