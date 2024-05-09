import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { setAccount } from "@/actions/account";
import { AccountInterface } from "../interfaces/interfaces";
import { useTranslations } from 'next-intl';
import LanguageSelector from "./LanguageSelector";

export default function Header() {

    const tHeader = useTranslations('Header');
    const dispatch = useDispatch();
    const account = useSelector((state: { account: AccountInterface }) => state.account.account);

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav>
                <div className="flex justify-between items-center">
                    <ul className="flex space-x-8">
                        <li>
                            <Link href="/">
                                {tHeader('homeLinkText')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/jobs">
                                {tHeader('jobsLinkText')}
                            </Link>
                        </li>

                        {account?.accessToken &&
                            <li onClick={() => dispatch(setAccount({}))}>
                                <span className="cursor-pointer">{tHeader("logout")}</span>
                            </li>
                        }

                    </ul>
                    <div className="flex gap-3">
                        <LanguageSelector />
                        {account?.accessToken &&
                            <div className="flex items-center gap-2">
                                <p className="text-xs">
                                    {account.user?.email}
                                </p>
                                <img src={account.user?.profileImage} alt="profile-pic" width="28" className="rounded-full" />
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header >
    );
}