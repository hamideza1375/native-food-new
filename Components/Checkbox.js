import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';


const Checkbox = (prop) => {

  const [show, setShow] = useState()

  useEffect(() => {
    setShow(prop.s ? prop.show : false)
  }, [prop.s && prop.show])
  

  return (
    <Icon
      {...prop}
      checked={!show}
      onPressIn={() => { show === true ? setShow(false) : setShow(true); }}
      name={"check"} size={18} color="#fff" style={[
        { width: 18, borderWidth: .4 },
        { backgroundColor: show === false ? '#fff' : "#2c1" }, prop.style ]} />
  )
}

export default Checkbox
