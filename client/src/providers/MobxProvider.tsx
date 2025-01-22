"use client";
import { MobxStoreContext  } from "@app/features/hooks/system/useMobxStore";
import Store from "@features/store/store";
export default function MobxProvider({children}:{children:React.ReactNode}){
    return <MobxStoreContext.Provider value={new Store()}>{children}</MobxStoreContext.Provider>
}