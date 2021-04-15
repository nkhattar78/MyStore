import {useState} from'react';
import Link from 'next/link';
import cookie from 'js-cookie';
import {useRouter} from 'next/router'

const Login = ()=> {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event)=>{
        event.preventDefault();
        console.log(' email' + email + ' password: ' + password);
        
        const res = await fetch(`http://localhost:3000/api/login`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const res2 = await res.json();
        if (res2.error) {
            M.toast({html: res2.error, classes:"red"})
        } else {
            M.toast({html: "User created successfully", classes:"green"})
            cookie.set('token', res2.token);
            cookie.set('user', res2.user);
            router.push('/account');
        }
    }

    return(
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
               <button className="btn waves-effect waves-light #2962ff blue accent-4" type="submit">Login
                   <i className="material-icons right">forward</i>
               </button>
               <Link href="/signup">
                   <a><h5>New User?</h5> </a>
               </Link>
        </form>       
    )
}

export default Login;
