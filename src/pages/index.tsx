import LoginPopup from "@/components/LoginPopup";
import SignupPopup from "@/components/SignupPopup";
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoginPopup, toggleSignupPopup } from "@/actions/appearances";
import { AccountInterface, PopupVisibilityInterface } from "@/interfaces/interfaces";
import { useTranslations } from 'next-intl';


export default function Home() {

  const tHome = useTranslations('Home');
  const tButtons = useTranslations('ButtonTexts');

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
              {tButtons('login')}
            </button>
          )}
          {!account?.accessToken && (
            <button onClick={() => dispatch(toggleSignupPopup())} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              {tButtons('signup')}
            </button>
          )}
        </div>

        <h1 className="text-3xl block font-bold text-center w-2/3 sm:text-5xl">
          {!account?.accessToken &&
            <span>
              {tHome('loginMessage')}
            </span>}
          {account?.accessToken && <span>
            {tHome('welcome')} {account.user?.email}</span>}
        </h1>

      </div>

    </div>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default
    }
  };
}
