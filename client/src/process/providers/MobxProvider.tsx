"use client";
import { ReactNode } from "react";
import { MobxStoreContext } from "@shared/lib/hooks/system/general";
import Store from "@shared/lib/store/RootStore";

export const MobxProvider = ({children}:{readonly children:ReactNode}) => {
    return <MobxStoreContext.Provider value={new Store()}>{children}</MobxStoreContext.Provider>
}