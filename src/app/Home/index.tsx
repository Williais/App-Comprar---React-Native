import { View, Image, TouchableOpacity, Text, FlatList, ScrollView, Alert } from 'react-native'
import { style } from './Style'
import {Button} from '@/components/Button'
import {Input} from '@/components/Input'
import {Filter} from '@/components/Filter'
import { FilterStatus } from "@/types/FilterStatus"
import { Item } from '@/components/Item'
import { useState } from 'react'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [descricao, setDescricao] = useState("")
  const [items, setItems] = useState<any>([])

  function handleAdd(){
    if(!descricao.trim()){
      return Alert.alert("ADICIONAR", "Adicione a descrição do item")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      descricao,
      status: FilterStatus.PENDING
    }

    setItems((prev: any) => [...prev, newItem])

    setDescricao("")
  }

  return (
    <View style={style.container}>
      <Image source={require("@/assets/logo.png")} style={style.logo}/>

      <View style={style.form}>
        <Input placeholder='Digite o Item' onChangeText={setDescricao}/>
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
            <Text style={style.textLimpar} onPress={() => setItems([])}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({item}) =>
            <Item 
              data={item}
              onRemove={() => console.log("Removido")}
              onStatus={() => console.log("Status")}
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
