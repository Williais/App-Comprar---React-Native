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

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get()
    return items.filter((item) => item.status === status)
}

async function save(items: ItemStorage[]): Promise<void> {
    try{
        await AsyncStorage.setItem( ITEMS_STORAGE_KEY, JSON.stringify(items))
    }catch(e){
        throw new Error("Erro ao salvar Obter os Dados")
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
    const item = await get()
    const updateItem = [...item, newItem]

    save(updateItem)
    return updateItem
}

async function remover(id: string): Promise<void> {
    const items = await itemsStorage.get()
    const updateItem = items.filter((item) => item.id !== id)
    save(updateItem)

}

async function clear(): Promise<void> {
    try{
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
    }catch(e){
        throw new Error("Erro: " + e)
    }
}

async function toggleUpdate(id: string): Promise<void> {
    const items = await get()
    const updateItem = items.map((item) => item.id === id 
        ? {
            ...item,
            status: item.status === FilterStatus.PENDING 
                ? FilterStatus.DONE
                : FilterStatus.PENDING
        } 
        : item
    )


    await save(updateItem)
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remover,
    clear,
    toggleUpdate
}