import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items"

export type ItemStorage = {
    id: string,
    status: FilterStatus,
    descricao: string
}

async function get(): Promise<ItemStorage[]> {
    try{
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

        return storage ? JSON.parse(storage) : []
    }catch(e){
        throw new Error("Erro ao Obter os Dados")
    }
}

export const itemsStorage = {
    get,
}