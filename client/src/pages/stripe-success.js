import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subCheck, generateKey } from "../store/actions/user_actions";
import { SyncOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'

const StripeSuccess = ({ history }) => {

  const user = useSelector(state => state.user.userData)
  const dispatch = useDispatch()
  const [start, setStart] = useState('')

  useEffect(() => {
    dispatch(subCheck())
    console.log(user.subscriptions.length)
    // dispatch(generateKey())

    setTimeout(() => {
      history.push("/dashboard");
    }, 3000);

  }, []);
  
  return (
    <div
      className="d-flex justify-content-center fw-bold"
      style={{ height: "90vh" }}
    >
      <div className="d-flex align-items-center">
        <SyncOutlined spin style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};

export default StripeSuccess;