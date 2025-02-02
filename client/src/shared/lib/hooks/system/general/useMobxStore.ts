"use client";
import { createContext, useContext } from "react";
import RootStore from "@shared/lib/store/RootStore";

export const MobxStoreContext = createContext<RootStore | null>(null);

export const useMobxStore = () => {
    const context = useContext(MobxStoreContext);
    if (context === null) throw new Error("Error!");
    return context;
}