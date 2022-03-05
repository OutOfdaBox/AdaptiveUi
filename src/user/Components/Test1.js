import React from "react";
import { statService } from "../../ServiceFolder/statService";
import { useState } from "react";
import { getdb } from "../../behaviour/db/getdb"
function Test(props) {

    const [count, setCount] = useState(0);
    const handleAction = (event) => {
        statService.storeAction({ key: props.id, action: "sell" })
        setCount(count + 1);
    }

    return (
        <div style={{ backgroundColor: "green", width: "80px", height: "80px", margin: "20px" }}>
            <a>Key:{props.id}</a>
            <button onClick={handleAction}>Sell</button>
            <a>{count}</a>
        </div>
    )
}

export default Test;