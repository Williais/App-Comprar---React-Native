import { View, Image, TouchableOpacity, Text, FlatList, ScrollView, Alert } from 'react-native'
import { style } from './Style'
import {Button} from '@/components/Button'
import {Input} from '@/components/Input'
import {Filter} from '@/components/Filter'
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from '@/components/Item'
import { useEffect, useState } from 'react'
import {ItemStorage, itemsStorage} from '@/storage/ItemsStorage'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default  function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [descricao, setDescricao] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if(!descricao.trim()){
      return Alert.alert("ADICIONAR", "Adicione a descrição do item")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      descricao,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await itemByStatus()

    setDescricao("")
    setFilter(FilterStatus.PENDING)
  }

  async function handleRemove(id: string) {
    try{
      await itemsStorage.remover(id)
      await itemByStatus()

    }catch(e){
      Alert.alert("Error", "Erro ao remover o item")
    }
  }

  async function itemByStatus() {
    try{
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    }catch(e){
      Alert.alert("Error", "Erro ao pegar os dados")
    }
  }

  function handleClear(){
    Alert.alert("Clear", "Dejesa Remover todos?", [
      {text: "Não", style: "cancel"},
      {text: "Sim", onPress: () => onClear()}

    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      Alert.alert("Error", "Erro ao limpar os dados")
    }
  }

  async function handleToggleItemStatus(id: string) {
    try{
      await itemsStorage.toggleUpdate(id)
      await itemByStatus()
    }catch(e){
      console.log(e)
      Alert.alert("Error", "Erro ao trocar o Status")
    }
  }

  useEffect(() => {
    itemByStatus()
  }, [filter])

  return (
    <View style={style.container}>
      <Image source={require("@/assets/logo.png")} style={style.logo}/>

      <View style={style.form}>
        <Input placeholder='Digite o Item' onChangeText={setDescricao} value={descricao}/>
        <Button title="Adicionar" onPress={handleAdd}/>
      </View>

      <View style={style.content}>
        <View style={style.header}>

        {
          FILTER_STATUS.map((status) => (
            
            <Filter 
            key={status} 
            status={status} 
            isActive={status === filter}
            onPress={() => setFilter(status)}
            />
          ))
        }

          <TouchableOpacity style={style.btnLimpar}>
            <Text style={style.textLimpar} onPress={() => handleClear}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <Item 
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
            />
          }
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<View style={style.separador}/>}
          contentContainerStyle={style.listContent}
          ListEmptyComponent={() => <Text style={style.empty}>Nenhum item Aqui!</Text>}
        />

      </View>
    </View>
  );
}
