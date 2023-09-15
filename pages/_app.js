import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

function MyApp({ Component, pageProps,router }) {
  useEffect(() => {
    if (router.pathname.startsWith("/users")) {
      import("../styles/users/shared/volt.css");
      import("../styles/users/shared/datatables.bootstrap.css");
      import("../styles/users/shared/style.css");
    } else {
      //import("../styles/users/style.css");
    }
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);
  return (
    <>
      <NextNProgress color="#E60000" options={{showSpinner:false}}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
