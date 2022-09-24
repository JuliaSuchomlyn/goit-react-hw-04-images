import { useState } from "react";

export const useModal = () => {
    const [showModal, setShowModal] = useState(false);

    function toggle() {
        setShowModal(!showModal);
    }

    return {
        showModal,
        toggle,
    }
};