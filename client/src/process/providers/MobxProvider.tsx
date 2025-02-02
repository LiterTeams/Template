"use client";
import { MobxStoreContext } from "@app/shared/lib/hooks/system/general/useMobxStore";
import Store from "@app/shared/lib/store/RootStore";
export default function MobxProvider({children}:{children:React.ReactNode}){
    return <MobxStoreContext.Provider value={new Store()}>{children}</MobxStoreContext.Provider>
}