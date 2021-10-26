import React, { useEffect, useState } from "react";

function CountdownTimer(props) {
  const [startingTime, setstartingTime] = useState(Date.parse(props.startT));
  const [endingTime, setendingTime] = useState(Date.parse(props.endT));
  const [Total, setTotal] = useState();
  const [Seconds, setSeconds] = useState();
  const [Minutes, setMinutes] = useState();
  const [Hours, setHours] = useState();

  function getTimeRemaining() {
    console.log(startingTime, endingTime);
    if (startingTime > Date.parse(new Date())) {
      setTotal(endingTime - startingTime);
    } else {
      setTotal(endingTime - Date.parse(new Date()));
    }
  }

  useEffect(() => {
    getTimeRemaining();
  }, [props]);

  useEffect(() => {
    console.log(Total);
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
  }, [Total]);

  useEffect(() => {
    if (!(Total < 0)) {
      const timer = setTimeout(() => {
        getTimeRemaining();
      }, 1000);
      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      <span
        className={`time ${
          Hours === 0 && Minutes === 0 && Seconds <= 59 ? "tLess" : ""
        }`}
      >
        {Hours} : {Minutes} : {Seconds}
      </span>
    </div>
  );
}

export default CountdownTimer;
