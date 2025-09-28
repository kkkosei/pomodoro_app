import React from "react";

function StartButton(props) {
    if (props.isRunning) {
      return <button className={props.css} onClick={props.onClickStop}>ストップ</button>
    } else {
      return <button className={props.css} onClick={props.onClickStart}>スタート</button>
    }

  
};

export default StartButton;