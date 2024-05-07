import HeaderButton from "@/components/common/header/HeaderButton";
import HeaderLink from "@/components/common/header/HeaderLink";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";
import { clsx } from "clsx";
import { useDarkModeStore } from "@/libs/store";

interface HeaderMenuItemProps {
  isLogin: boolean;
  userSession: any;
  login: () => void;
  logout: () => void;
  darkMode: boolean;
}

const HeaderMenuItem = ({
  isLogin,
  userSession,
  login,
  logout,
  darkMode,
}: HeaderMenuItemProps) => {
  const router = useRouter();
  return (
    <div
      className={clsx(
        `flex flex-col items-start gap-2`,
        `w-full max-w-2xl`,
        `dark:bg-black`,
      )}
    >
      {isLogin && (
        <>
          <HeaderButton
            onClick={() =>
              router.push(`/user/${formatPathName(userSession.userNickname)}`)
            }
          >
            My Page
          </HeaderButton>
          <HeaderButton onClick={() => router.push(`/playlist/create`)}>
            Create Playlist
          </HeaderButton>
        </>
      )}
      {!isLogin && (
        <>
          <HeaderButton onClick={() => router.push(`/signup`)}>
            Sign up
          </HeaderButton>
          <HeaderButton onClick={async () => await login()}>Login</HeaderButton>
        </>
      )}
      <HeaderLink href={`/discover`}>Discover</HeaderLink>
      <HeaderLink href={`/trending`}>Trending</HeaderLink>
      <HeaderLink href={`/search`}>Search</HeaderLink>
      {isLogin && (
        <HeaderButton onClick={async () => await logout()}>Logout</HeaderButton>
      )}
      <button
        className={`self-end px-3 py-1 hover:bg-gray-200 hover:text-white`}
        onClick={() => useDarkModeStore.setState((prev) => !prev)}
      >
        {darkMode ? (
          <SunIcon className={`w-6 h-6 text-orange-500`} />
        ) : (
          <MoonIcon className={`w-6 h-6 text-blueGray-500`} />
        )}
      </button>
    </div>
  );
};

export default HeaderMenuItem;
