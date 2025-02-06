import { FC } from "react";

import { FaApple, FaTelegram } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { FaVk, FaGoogle } from "react-icons/fa6";
import { HiMiniKey } from "react-icons/hi2";

import { Button } from "@app/shared/ui/buttons";

const size = 24;

const oauthFastLogin = [
    {label: "Google", href: "#", icon: <FaGoogle size={size} color="white" />},
    {label: "Discord", href: "#", icon: <BsDiscord size={size} color="white" />},
    {label: "Telegram", href: "#", icon: <FaTelegram size={size} color="white" />},
    {label: "Apple", href: "#", icon: <FaApple size={size} color="white" />},
    {label: "Vkontakte", href: "#", icon: <FaVk size={size} color="white" />},
    {label: "UAK", href: "#", icon: <HiMiniKey size={size} color="white" />},
];

export const OauthFormSocials: FC = () => {
    return(
        <div className="flex flex-col gap-2">
            <hr className="border-white/15" />
            <ul className="grid grid-cols-3 gap-2 w-full">
                {oauthFastLogin.map((elem, index) =>
                    <Button key={`oauth-${index}`} className="flex flex-center gap-4 bg-neutral-900 p-2 rounded-lg duration-300 hover:bg-sky-500">
                        {elem.icon}
                    </Button>
                )}
            </ul>
            <hr className="border-white/15" />
        </div>
    )
}