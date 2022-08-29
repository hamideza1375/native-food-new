import React, { useState ,useEffect} from "react";
import { Animated, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';



  export default Dropdown = React.forwardRef((props, ref) => {

    const { onPress,children, icon, color = '#aaa', showBgcolor= '#fff', style, icon2False, top } = props

  const [first, setfirst] = useState(true)



  return (
    <View >
      <Pressable onPressIn={onPress} onPress={() => { setfirst(false) }} 
        style={[{ flexDirection: 'row' , padding:15}, style]} >
       { !icon2False && <Icon color={color} name='caret-down' style={[{ top: 3, right: 2 }, { fontSize: 22.5 }]}></Icon>}
        <Icon color={color} name={icon?icon:'trash'} style={[ { fontSize: 22.5 }]}></Icon>
      </Pressable>

  { !first &&
   <View
   ref={ref}
       style={[{
        alignSelf: 'center', borderWidth: .5, borderRadius: 3, padding: 10, zIndex: 10, top:top?-60:40 , position: 'absolute',
        transform: [{ scale: first ? 0 : 1 }],display: first ? 'none' : 'flex', backgroundColor:showBgcolor, minWidth: 100}]}>
        {children}
      </View>
      }
    </View>
  );
})
