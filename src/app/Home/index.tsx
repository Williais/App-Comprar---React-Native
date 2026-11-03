import { View, Image } from 'react-native';
import { style } from './Style';
import {Button} from '@/components/Button';
import {Input} from '@/components/Input';
import {Filter} from '@/components/Filter';
import { FilterStatus } from "@/types/FilterStatus";

export default function Home() {
  return (
    <View style={style.container}>
      <Image source={require("@/assets/logo.png")} style={style.logo}/>

      <View style={style.form}>
        <Input placeholder='Digite o Item'/>
        <Button title="Adicionar"/>
      </View>

      <View style={style.content}>
        <Filter status={FilterStatus.PENDING} isActive/>
        <Filter status={FilterStatus.DONE} isActive={false}/>
      </View>
    </View>
  );
}
