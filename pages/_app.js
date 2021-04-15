
/* All the components will be received here. If we don't to make any changes to the components then we can just return
    return<Component {...pageProps}/>
    If not making any change then the components will be returned as is without any modification

    My adding  <Component {...pageProps}/> in Layout component we are wrapping each component under Layout. 
    According to the Layout component code, page will be displayed along with Navbar.
*/
import Layout from '../components/Layout';

function MyApp ({Component, pageProps}) {
    return(
        <Layout>
            <Component {...pageProps}/>
        </Layout>
    )
} 

export default MyApp;
