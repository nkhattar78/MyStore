import { useEffect, useState } from "react"
import {parseCookies} from 'nookies'
import baseUrl from '../helpers/baseUrl'

function UserRole(){
    const [users,setUsers] = useState([]);
    const {token} = parseCookies();
    useEffect (()=> {
        fetchUsers();
    }, [])

    const fetchUsers = async ()=>{
        console.log('Going to fetch users from DB');
        const res = await fetch(`${baseUrl}/api/users`, {
            headers:{
                "Authorization":token
            }
        });
        const res2 = await res.json();
        console.log(res2);
        setUsers(res2);
    }
    const handleRoleChange = async (_id, role) =>{
        const res = await fetch(`${baseUrl}/api/users`, {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization":token
            },
            body:JSON.stringify({
                _id, role
            })
        });
        const res2 = await res.json();
        console.log(res2);
        //Updating the user received from the API call in the users array
        const updatedUsers = users.map(user => {
            if ((user.role!= res2.role) && (user.email == res2.email)) {
                return res2;
            } else {
                return user;
            }
        })
        setUsers(updatedUsers);
    }
    return(
        <>
            <h2>User Roles</h2>
            <table className="striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(item=>{
                        return(
                            <tr>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td on onClick={()=>{handleRoleChange(item._id, item.role)}}>{item.role}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )

}

export default UserRole
