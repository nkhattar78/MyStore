import Link from 'next/link';
const Home = ({products})=> {
  console.log(products);

  const productsList = products.map(product => {
    return(
      <div className="card pcard" key = {product._id}>
      <div className="card-image">
        <img src={product.mediaUrl}/>
        <span className="card-title white-text">{product.name}</span>
      </div>
      <div className="card-content">
        <p> Rs. {product.price}</p>
      </div>
      <div className="card-action">
        <Link href = {'/product/[id]'} as={`/product/${product._id}`}> 
            <a>View Product</a>
        </Link>
        {/* <a href="#">This is a link</a> */}
      </div>
    </div>
    )
  })
    
  return(
    <div className="rootcard">
       {productsList}
    </div>
  )
}

//Example of calling an API to fetch data
// export async function getStaticProps(context) {
//   const res = await fetch('http://localhost:3000/api/test')
//   const data = await res.json();
//   console.log(data);
//   return{
//     props:{message:data.message},
//   }
// }

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/products');
  const data = await res.json();
  console.log("Response received from server");
  console.log(data);
  return{
    props:{products:data}
  }
}


export default Home;
