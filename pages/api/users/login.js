import { authApi } from '../../../config/iron_session'
import bcrypt from 'bcrypt'
import User from '../../../models/User'
import csrf from '../../../config/csrf'
import { runMiddleware,nextConnectConfig } from '../../../config/app_utils'
import nextConnect from 'next-connect'

const app = nextConnect(nextConnectConfig)

app.post(async (req,res)=>{
    //await runMiddleware(req,res,cors)
    await runMiddleware(req,res,csrf)
    let user = await User.query()
    .select('id','passwrd')
    .where('username',req.body.username)
    if(user.length != 0){
        user = user[0]
        if(bcrypt.compareSync(req.body.passwrd,user.passwrd)){
            let uSession = req.session
            uSession.Usr = {
                uID:user.id,
                uNAM:req.body.username
            }
            await uSession.save()
            res.status(201).json({status:'ok'})
        }else{
            res.status(400).json({status:'badPass'});
        }
    }else{
        res.status(404).json({status:'notFound'});
    }
})

export default authApi(app)