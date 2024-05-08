import React from "react";
import Link from "next/link";
import { toggleLoginPopup, toggleSignupPopup } from "@/actions/appearances";
import { useSelector, useDispatch } from 'react-redux';
import { setAccount } from "@/actions/account";

export default function Header() {

    const dispatch = useDispatch();
    const account = useSelector((state: any) => state.account.account);

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav>
                <ul className="flex space-x-8">
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/jobs">
                            Jobs
                        </Link>
                    </li>

                    {account.accessToken &&
                        <li onClick={() => dispatch(setAccount({}))}>
                            <span className="cursor-pointer">Logout</span>
                        </li>
                    }

                </ul>
            </nav>
        </header >
    );
}