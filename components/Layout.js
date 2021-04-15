import Navbar from './Navbar'
import Head from 'next/head'

//Page using Layout will be received in children
const Layout = ({children}) => {
    return(
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <Navbar/>
            {children}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </div>
    )
}

export default Layout
