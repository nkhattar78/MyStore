import {useState} from'react';
import {parseCookies} from 'nookies'
import baseUrl from '../helpers/baseUrl';
import Link from 'next/link';

const Create = ()=> {
    const [name, setName] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");

    const handleSubmit = async (event)=>{
        event.preventDefault();
        
        //Upload image on cloudinary and get the url
        const imageURL = await imageUpload();
        console.log('imageURL received from cloudinary: ' + imageURL);
        const res = await fetch(`${baseUrl}/api/products`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name, //Ideally it should be name:name here but as both are same we can write only name and it means name:name. It's just a shorthand.
                price,
                image:imageURL,
                description
            })
        });
        const res2 = await res.json();
        if (res2.error) {
            M.toast({html: res2.error, classes:"red"})
        } else {
            M.toast({html: "Product created successfully", classes:"green"})
        }
    }

    const imageUpload = async() => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', "mystore"); // mystore is the upload_preset set in the cloudinary site.
        data.append('cloud_name', "khattar78"); // khattar78 is the cloud name set in the cloudinary site.

        const res = await fetch(`https://api.cloudinary.com/v1_1/khattar78/image/upload`, {
            method:"POST",
            body:data
        })

        const res2 = await res.json();
        console.log(res2);
        return res2.url;
    }
    
    return(
        <form className="container" onSubmit = {(event)=>{handleSubmit(event)}}>
            <input 
                type = "text" 
                name ="name" 
                placeholder= "Product Name" 
                value = {name}
                onChange = {(event)=>{
                    setName(event.target.value)
                }}/>
            <input 
                type = "text" 
                name ="price" 
                placeholder= "Product Price" 
                value = {price}
                onChange = {(event)=>{
                    setprice(event.target.value)
                }}/>
            <div className="file-field input-field">
            <div className="btn #2962ff blue accent-4">
              <span>File</span>
              <input type="file"
                  accept = "image/*"
                  onChange = {(event) => {
                      setimage(event.target.files[0])
                  }}
              />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
           </div>
           </div>
           <img className="responsive-img" src={image?URL.createObjectURL(image):""} style = {{width:"50px",height:"50px", margin:"10px"}}/>
           <textarea 
               name = "description" 
               value = {description}
               placeholder = "Product Description"
               onChange = {(event) => {
                   setdescription(event.target.value)
               }}
               className="materialize-textarea">
               </textarea>
               <button className="btn waves-effect waves-light #2962ff blue accent-4" type="submit">Submit
                   <i className="material-icons right">send</i>
               </button>
        </form>       
    )
}

//Writing logic to make sure user logged in is root or adming user 
// If user is not logged in then redirect the user to home
export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const user = cookies.user ? JSON.parse(cookies.user) : "";
    console.log ('In Create Page. user: ' +  JSON.stringify(user) );
    if (user == "" | user.role == 'user') {
        //Get the respponse from the context and redirect to login page
        const {res} = context
        res.writeHead(302, {Location:"/"});
        res.end();
    }
    //This is required to return show the current page
    return { props: {} } 
}

export default Create;
