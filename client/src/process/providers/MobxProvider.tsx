"use client";
import { MobxStoreContext } from "@shared/lib/hooks/system/useMobxStore";
import Store from "@shared/lib/store/store";
export default function MobxProvider({children}:{children:React.ReactNode}){
    return <MobxStoreContext.Provider value={new Store()}>{children}</MobxStoreContext.Provider>
}