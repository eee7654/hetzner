export const nextConnectConfig = {
    onError: (error, req, res)=>{
      res.status(500).json({ error: error.message })
    },
    onNoMatch: (req, res)=> {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    },
    attachParams: true
}

export const runMiddleware = (req,res,fn)=>{
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
  }

  export const PaginationLabels = {firstPage:'ابتدا',lastPage:'انتها',nextPage:'بعدی',prevPage:'قبلی'}

  export const HztEndPoint = 'https://api.hetzner.cloud/v1'

  export const CFEndPoint = 'https://api.cloudflare.com/client/v4'