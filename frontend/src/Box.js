import React, { useState } from "react";

const Box = () => {
  const [init, setInit] = useState(false);
  const [back, setBack] = useState("yellow");
  const MouseMove = (e) => {
    if (!init) {
      setBack("blue");
      setInit(true);
    }
    console.log(e.target);
  };
  return (
    <div>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((m, index) => (
        <div style={{ display: "flex" }} key={index}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((d, i) => (
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: back,
                border: "1px solid black",
              }}
              key={i}
              onMouseMove={MouseMove}
              name={String(m) + String(d)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Box;
