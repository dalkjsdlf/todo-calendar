import { TouchableOpacity, View, TextInput } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { ITEM_WIDTH } from  '../utils/Utils'

export default ({
    value,
    onChangeText,
    placeholder,
    onPressAdd,
    onFucus,
    onSubmitEditing
}) => {

    return(
    <View style={{
        width:ITEM_WIDTH,
        alignItems:"center",
        alignSelf:"center",
        flexDirection:"row"}}>
        <TextInput 
            value={value}
            style={{
                flex:1,
                color:"#595959",
                borderBottomWidth:0.5,
                borderColor:"#a6a6a6",
                padding:5,
                paddingVertical:10
                }}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onSubmitEditing={()=>onSubmitEditing(value)}
            returnKeyType="done"
            blurOnSubmit={false}
            onFucus={onFucus}
        />
        
        <TouchableOpacity
            onPress={()=>onPressAdd(value)}
        >
            <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
    </View>
        
    )
}