import React from "react";

function StartButton(props) {
    if (props.isRunning) {
      return (
        <button 
          className={props.css} 
          onClick={(e) => { 
            e.target.blur(); 
            props.onClickStop(); 
          }}
        > 
          ストップ
        </button>
      );
    } else {
      return (
        <button 
          className={props.css} 
          onClick={(e) => {
            e.target.blur(); 
            props.onClickStart(); 
          }}
        >
          スタート
        </button>
      );
    }

  
};

export default StartButton;