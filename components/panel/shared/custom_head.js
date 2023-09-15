import Head from 'next/Head'

const CustomHead = (props)=>{
    return(
        <Head>
            <link type="text/css" href="/admins/css/datatables.bootstrap.css" rel="stylesheet"/>
            <link type="text/css" href="/admins/css/volt.css" rel="stylesheet"/>
            <link type="text/css" href="/admins/css/style.css" rel="stylesheet"/>
            {props.children}
        </Head>
    )
}
export default  CustomHead