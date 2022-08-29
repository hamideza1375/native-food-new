import React, { useState ,useEffect} from "react";
import { Animated, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default Dropdown = React.forwardRef((props, ref) => {

 const { show, children, icon, color = '#aaa', showBgcolor= '#fff', style, icon2False, top, onPress }
 = props  

 const [first, setfirst] = useState(false)


 useEffect(() => {
  if(!show)
  setfirst(false)
 }, [show])
 



  return (
    <>
      <Pressable onPressIn={onPress} onPress={()=>{setfirst(true);setTimeout(() => { setfirst(true)}, 100);}}
        style={[{ flexDirection: 'row' , padding:15}, style]} >
       { !icon2False && <Icon color={color} name='caret-down' style={[{ top: 3, right: 2 }, { fontSize: 22.5 }]}></Icon>}
        <Icon color={color} name={icon?icon:'trash'} style={[ { fontSize: 22.5 }]}></Icon>
      </Pressable>

      <Pressable
       ref={ref}
       style={[{
        alignSelf: 'center', borderWidth: .5, borderRadius: 3, padding: 3, zIndex: 10, top:top?-60:40 , position: 'absolute',
        transform: [{ scale: first?1:0 }], backgroundColor:showBgcolor, minWidth: 100}]}>
        {children}
      </Pressable>
    </>
  );
})


