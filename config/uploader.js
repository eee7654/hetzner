'use strict'
const path = require('path')
const fs = require('fs')
const { rootPath } = require('./app_utils')

exports.saveSingle = (files, foldername) => {
    return new Promise((resolve, reject) => {
        let pathObj = {}
        for(let key of Object.keys(files)){
            let file = files[key]
            let typeArray = file.originalFilename.split('.')
            let fileType = typeArray[typeArray.length-1]
            let fileUrl = `/storage/${foldername}/${file.newFilename}.${fileType}`
            let uploadPath = path.join(process.env.ROOT_DIR || process.cwd(), '/public/' + fileUrl)
            let uploadFolder = uploadPath.substring(0, uploadPath.lastIndexOf("\\") + 1)
            if(!fs.existsSync(uploadFolder)){
                fs.mkdirSync(uploadFolder)
            }
            const data = fs.readFileSync(file.filepath)
            fs.writeFileSync(uploadPath, data)
            fs.unlinkSync(file.filepath)
            pathObj[key] = `/${foldername}/${file.newFilename}.${fileType}`
        }
        resolve(pathObj)
    })
}