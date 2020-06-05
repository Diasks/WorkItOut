import React from 'react';
import { useHistory } from "react-router-dom";

export const GoBackButton = () => {
    let history = useHistory();

    return (
        <div>
          <button className="btn btn-sky" onClick={() => history.goBack()}>Tillbaka</button>
        </div>
    )
};

export default GoBackButton;