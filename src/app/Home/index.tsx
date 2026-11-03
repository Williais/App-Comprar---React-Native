import { View, Image, TouchableOpacity, Text } from 'react-native';
import { style } from './Style';
import {Button} from '@/components/Button';
import {Input} from '@/components/Input';
import {Filter} from '@/components/Filter';
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from '@/components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

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
        <Item 
        data={{status: FilterStatus.DONE, descricao: "Coca-Cola"}}
        onRemove={() => console.log("Removido")}
        onStatus={() => console.log("Status")}
        />
      </View>
    </View>
  );
}
