import { useState } from "react";
import "../styles/FloatMessage.css";
export default function FloatMessage({ message, resetMessage  }) {
    if(message === "") {
        return <></>;
    }
    setTimeout(() => {
        resetMessage();
    }, 4000)
    return <div className="notification">{message}</div>
}

