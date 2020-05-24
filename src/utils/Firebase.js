import React from "react";

export const useValidateInput = () => {
    const [showCaption, setShowCaption] = React.useState(false);
    const doShowCaption = () => setShowCaption(true);
    const notShowCaption = () => setShowCaption(false);
    const validate = (text) => {
        if(!text || text.length === 0) doShowCaption()
        else notShowCaption()
    }
    const onFocus = () => {
        notShowCaption()
    }
    return [ showCaption, validate, onFocus ];
};