import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { setAccount } from "@/actions/account";
import { AccountInterface } from "../interfaces/interfaces";

export default function Header() {

    const dispatch = useDispatch();
    const account = useSelector((state: { account: AccountInterface }) => state.account.account);

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav>
                <div className="flex justify-between items-center">
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

                        {account?.accessToken &&
                            <li onClick={() => dispatch(setAccount({}))}>
                                <span className="cursor-pointer">Logout</span>
                            </li>
                        }

                    </ul>
                    {account?.accessToken &&
                        <div className="flex items-center gap-2">
                            <p className="text-xs">
                                {account.user?.email}
                            </p>
                            <img src={account.user?.profileImage} alt="profile-pic" width="28" className="rounded-full" />
                        </div>
                    }
                </div>
            </nav>
        </header >
    );
}