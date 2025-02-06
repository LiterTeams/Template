"use client";
import { ReactNode } from "react";
import { MobxStoreContext } from "@app/shared/lib/hooks/system/general/useMobxStore";
import Store from "@app/shared/lib/store/RootStore";

export const MobxProvider = ({children}:{readonly children:ReactNode}) => {
    return <MobxStoreContext.Provider value={new Store()}>{children}</MobxStoreContext.Provider>
}