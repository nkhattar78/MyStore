import {useState} from'react';
import Link from 'next/link';
import { useRouter } from "next/router";

const SignUp = ()=> {
    const router = useRouter();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event)=>{
        event.preventDefault();
        console.log('userName: ' + username + ' email' + email + ' password: ' + password);
        
        const res = await fetch(`http://localhost:3000/api/signup`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        });
        const res2 = await res.json();
        if (res2.error) {
            M.toast({html: res2.error, classes:"red"})
        } else {
            M.toast({html: "User created successfully", classes:"green"})
            router.push('/login');
        }
    }

    return(
        <form className="container card authcard center-align" onSubmit = {(event)=>{handleSubmit(event)}}>
            <input 
                type = "text" 
                name ="name" 
                placeholder= "UserName" 
                value = {username}
                onChange = {(event)=>{
                    setUserName(event.target.value)
                }}/>
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
               <button className="btn waves-effect waves-light #2962ff blue accent-4" type="submit">Signup
                   <i className="material-icons right">forward</i>
               </button>
               <Link href="/login">
                   <a><h5>Already have an account?</h5> </a>
               </Link>
        </form>       
    )
}

export default SignUp;
