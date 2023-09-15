import {authPages} from '../config/iron_session'

export const getServerSideProps = authPages(async (context) => {
  const {req,res} = context
  const uSession = req.session;
  await uSession.save()
  return {
    redirect: {
      destination: '/users/login',
      permanent: false,
    },
  }
});


export default function Home(srvData) {
  return (
    <>
    </>
  )
}
