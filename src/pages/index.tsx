import LoginPopup from "@/components/LoginPopup";
import SignupPopup from "@/components/SignupPopup";
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoginPopup, toggleSignupPopup } from "@/actions/appearances";
import { AccountInterface, PopupVisibilityInterface } from "@/interfaces/interfaces";

export default function Home() {

  const showLoginPopup = useSelector((state: { appearances: PopupVisibilityInterface }) => state.appearances.showLoginPopup);
  const showSignupPopup = useSelector((state: { appearances: PopupVisibilityInterface }) => state.appearances.showSignupPopup);
  const account = useSelector((state: { account: AccountInterface }) => state.account.account);
  const dispatch = useDispatch();

  return (
    <div>

      {showLoginPopup && <LoginPopup />}
      {showSignupPopup && <SignupPopup />}

      <div className="flex flex-col justify-center items-center mt-24">

        <div className="flex mb-8 gap-4">
          {!account?.accessToken && (
            <button onClick={() => dispatch(toggleLoginPopup())} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          )}
          {!account?.accessToken && (
            <button onClick={() => dispatch(toggleSignupPopup())} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Sign up
            </button>
          )}
        </div>

        <h1 className="text-3xl block font-bold text-center sm:text-5xl">
          {!account?.accessToken && <span>Login/Sign Up to view content</span>}
          {account?.accessToken && <span>Welcome {account.user?.email}</span>}
        </h1>

      </div>

    </div>
  );
}
