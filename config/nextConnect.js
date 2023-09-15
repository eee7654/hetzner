import nextConnect from 'next-connect'

const app = nextConnect({
    onError: (error, req, res)=>{
      res.status(500).json({ error: `Sorry something Happened! ${error.message}` })
    },
    onNoMatch: (req, res)=> {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    },
    attachParams: true
})

module.exports = app