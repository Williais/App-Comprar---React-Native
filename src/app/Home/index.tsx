import { View, Image } from 'react-native';
import { style } from './Style';
import {Button} from '@/components/Button';
import {Input} from '@/components/Input';

export default function Home() {
  return (
    <View style={style.container}>
      <Image source={require("@/assets/logo.png")} style={style.logo}/>

      <View style={style.form}>
        <Input placeholder='Digite o Item'/>
        <Button title="Adicionar"/>
      </View>

      <View style={style.content}>
      
      </View>
    </View>
  );
}
