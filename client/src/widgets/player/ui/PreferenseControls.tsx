"use client";
import { FC, useState } from "react";

import { 
    RiFlagFill, RiBardFill, RiCreativeCommonsFill, RiFullscreenFill,
    RiMic2AiFill, RiSettings2Fill, RiShadowFill, RiVipDiamondFill,
    RiFullscreenExitFill,
} from "react-icons/ri";

import Button from "@shared/ui/buttons/Button";
import DropdownMenu from "@shared/ui/dropdown/DropdownMenu";
import DropdownMenuContent from "@shared/ui/dropdown/DropdownMenuContent";

import { PreferenseControlsProps } from "../types/player";

const PreferenseControls: FC<PreferenseControlsProps> = ({...props}) => {

    const [dropdown, setDropdown] = useState<"quality" | "voiceover" | "subtitles" | "vfx" | "settings" | null>(null);

    const toggleDropdown = (category: typeof dropdown) => setDropdown(prev => (prev === category ? null : category));

    const {
        isLooped, isFullscreen, isPictureToPicture, iconSize = 18,
        sources, voices, subtitles, currentQuality, currentSubtitle, currentVoice,
        autoRemoveMissingControllers, useAberrationEffect, useBlackoutEffect,
        useMovieMode, useVFX,
        handleToggleFullscreen, toggleLoop, handleToggleSubtitles,
        handleVoiceChange, handleChangeQuality, handelTogglePictureToPicture,
        toggleVFX, toggleMovieMode, toggleAberrationEffect, toggleBlackoutEffect
    } = props;

    const menuItems = [
        {
            id: "quality",
            icon: <RiVipDiamondFill size={iconSize} />,
            condition: !!sources,
            options: sources?.map(source => ({
                label: source.label,
                onClick: () => handleChangeQuality(source.id),
                active: currentQuality === source.id
            }))
        },
        {
            id: "voiceover",
            icon: <RiMic2AiFill size={iconSize} />,
            condition: !autoRemoveMissingControllers || voices?.length,
            options: voices?.map(voice => ({
                label: voice.label,
                onClick: () => handleVoiceChange(voice.id),
                active: currentVoice === voice.id
            }))
        },
        {
            id: "subtitles",
            icon: <RiCreativeCommonsFill size={iconSize} />,
            condition: !autoRemoveMissingControllers || subtitles?.length,
            options: subtitles?.map(subtitle => ({
                label: subtitle.label,
                onClick: () => handleToggleSubtitles(subtitle.id),
                active: currentSubtitle === subtitle.id
            }))
        },
        {
            id: "vfx",
            icon: <RiBardFill size={iconSize} />,
            condition: true,
            options: [
                { label: "VFX эффекты", onClick: toggleVFX, active: useVFX },
                { label: "Режим кино", onClick: toggleMovieMode, active: useMovieMode },
                { label: "Аберрация", onClick: toggleAberrationEffect, active: useAberrationEffect },
                { label: "Затемнение", onClick: toggleBlackoutEffect, active: useBlackoutEffect }
            ]
        },
        {
            id: "settings",
            icon: <RiSettings2Fill size={iconSize} />,
            condition: true,
            options: [
                { label: "Скорость", onClick: () => {} },
                { label: "Цикличность", onClick: toggleLoop, active: isLooped },
                { label: "Соотношение", onClick: () => {} }
            ]
        }
    ];

    return(
        <>
            <div className={`${isPictureToPicture ? "hidden" : "flex"} items-center flex-shrink-0 gap-2`}>
                {menuItems.map(({ id, icon, condition, options }) => 
                    condition && (
                        <DropdownMenu key={id}>
                            <Button onClick={() => toggleDropdown(id as typeof dropdown)} variant="ghost">{icon}</Button>
                            <DropdownMenuContent show={dropdown === id}>
                                {options?.map((option, index) => (
                                    <Button
                                        key={`${id}-${index}`}
                                        onClick={option.onClick}
                                        label={option.label}
                                        className={`duration-300 px-2 py-1 hover:bg-orange-500 ${option.active ? "bg-orange-500" : ""}`}
                                    />
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                )}
                <Button variant="ghost"><RiFlagFill size={iconSize} /></Button>
                <Button onClick={handelTogglePictureToPicture} variant="ghost"><RiShadowFill size={iconSize} /></Button>
                <Button className="group" onClick={handleToggleFullscreen} variant="ghost">
                    {isFullscreen ? <RiFullscreenExitFill className="duration-300 group-hover:scale-90" size={iconSize} /> : <RiFullscreenFill className="duration-300 group-hover:scale-110" size={iconSize} />}
                </Button>
            </div>
        </>
    )
}

export default PreferenseControls;