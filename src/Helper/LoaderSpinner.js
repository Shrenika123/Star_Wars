import React from 'react'
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && 
   <div
     
      style={{
        width: "20%",
        height: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
      }}
    >
      <Loader type="TailSpin" color="#FFFF00" height="20%" width="100%" />
    </div>
};

export default LoadingIndicator