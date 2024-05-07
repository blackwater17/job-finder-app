import { useEffect, useState, useRef } from "react";
import LoginPopup from "@/components/LoginPopup";
import SignupPopup from "@/components/SignupPopup";
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {

  const showLoginPopup = useSelector((state: any) => state.appearances.showLoginPopup);
  const showSignupPopup = useSelector((state: any) => state.appearances.showSignupPopup);
  const account = useSelector((state: any) => state.account.account);

  return (
    <div>

      {showLoginPopup && <LoginPopup />}
      {showSignupPopup && <SignupPopup />}

      <div className="flex justify-center items-center mt-24">
        <h1 className="text-5xl font-bold">
          {!account.accessToken && <span>Login/Sign Up to view content</span>}
          {account.accessToken && <span>Welcome {account.user.email}</span>}
        </h1>
      </div>

    </div>
  );
}
