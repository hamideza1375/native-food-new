import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

function Card(prop) {

  const { style, header, body, footer, bgcolor, color, alert, border, img,imgStyle } = prop

  return !img ? ((
    !alert ?
      <Pressable
        {...prop}
        style={[{
          borderWidth: 1, borderRadius: 5,
          borderColor:
            !border && (
              !bgcolor && '#fdb' ||
              bgcolor == 'black' && '#999' ||
              bgcolor == 'silver' && 'silver' ||
              bgcolor == 'blue' && 'blue' ||
              bgcolor == 'red' && 'red' ||
              bgcolor == 'green' && 'green' ||
              bgcolor == 'yellow' && 'yellow' ||
              bgcolor == 'white' && '#ccc' ||
              bgcolor) ||
            border
          ,
          backgroundColor:
            !bgcolor && '#fdb' ||
            bgcolor == 'black' && '#444' ||
            bgcolor == 'silver' && '#cfcfcf' ||
            bgcolor == 'blue' && '#003' ||
            bgcolor == 'red' && '#400' ||
            bgcolor == 'green' && '#031' ||
            bgcolor == 'yellow' && '#550' ||
            bgcolor == 'white' && '#fff' ||
            bgcolor
          ,
          width: '100%',
          alignSelf: 'center'
        }, style]}>
        <View style={{ padding: 12, alignItems: 'flex-start', }} >
          {header &&
            <View style={{ width: '100%', paddingHorizontal: 2, paddingVertical: 6 }}>
              <Text
                style={{
                  color:
                    !color ?

                      bgcolor ?
                        (bgcolor == 'white') && 'black' ||
                        (bgcolor == 'silver') && 'black' ||
                        (color) && color ||
                        'white'
                        :
                        "#333"

                      :
                      color,

                  fontWeight: '700',
                  fontSize: 15,
                  width: '100%',
                  textAlign: 'left'
                }}>
                {header}
              </Text>
            </View>
          }
          {body &&
            <View style={{ padding: 8 }}>
              <Text style={{
                color:
                  !color ?

                    bgcolor ?
                      (bgcolor == 'white') && 'black' ||
                      (bgcolor == 'silver') && 'black' ||
                      (color) && color ||
                      'white'
                      :
                      "#333"
                    :
                    color,
                textAlign: "left",
              }} >
                {body}
              </Text>
            </View>
          }
          {footer &&
            <View style={{ padding: 8, alignSelf: 'flex-end' }}>{footer}</View>
          }
        </View>
      </Pressable>
      :
      (
        <Pressable
          {...prop}
          style={[{
            borderWidth: 1, borderRadius: 5,
            borderColor:
              !border && (
                !bgcolor && '#fdb' ||
                bgcolor == 'blue' && '#bfd' ||
                bgcolor == 'red' && '#fdb' ||
                bgcolor == 'green' && '#dfd' ||
                bgcolor == 'yellow' && '#ffb' ||
                bgcolor == 'silver' && '#ccc' ||
                bgcolor == 'black' && 'silver' ||
                bgcolor) ||
              border
            ,
            backgroundColor:
              !bgcolor && '#fdb' ||
              bgcolor == 'blue' && '#bfd' ||
              bgcolor == 'red' && '#fdb' ||
              bgcolor == 'green' && '#dfd' ||
              bgcolor == 'yellow' && '#ffb' ||
              bgcolor == 'silver' && '#ccc' ||
              bgcolor == 'black' && 'silver' ||
              bgcolor
            ,
            width: '100%',
            alignSelf: 'center'
          }, style]}>
          <View style={{ padding: 12, alignItems: 'flex-start', }} >
            {header &&
              <View style={{ width: '100%', paddingHorizontal: 2, paddingVertical: 6 }}>
                <Text
                  style={{
                    color:
                      !color ? 'black' : color,
                    fontWeight: '700',
                    fontSize: 15,
                    width: '100%',
                    textAlign: 'left'

                  }}>
                  {header}
                </Text>
              </View>
            }
            {body &&
              <View style={{ padding: 8 }}>
                <Text style={{
                  color:
                    !color ? 'black' : color,
                  textAlign: "left",
                }} >
                  {body}
                </Text>
              </View>
            }
            {footer &&
              <View style={{ padding: 8, alignSelf: 'flex-end' }}>{footer}</View>
            }
          </View>
        </Pressable>
      )
  )


  )

    :
    (









      (
        !alert ?
          <Pressable
            {...prop}
            style={[{
              borderWidth: 1, borderRadius: 5, minHeight:100,
              borderColor:
                !border && (
                  !bgcolor && '#fdb' ||
                  bgcolor == 'black' && '#999' ||
                  bgcolor == 'silver' && 'silver' ||
                  bgcolor == 'blue' && 'blue' ||
                  bgcolor == 'red' && 'red' ||
                  bgcolor == 'green' && 'green' ||
                  bgcolor == 'yellow' && 'yellow' ||
                  bgcolor == 'white' && '#ccc' ||
                  bgcolor) ||
                border
              ,
              backgroundColor:
                !bgcolor && '#fdb' ||
                bgcolor == 'black' && '#444' ||
                bgcolor == 'silver' && '#cfcfcf' ||
                bgcolor == 'blue' && '#003' ||
                bgcolor == 'red' && '#400' ||
                bgcolor == 'green' && '#031' ||
                bgcolor == 'yellow' && '#550' ||
                bgcolor == 'white' && '#fff' ||
                bgcolor
              ,
              width: '100%', position: 'relative',
              alignSelf: 'center'
            }, style]}>
            <View style={{ padding: 12, alignItems: 'flex-start', }} >
              {header &&
                <View style={{
                  width: '100%', paddingHorizontal: 2,
                  paddingVertical: 6
                }}>
                  <Text
                    style={{
                      color:
                        !color ?

                          bgcolor ?
                            (bgcolor == 'white') && 'black' ||
                            (bgcolor == 'silver') && 'black' ||
                            (color) && color ||
                            'white'
                            :
                            "#333"
                          :
                          color,
                      fontWeight: '700',
                      fontSize: 15,
                      width: '100%',
                      textAlign: 'left'
                    }}>
                    {header}
                  </Text>
                </View>
              }


              <Image source={img} style={[{
                position: 'absolute',
                top: 8,
                right: 11,
                width: "20%",
                height: 70,
                borderRadius: 50
              },imgStyle]} />


              {body &&
                <View style={{
                  padding: 8, width: '100%',
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    color:
                      !color ?

                        bgcolor ?
                          (bgcolor == 'white') && 'black' ||
                          (bgcolor == 'silver') && 'black' ||
                          (color) && color ||
                          'white'
                          :
                          "#333"
                        :
                        color,
                    textAlign: "left",
                    flexBasis: '80%'
                  }} >
                    {body}
                  </Text>
                  {/* <Image source={img} style={{ position:'absolute',
                    flexBasis: '20%',
                     top:-30,
                     right: 11,
                     flexBasis: '20%', width: "20%", height: 100, 
                     borderRadius: 50 }} /> */}

                </View>
              }
              {footer &&
                <View style={{ padding: 8, alignSelf: 'flex-end' }}>{footer}</View>
              }
            </View>
          </Pressable>







          :

          (
            <Pressable
              {...prop}
              style={[{
                borderWidth: 1, borderRadius: 5,
                borderColor:
                  !border && (
                    !bgcolor && '#fdb' ||
                    bgcolor == 'blue' && '#bfd' ||
                    bgcolor == 'red' && '#fdb' ||
                    bgcolor == 'green' && '#dfd' ||
                    bgcolor == 'yellow' && '#ffb' ||
                    bgcolor == 'black' && '#ccc' ||
                    bgcolor == 'silver' && 'silver' ||
                    bgcolor) ||
                  border
                ,
                backgroundColor:
                  !bgcolor && '#fdb' ||
                  bgcolor == 'blue' && '#bfd' ||
                  bgcolor == 'red' && '#fdb' ||
                  bgcolor == 'green' && '#dfd' ||
                  bgcolor == 'yellow' && '#ffb' ||
                  bgcolor == 'silver' && '#ccc' ||
                  bgcolor == 'black' && 'silver' ||
                  bgcolor
                ,
                width: '100%', position: 'relative',
                alignSelf: 'center'
              }, style]}>

              <View style={{ padding: 12, alignItems: 'flex-start', }} >
                {header &&
                  <View style={{ width: '100%', paddingHorizontal: 2, paddingVertical: 6 }}>
                    <Text
                      style={{
                        color:
                          !color ? 'black' : color,
                        fontWeight: '700',
                        fontSize: 15,
                        width: '100%',
                        textAlign: 'left'

                      }}>
                      {header}
                    </Text>
                  </View>
                }


                <Image source={img} style={{
                  top: 8,
                  position: 'absolute',
                  right: 11,
                  width: "20%",
                  height: 70,
                  borderRadius: 50
                }} />


                {body &&
                  <View style={{ padding: 8, width: '100%', flexDirection: 'row' }}>
                    <Text style={{
                      color:
                        !color ? 'black' : color,
                      textAlign: "left",
                      flexBasis: '80%'
                    }} >
                      {body}
                    </Text>
                    {/* <Image source={img} style={{ 
                      position:'absolute',
                      top: -30,
                      right: 11,
                       flexBasis: '20%',
                        width: "20%", height: 100, borderRadius: 50 }} /> */}
                  </View>
                }
                {footer &&
                  <View style={{ padding: 8, alignSelf: 'flex-end' }}>{footer}</View>
                }
              </View>
            </Pressable>
          )
      )
    )
}



export default Card;