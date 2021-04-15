import Link from 'next/link';
import {useRouter} from 'next/router';
import {parseCookies} from 'nookies'
import cookie from 'js-cookie'

const NabBar = () => {
    const router = useRouter();
    const cookies = parseCookies();
    const user = cookies.user ? JSON.parse(cookies.user) : "";
    
    function isActive(route) {
        //router.pathname provides the current route path
        if (route == router.pathname) {
            return "active";
        } else {
            return "";
        }
    }

    const handleLogOut = (event)=> {
        cookie.remove('token');
        cookie.remove('user');
        router.push('/login');
    }

    return(
        <nav>
        <div className="nav-wrapper #2962ff blue accent-4">
            <Link href="/" ><a className="brand-logo">MyStore</a></Link>          
          <ul id="nav-mobile" className="right">
          <li className = {isActive('/cart')}><Link href="/cart" ><a>Cart</a></Link></li>
             {(user.role == 'admin'|| user.role == 'root') && <li className = {isActive('/create')}><Link href="/create" ><a>Create</a></Link></li>}             
             {user ?
            <>
            <li className = {isActive('/account')}><Link href="/account" ><a>MyAccount</a></Link></li>
            <li><button className="btn red" onClick = {(event)=>{
                handleLogOut();
            }}>logout</button></li>
            </> 
            :
            <>
            <li className = {isActive('/signup')}><Link href="/signup" ><a>SignUp</a></Link></li>
            <li className = {isActive('/login')}><Link href="/login" ><a>Login</a></Link></li>
            </> 
            }             
          </ul>
        </div>
      </nav>
    )
}

export default NabBar;
