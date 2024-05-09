import { useRouter } from 'next/router';

const LanguageSelector = () => {
    const router = useRouter();

    const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = e.target.value;
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <select className="text-black px-2 py-1 text-sm" onChange={handleChangeLanguage} defaultValue={router.locale}>
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
            <option value="fr">français</option>
            <option value="ko">한국어</option>
        </select>
    );
};

export default LanguageSelector;