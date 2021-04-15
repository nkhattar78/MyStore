import {parseCookies} from 'nookies'
import { useEffect, useRef } from 'react';
import UserRole from './UserRole';

const Account = ({orders})=> {
    const cookie = parseCookies()
    const user = cookie.user? JSON.parse(cookie.user) : "";
    
    //orderCard is required for initializing the collapsible list
    const orderCard = useRef(null);
    useEffect(()=>{
        M.Collapsible.init(orderCard.current)
    }, []);

    const OrderHistory = ()=> {
        return(
            <ul className="collapsible" ref={orderCard}>
                {orders.map(item => {
                    return(
                        <li key = {item._id}>
                            <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
                            <div className="collapsible-body">
                                <h5> Total: {item.total}</h5>
                                {
                                    item.products.map(pitem => {
                                        return <h6 key = {pitem._id}> {pitem.product.name} * {pitem.quantity}</h6>
                                    })
                                }
                            </div>
                        </li>)
                })}
          </ul>
        )
    }
    
    
    const MasterComponent = ()=> {
        return(
        <div className = "container">
            <div className = "center-align white-text" style = {{display:"flex", justifyContent:"space-between", marginTop:"5px", backgroundColor: "#1565c0",padding:"3px"}}>
                <h4> {user.username} </h4>
                <h4> {user.email} </h4>
                <h4> Order count: {orders.length} </h4>
            </div>
            <h3>Order History</h3> 
            {
                orders.length == 0? 
                <div className = "container" >
                    <h5>You have no order history</h5>
                </div>
                : <OrderHistory/>
            }
            {user.role == "root"
                && <UserRole/>}
            
        </div>
        )
    }

    return (
        <>
            <MasterComponent/>
        </>        
    )
}

//Writing logic to make sure user see the page only if the user is logged in
// If user is not logged in then redirect the user to login page
export async function getServerSideProps(context) {
    const {token} = parseCookies(context);
    console.log ('In Accounts Page. Token: ' +  token );
    if (!token) {
        //Get the respponse from the context and redirect to login page
        const {res} = context
        res.writeHead(302, {Location:"/login"});
        res.end();
    }
    const res = await fetch(`http://localhost:3000/api/orders`, {
        headers:{
            "Authorization":token
        }
    });
    const res2 = await res.json();
    console.log('Orders recevied from DB');
    console.log(res2);
    return {
        props:{orders:res2}
    }
}
export default Account;
