import LoginPopup from "@/components/LoginPopup";
import SignupPopup from "@/components/SignupPopup";
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoginPopup, toggleSignupPopup } from "@/actions/appearances";

export default function Home() {

  const showLoginPopup = useSelector((state: any) => state.appearances.showLoginPopup);
  const showSignupPopup = useSelector((state: any) => state.appearances.showSignupPopup);
  const account = useSelector((state: any) => state.account.account);
  const dispatch = useDispatch();

  return (
    <div>

      {showLoginPopup && <LoginPopup />}
      {showSignupPopup && <SignupPopup />}

      <div className="flex flex-col justify-center items-center mt-24">

        <div className="flex mb-8 gap-4">
          {!account.accessToken && (
            <button onClick={() => dispatch(toggleLoginPopup())} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          )}
          {!account.accessToken && (
            <button onClick={() => dispatch(toggleSignupPopup())} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Sign up
            </button>
          )}
        </div>

        <h1 className="text-5xl block font-bold">
          {!account.accessToken && <span>Login/Sign Up to view content</span>}
          {account.accessToken && <span>Welcome {account.user.email}</span>}
        </h1>

      </div>

    </div>
  );
}
