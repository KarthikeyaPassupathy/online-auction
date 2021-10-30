import React, { useEffect, useState } from "react";

function CountdownTimer(props) {
  const [Total, setTotal] = useState();
  const [Seconds, setSeconds] = useState();
  const [Minutes, setMinutes] = useState();
  const [Hours, setHours] = useState();

  function getTimeRemaining() {
    console.log(Date.parse(props.startT), Date.parse(props.endT));
    if (Date.parse(props.startT) > Date.parse(new Date())) {
      setTotal(Date.parse(props.endT) - Date.parse(props.startT));
    } else {
      setTotal(Date.parse(props.endT) - Date.parse(new Date()));
    }
  }

  useEffect(() => {
    console.log(Total);
    if (Total) {
      if (Total > 0) {
        setSeconds(Math.floor((Total / 1000) % 60));
        setMinutes(Math.floor((Total / 1000 / 60) % 60));
        setHours(Math.floor((Total / (1000 * 60 * 60)) % 24));
      } else {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        props.getWinner();
      }
    }
  }, [Total]);

  useEffect(() => {
    if (!(Total < 0)) {
      const timer = setTimeout(() => {
        getTimeRemaining();
      }, 1000);
      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [props, Total]);

  return (
    <div>
      <span
        className={`time ${
          Hours === 0 && Minutes === 0 && Seconds <= 59 ? "tLess" : ""
        }`}
      >
        {Total ? (
          <>
            {Hours} : {Minutes} : {Seconds}
          </>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

export default CountdownTimer;
