'use strict';
import { sealData,unsealData } from 'iron-session'

module.exports = {
	sign: (payload, exp) => {
		return new Promise((resolve,reject)=>{
			sealData(payload,{password:process.env.COOKIE_PASS,ttl:exp})
			.then((token)=>{
				resolve(token)
			})
			.catch((reason)=>{
				reject()
			})
		})
		
	},
	verify: async(token,exp) => {
		const decrypted = await unsealData(token,{password:process.env.COOKIE_PASS,ttl:exp})
		if(!isEmpty(decrypted)){
			return decrypted
		}else{
			return false
		} 
	}
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}