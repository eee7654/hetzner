import axios from "axios"
export default function SendSMS(props){
    console.log(props)
    const sendSms = (event)=>{
        event.preventDefault()
        console.log(event.target[0].value)
        const phone = event.target[0].value
        if(phone.length == 11){
          axios.post('/api/users/send-sms',{phone:phone},{headers:{'csrf-token':props.csrfToken}})
          .then((response)=>{
            if(response.data.status == 'ok'){
                props.setToken(response.data.token)
                props.setPhone(phone)
                props.setStep(2)
            }
          }).catch((reason)=>{
            console.error(reason)
          })
        }else{
          console.log('phone length Incorrect')
        }
    }
    return(
        <form onSubmit={sendSms}>
            <input className='form-control' type='phone' placeholder='شماره موبایل' />
            <button className='btn btn-dark mt-2' type='submit'>تایید</button>
        </form>
    )
}