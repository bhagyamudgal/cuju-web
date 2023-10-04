"use client";

import { useBoolean } from "usehooks-ts";

function useDisclosure() {
    const { value, setTrue, setFalse } = useBoolean();

    return { isOpen: value, onOpen: setTrue, onClose: setFalse };
}

export default useDisclosure;
