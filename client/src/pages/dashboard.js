import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { generateKey } from '../store/actions/user_actions';
import axios from 'axios';


  
const Dashboard = ({history}) => {
    const [api, setApi] = useState('')
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.userData)



    useEffect(() => {
        getKey()
        setApi(user.api_key)
    }, [api, user])


    const getKey =()=>{
        if(user.subscriptions.length > 0){
            console.log('Subscription exists')
        }
        
    }




    const handleClick = async (e, price) => {
        console.log(user)
        if (user && user.stripe_customer_id) {
          const { data } = await axios.post("/api/stripe/create-subscription", {
            priceId: process.env.STRIPE_PRICE_ID,
          });
          window.open(data);
        } else {
          history.push("/dashboard");
        }
    };
    

    const PriceCard = ()=>{
        return (
            <div class='row'>
            <div className="col">
              <div className={`card mb-4 rounded-3 shadow-sm`}>
                <div className={`card-header py-3}`}>
                  <h4 className="my-0 fw-normal">Monthly</h4>
                </div>
        
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    {(2900 / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                    <small className="text-muted fw-light">/month</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="fw-bold">Some Description</li>
                    <li>Free market analysis</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button class='btn btn-primary btn-lg btn-block' onClick={()=>handleClick()}>
                      Purchase
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className={`card mb-4 rounded-3 shadow-sm`}>
                <div className={`card-header py-3}`}>
                  <h4 className="my-0 fw-normal">Yearly</h4>
                </div>
        
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    {(30000 / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                    <small className="text-muted fw-light">/year</small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="fw-bold">Some Description</li>
                    <li>Free market analysis</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button class='btn btn-primary btn-lg btn-block' onClick={()=>handleClick()}>
                      Purchase
                  </button>
                </div>
              </div>
            </div>
            </div>
          );
    }


    // <button onClick={()=>handleClick()}>Subscribe</button>

   return (
    <>  
        <div className='container'>
        <h2>Dashboard</h2>

            {!api ? PriceCard() : 
            <div class="card">
                <div class="card-header">
                    Api Key
                </div>
                <div style={{cursor: 'pointer'}} onClick={() => {navigator.clipboard.writeText(user.api_key)}} class="card-body">
                    <blockquote class="blockquote mb-0">
                    <h3>{api}</h3>
                    <footer class="blockquote-footer">Click to Copy</footer>
                    </blockquote>
                </div>
            </div>
            }

        </div>

        
    </>
  )
}

export default Dashboard;