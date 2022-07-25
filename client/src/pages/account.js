import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import moment from "moment";
import axios from 'axios';



const Account = ({history}) => {

    const [subscriptions, setSubscriptions] = useState([]);

    const user = useSelector(state => state.user.userData)
    console.log(user.subscriptions)
    useEffect(() => {
        setSubscriptions(user.subscriptions)
    }, []);


    const DeleteKeyAndNew = async () => {

      let answer = window.confirm("Are you sure you would like a new Api Key?")
      if(answer){
        if (user && user.stripe_customer_id) {
          const { data } = await axios.get("/api/users/newApiKey")
        }
      }
    };

    const manageSubscriptions = async () => {
        console.log("called")
        const { data } = await axios.get("/api/stripe/customer-portal");
        window.open(data);
    };


    console.log(subscriptions)  
    return (
        <div className="container">
            <h1 className='col'>Account</h1>
          <div className="row">     
          <p className="lead">Subscription status</p>
          </div>
    
          <div className="row">
          
            {subscriptions &&
              subscriptions.map((sub) => (
                <div key={sub.id}>
                  <section>
                    <hr />
                    <h4 className="fw-bold">{sub.plan.nickname}</h4>
                    <h5>
                      {(sub.plan.amount / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: sub.plan.currency,
                      })}
                    </h5>
                    <p>Status: {sub.status}</p>
                    <p>
                      Card last 4 digit: {sub.default_payment_method.card.last4}
                    </p>
                    <p>
                      Current period end:{" "}
                      {moment(sub.current_period_end * 1000)
                        .format("dddd, MMMM Do YYYY h:mm:ss a")
                        .toString()}
                    </p>
                    <button
                      onClick={DeleteKeyAndNew}
                      className="btn btn-outline-danger"
                    >
                      Get New Api Key
                    </button>
                    <button
                      onClick={manageSubscriptions}
                      className="btn btn-outline-warning"
                    >
                      Manage Subscription
                    </button>
                  </section>
                </div>
              ))}
          </div>
        </div>
      );
};


export default Account;