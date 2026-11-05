import { View, Image, TouchableOpacity, Text, FlatList, ScrollView } from 'react-native';
import { style } from './Style';
import {Button} from '@/components/Button';
import {Input} from '@/components/Input';
import {Filter} from '@/components/Filter';
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from '@/components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITENS = [
  { id: "1", status: FilterStatus.DONE, descricao: "1 pacote de café" },
  { id: "2", status: FilterStatus.PENDING, descricao: "2 litros de leite" },
  { id: "3", status: FilterStatus.PENDING, descricao: "1 kg de arroz" },
  { id: "4", status: FilterStatus.DONE, descricao: "1 kg de feijão preto" },
  { id: "5", status: FilterStatus.PENDING, descricao: "1 dúzia de ovos" },
  { id: "6", status: FilterStatus.DONE, descricao: "1 garrafa de azeite de oliva" },
  { id: "7", status: FilterStatus.PENDING, descricao: "500g de queijo mussarela" },
  { id: "8", status: FilterStatus.PENDING, descricao: "1 pacote de pão de forma" },
  { id: "9", status: FilterStatus.DONE, descricao: "3 maçãs vermelhas" },
  { id: "10", status: FilterStatus.PENDING, descricao: "1 pasta de dente" }
]

export default function Home() {
  return (
    <View style={style.container}>
      <Image source={require("@/assets/logo.png")} style={style.logo}/>

      <View style={style.form}>
        <Input placeholder='Digite o Item'/>
        <Button title="Adicionar"/>
      </View>

      <View style={style.content}>
        <View style={style.header}>

        {
          FILTER_STATUS.map((status) => (
            
            <Filter key={status} status={status} isActive/>
          ))
        }

          <TouchableOpacity style={style.btnLimpar}>
            <Text style={style.textLimpar}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITENS}
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
