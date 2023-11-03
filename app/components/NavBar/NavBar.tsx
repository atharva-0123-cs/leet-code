import { authModalState } from "@/app/atom/authModalAtom";
import Link from "next/link";
import { useSetRecoilState} from 'recoil';

const NavBar = () =>
{
    const setAuthModalState = useSetRecoilState(authModalState);

    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, isOpen : true}))
    }

    return (
        <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex gap-1" >
                <h1 className="text-white text-lg">Leet</h1><h1 className="text-lg text-orange-400">Code</h1>
            </Link>

            <div className="flex items-center">
            <button className="bg-brand-orange text-white py-1 px-2 
            text-sm font-medium hover:text-brand-orange hover:bg-white
            border-2 border-transparent transtion duration-300 ease-in-out 
            rounded-md " 
            onClick={handleClick}>
            Sign In
            </button>
            </div>

        </div>
    )
};

export default NavBar;