"use client";
import { FC, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useSignUpMutation } from "../hooks";
import { useEmail, useText } from "@shared/lib/hooks/system/forms";
import { usePassword } from "@shared/lib/hooks/system/forms";

import { OauthFormWrapper } from "./OauthFormWrapper";

import { SignUpProps } from "@shared/types/system/oauth.interfaces";
import { InputGroup } from "@shared/ui/groups";

import { ButtonTogglePasswordVisible as Button } from "@shared/ui/buttons";

export const SignUpForm: FC = () => {

    const localization = useTranslations("Words");

    const { signUp, isLoadingSignUp } = useSignUpMutation();
    const Nickname = useText("",{required: true, lengthBetween: [6,36]});
    const Email = useEmail("");
    const Password = usePassword("");
    const RepeatPassword = usePassword("",{compareWith: Password.value});

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (isLoadingSignUp) return;
        if (!Nickname.value || !Email.value || !Password || !RepeatPassword) return;
        const data: SignUpProps = {
            nickname: Nickname.value,
            email: Email.value,
            password: Password.value,
        }
        signUp(data);
    }

    return(
        <OauthFormWrapper isSignUp handleSubmit={onSubmit}>
            <InputGroup
                label={localization("Nickname")}
                disabled={isLoadingSignUp}
                placeholder="Liter Teams"
                value={Nickname.value}
                isValid={Nickname.isValid}
                error={Nickname.error}
                autoComplete="off"
                onChange={Nickname.handleChange}
            />
            <InputGroup
                label={localization("Email")}
                disabled={isLoadingSignUp}
                placeholder="test@gmail.com"
                value={Email.value}
                isValid={Email.isValid}
                error={Email.error}
                autoComplete="off"
                onChange={Email.handleChange}
            />
            <InputGroup
                className="relative"
                label={localization("Password")}
                disabled={isLoadingSignUp}
                placeholder="********"
                type={Password.isVisible ? "text" : "password"}
                value={Password.value}
                isValid={Password.isValid}
                error={Password.error}
                autoComplete="off"
                onChange={Password.handleChange}
            >
                <Button isVisible={Password.isVisible} toggleVisible={Password.toggleVisible} />
            </InputGroup>
            <InputGroup
                className="relative"
                label={localization("Password-Repeat")}
                disabled={isLoadingSignUp}
                placeholder="********"
                type={RepeatPassword.isVisible ? "text" : "password"}
                value={RepeatPassword.value}
                isValid={RepeatPassword.isValid}
                error={RepeatPassword.error}
                autoComplete="off"
                onChange={RepeatPassword.handleChange}
            >
                <Button isVisible={RepeatPassword.isVisible} toggleVisible={RepeatPassword.toggleVisible} />
            </InputGroup>
        </OauthFormWrapper>
    )
}