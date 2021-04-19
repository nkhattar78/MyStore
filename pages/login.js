import {useState} from'react';
import Link from 'next/link';
import cookie from 'js-cookie';
import {useRouter} from 'next/router'
import baseUrl from '../helpers/baseUrl';
import timeoutFn from '../helpers/utils';
import Spinner from '../components/Spinner'

const Login = ()=> {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginProcessInProgress, setloginProcessInProgress] = useState(false);

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setloginProcessInProgress(true);
        console.log(' email' + email + ' password: ' + password);
        
        const res = await fetch(`${baseUrl}/api/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const res2 = await res.json();
        await timeoutFn(2000);
        setloginProcessInProgress(false);
        if (res2.error) {
            M.toast({html: res2.error, classes:"red"})
        } else {
            cookie.set('token', res2.token);
            cookie.set('user', res2.user);
            router.push('/account');
        }
    }

    return(
        <>
            {/* <div style = {{alignContent:center}}> */}
            <div className="center-align">
                {loginProcessInProgress && <Spinner/>}
            </div>        
            
            <form className="container card authcard center-align" onSubmit = {(event)=>{handleSubmit(event)}}>
            <input 
                type = "text" 
                name ="email" 
                placeholder= "Email" 
                value = {email}
                onChange = {(event)=>{
                    setEmail(event.target.value)
                }}/>
            <input 
                type = "password" 
                name ="password" 
                placeholder= "Password" 
                value = {password}
                onChange = {(event)=>{
                    setPassword(event.target.value)
                }}/>
               <button className="btn waves-effect waves-light #2962ff blue accent-4" type="submit" disabled = {loginProcessInProgress}>Login
                    {!loginProcessInProgress && <i className="material-icons right">forward</i>} 
                    {loginProcessInProgress && <i className="material-icons right">loop</i>} 
               </button>
               <Link href="/signup">
                   <a><h5>New User?</h5> </a>
               </Link>
        </form>   
        </>
    
    )
}

export default Login;
