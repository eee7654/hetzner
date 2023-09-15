import nextConnect from "next-connect";
import { CFEndPoint, nextConnectConfig,runMiddleware } from "../../../../config/app_utils";
import csrf from "../../../../config/csrf";
import { authApi } from "../../../../config/iron_session";
import { make } from "simple-body-validator";
import axios from "axios";

const app = nextConnect(nextConnectConfig)



app.post(async(req,res)=>{
    await runMiddleware(req,res,csrf)
    let uSession = req.session
    if(uSession.hasOwnProperty('Usr')){
        let reqBody = req.body
        let bodyValidator = make(reqBody,{
            newIp:['required','string'],
            dns:['required','string']
        })
        if(bodyValidator.validate()){
            const axiosInstance = axios.create({
                headers: {
                    'X-Auth-Key': process.env.CF_KEY,
                    'X-Auth-Email': process.env.CF_EMAIL,
                    Authorization: `Bearer ${process.env.CF_TOKEN}`,
                },
            })
            const response = await axiosInstance.get(`${CFEndPoint}/zones?name=${process.env.CF_DOMAIN}`);
            const zoneId = response.data.result[0].id;
            const dnsRecordsResponse = await axiosInstance.get(
                `${CFEndPoint}/zones/${zoneId}/dns_records`
            );
            const dnsRecords = dnsRecordsResponse.data.result;
            let targetRecord = dnsRecords.find(dnsRecord=> dnsRecord.name == `${reqBody.dns}.${process.env.CF_DOMAIN}`)
            const updatedRecordData = {
                type: 'A',
                name: targetRecord.name,
                content: reqBody.newIp,
                ttl: 1,
            }
            const updateResponse = await axiosInstance.put(
                `${CFEndPoint}/zones/${zoneId}/dns_records/${targetRecord.id}`,
                updatedRecordData
            )
            if(updateResponse.data.success){
                res.status(200).json({status:'ok'})
            }else{
                res.status(400).json({status:'cfErr'})
            }
        }else{
            res.status(400).json({status:'badReq'})
        }
    }else{
        res.status(403).json({status:'forbidden'})
    }
})

export default authApi(app)