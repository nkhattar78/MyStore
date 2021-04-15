import { useRouter } from "next/router";
import {useState,useRef, useEffect} from 'react'
import {parseCookies} from 'nookies';
import cookie from 'js-cookie';

//This is an example of DYNAMIC PAGE where calling the api to get the page details and then displaying product details according to that
const Product = ({product}) => {
    //initializing thequantity value as 1
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const modalRef = useRef(null);
    const cookies = parseCookies();
    const user = cookies.user? JSON.parse(cookies.user) : "";
    useEffect(()=> {
        M.Modal.init(modalRef.current);
    },[]);
    if (router.isFallback) {
        return(
            <h3>loading ...</h3>
        )
    }

    const cancelModal = () => {
        router.push('/');
    }

    const deleteProduct = async()=> {
        const res = await fetch(`http://localhost:3000/api/product/${product._id}`, {
            method:"DELETE"
        });
        const res2 = await res.json();
        router.push('/');
    }


    const getModal = ()=>{
        return(
            <div id="modal1" className="modal" ref = {modalRef}>
              <div className="modal-content">
                <h4>{product.name}</h4>
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="modal-footer">
              <button className = "btn waves-effect waves-light #2962ff blue accent-4"
              onClick = {()=>{cancelModal()}}> Cancel 
            <i className="material-icons left">cancel</i>
            </button> 
            <button className = "btn waves-effect waves-light #d50000 red accent-4"
            onClick = {()=>deleteProduct()}> Yes 
            <i className="material-icons left">delete</i>            
            </button> 
              </div>
            </div>
        )
    }

    const handleAddToCart = async() => {
        console.log('handled add t cart. Token: ' + cookies.token);
        const res = await fetch(`http://localhost:3000/api/cart`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":cookies.token
            },
            body:JSON.stringify({
                quantity,
                productId:product._id
            })
        });

        const res2 = await res.json();
        console.log(res2);    
        if (res2.error) {
            M.toast({html:res2.error, classes:"red"})
            cookie.remove("user");
            cookie.remove("token");
            router.push('/login');
        } else {
            M.toast({html:res2.message, classes:"green"})
        }
        
    }

    return (
        <div className = "container center-align">
            <h3>{product.name}</h3>
            <img src = {product.mediaUrl} style = {{width:'30%'}} />
            <h5>Rs. {product.price}</h5>
            {user? 
                <div>
                    <input 
                       type="number"
                       style = {{width:"200px", margin:"10px"}}
                       min="1"
                       value = {quantity}
                       onChange = {(event)=>{setQuantity(Number(event.target.value))}}
                       placeholder = "Quantity"/>
                   <button 
                       className = "btn waves-effect waves-light #2962ff blue accent-4"
                       onClick = {()=>{ handleAddToCart() }}> Add
                       <i className="material-icons left">add</i>
                   </button>
                </div>
            :
            <div> 
                <button 
                    className = "btn waves-effect waves-light #2962ff blue accent-4"
                    onClick = {()=>{
                        router.push('/login');
                    }}
                    > Login to shop
                   <i className="material-icons left">login</i>
                </button>

            </div>
            }
            <p className = "left-align">
                {product.description}
            </p>
            {(user.role == "root" || user.role == "admin") && 
                        <button data-target="modal1" className = "btn modal-trigger #d50000 red accent-4"> Delete 
                        <i className="material-icons left">delete</i>
                        </button> 
            }
            {getModal()}
        </div>
    )
}

//This is an example of using getServerSideProps API. 
//For every page request getServerSideProps will make a server side call to fetch the product details.
// export async function getServerSideProps({params:{id}}){
//     console.log("id: " + id);
//     //const res = await fetch(`http://localhost:3000/api/product/${id}`);
//     const res = await fetch(`http://localhost:3000/api/product/${id}`, {
//             method:"GET"
//         });
//     const data = await res.json();
//     return {
//         props:{product:data}
//     }
// }

//This is an example of using getStaticProps API to achieve the same we did above using the  getServerSideProps
//As getStaticProps will prepare the pages at build time, so need to pass all the IDs for which product pages need to be built at build time
// For doing that will use getStaticPaths for getting the IDs which will pass to the getStaticProps
export async function getStaticProps({params:{id}}){
    console.log("id received from page: " + id);    
    const res = await fetch(`http://localhost:3000/api/product/${id}`);
    const data = await res.json();
    return {
        props:{product:data}
    }
}

//Nowe there are 2 options in case of building static pages, etiher all the IDs will be added here or some IDs be added here. 
//In case only some ID are added here, then based on fallback value it will show error or make the server call at runtime to getStaicProps to get the product details.
export async function getStaticPaths() {
    return{
        paths:[
            {params:{id:"60704679243be8a4851e5691"}},
            {params:{id:"60705848972f05e2288e5cbc"}}
        ],
        fallback:true
    }
}
export default Product;
