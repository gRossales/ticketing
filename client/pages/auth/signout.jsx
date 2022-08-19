import Router from "next/router";
import { useEffect } from "react";
import UseRequest from "../../hooks/use-request";

function Signout() {
  const {doRequest} = UseRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(()=>{
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
}

export default Signout;