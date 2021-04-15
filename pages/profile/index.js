import Link from 'next/link';

const Profile = ()=> {
    return(
      <div>
        <h1>This is Profile  page</h1>
        <Link href = '/' >
            <a>Go to Home  Page</a>
        </Link>
      </div>
    )
  }
  
  export default Profile;
  