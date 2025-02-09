"use client";
import { FC, FormEvent } from "react";
import { useSignInMutation } from "../hooks";
import { useEmail } from "@shared/lib/hooks/system/forms";
import { usePassword } from "@shared/lib/hooks/system/forms";

import { OauthFormWrapper } from "./OauthFormWrapper";

import { SignInProps } from "@shared/types/system/oauth.interfaces";
import { InputGroup } from "@shared/ui/groups";

import { ButtonTogglePasswordVisible as Button } from "@shared/ui/buttons";

export const SignInForm: FC = () => {
    const { signIn, isLoadingSignIn } = useSignInMutation();
    const Email = useEmail("");
    const Password = usePassword("",{lengthBetween: undefined});

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (isLoadingSignIn) return;
        if (!Email.value || !Password.value) return;
        const data: SignInProps = {
            email: Email.value,
            password: Password.value,
        }
        signIn(data);
    }

    return(
        <OauthFormWrapper isSignIn handleSubmit={onSubmit}>
            <InputGroup
                label="Электронная почта"
                disabled={isLoadingSignIn}
                placeholder="test@gmail.com"
                value={Email.value}
                isValid={Email.isValid}
                error={Email.error}
                autoComplete="off"
                onChange={Email.handleChange}
            />
            <InputGroup
                className="relative"
                label="Пароль"
                disabled={isLoadingSignIn}
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
        </OauthFormWrapper>
    )
}