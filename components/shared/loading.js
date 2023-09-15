import Image from 'next/image'
import { useEffect,useState } from 'react'
import {ThreeDots} from 'react-loader-spinner'
import appLogo from '../../public/images/logo.png'

const Loading = (props)=>{
    let [loadingCls,setLoadingCls] = useState('d-flex')
    useEffect(()=>{
        setTimeout(()=>{
            setLoadingCls('d-none')
            props.setLoaded(true)
        },500)
    },[])
    return(
        <div className={`${loadingCls} bg-white flex-column justify-content-center align-items-center w-100`} style={{height:'100vh',overflowY:'hidden',position:'absolute',zIndex:999}}>
            <Image src={appLogo} alt="لوگو زوموتور" width={200} height={60}/>
            <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="#E60000" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default Loading