import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { checkWalletIsConnected } from "../components/LoadBlockchain";
import MyNFT from "./MyNft";

type Props = {
  children: JSX.Element;
};

export default ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [initialLoader, setInitialLoader] = useState(true);

  useEffect((): any => {
    (async () => {
      const account = await checkWalletIsConnected();
      console.log(account, "accccccc");
      setCurrentAccount(account);
      setInitialLoader(false);
    })();
  }, []);

  return (
    <>
      {initialLoader ? (
        <div>loading</div>
      ) : currentAccount ? (
        children
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
