import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { style } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";

type Props = TouchableOpacityProps & {
    isActive: boolean
    status: FilterStatus
}

export function Filter({isActive, status, ...rest}: Props){
    return(
        <TouchableOpacity 
        activeOpacity={0.8}
        {...rest} 
        style={[style.container, {opacity: isActive ? 1 : 0.5}]}
        >
            <Text style={style.title}>
                {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
            </Text>
        </TouchableOpacity>
    )
}