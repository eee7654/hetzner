import nextConnect from "next-connect";
import { HztEndPoint, nextConnectConfig,runMiddleware } from "../../../../config/app_utils";
import csrf from "../../../../config/csrf";
import { authApi } from "../../../../config/iron_session";
import { make } from "simple-body-validator";
import axios from "axios";
import { generate } from "generate-password";

const app = nextConnect(nextConnectConfig)

app.post(async(req,res)=>{
    await runMiddleware(req,res,csrf)
    let uSession = req.session
    if(uSession.hasOwnProperty('Usr')){
        let reqBody = req.body
        let bodyValidator = make(reqBody,{
            srvId:['required','numeric'],
            ipId:['required','numeric']
        })
        if(bodyValidator.validate()){
            let offResponse = await axios.post(`${HztEndPoint}/servers/${reqBody.srvId}/actions/poweroff`,null,{headers:{Authorization:`Bearer ${process.env.HZT_TOKEN}`}})
            if(offResponse.data.action.error == null){
                await sleep(5000)
                let un_assResponse = await axios.post(`${HztEndPoint}/primary_ips/${reqBody.ipId}/actions/unassign`,null,{headers:{Authorization:`Bearer ${process.env.HZT_TOKEN}`}})
                if(un_assResponse.data.action.error == null){
                    let ipBody = {
                        assignee_id:reqBody.srvId,
                        assignee_type: "server",
                        auto_delete: false,
                        name: `from_api_${generate({symbols:false,length:8})}`,
                        type: "ipv4"
                    }
                    await sleep(5000)
                    let assResponse = await axios.post(`${HztEndPoint}/primary_ips`,ipBody,{headers:{Authorization:`Bearer ${process.env.HZT_TOKEN}`}})
                    if(assResponse.data.action.error == null){
                        await sleep(5000)
                        let onResponse = await axios.post(`${HztEndPoint}/servers/${reqBody.srvId}/actions/poweron`,null,{headers:{Authorization:`Bearer ${process.env.HZT_TOKEN}`}})
                        if(onResponse.data.action.error == null){
                            res.status(201).json({status:'ok'})
                        }else{
                            res.status(400).json({status:'hztErr',state:'on'})
                        }
                    }else{
                        res.status(400).json({status:'hztErr',state:'assign'})
                    }
                }else{
                    res.status(400).json({status:'hztErr',state:'unassign'})
                }
            }else{
                res.status(400).json({status:'hztErr',state:'off'})
            }
        }else{
            res.status(400).json({status:'badReq'})
        }
    }else{
        res.status(403).json({status:'forbidden'})
    }
})

const sleep = (ms)=>{
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

export default authApi(app)