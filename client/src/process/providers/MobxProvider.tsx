"use client";
import { MobxStoreContext } from "@shared/hooks/system/useMobxStore";
import Store from "@shared/store/store";
export default function MobxProvider({children}:{children:React.ReactNode}){
    return <MobxStoreContext.Provider value={new Store()}>{children}</MobxStoreContext.Provider>
}