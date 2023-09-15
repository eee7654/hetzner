// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect"
import { nextConnectConfig } from "../../config/app_utils"

 const app = nextConnect(nextConnectConfig)

 app.get((req,res)=>{
  res.status(200).json({name:'mamadoo'})
 })

 export default app
