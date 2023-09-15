import csurf from 'csurf'

const  csrf = csurf({ cookie: false })

export default csrf