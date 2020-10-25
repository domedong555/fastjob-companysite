import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

import * as ImagePicker from 'expo-image-picker';

export default function EditScreen({ navigation, route }) {

    const itemId = route.params.itemId
    const userID = route.params.userID

    const [entities, setEntities] = useState([])
    const [entitiesContact, setEntitiesContact] = useState([])

    const [entityText, setEntityText] = useState('')
    const [entityJob, setEntityJob] = useState('')
    const [entityDes, setEntityDes] = useState('')
    const [entityProfit, setEntityProfit] = useState('')

    const entityRef = firebase.firestore().collection('CompanyEntities')
    const contactRef = firebase.firestore().collection('CompanyContact')

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const onAddButtonPress = () => {
        const updateDBRef = firebase.firestore().collection('CompanyEntities').doc(itemId)
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        updateDBRef.update({
            image: image,
            text: entityText,
            job: entityJob,
            description: entityDes,
            Profit: entityProfit,
            createdAt: timestamp,
        });
        navigation.goBack()
    }

    const onDeleteButtonPress = () => {
        firebase.firestore().collection('CompanyEntities').doc(itemId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        navigation.popToTop()
    }

    return (
        <View>
            <View >
                    <TextInput
                        style={styles.buttoncss}
                        placeholder='ชื่อบริษัท'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityText(text)}
                        value={entityText}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.buttoncss}
                        placeholder='ตำแหน่ง'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityJob(text)}
                        value={entityJob}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.buttoncss}
                        placeholder='รายระเอียด'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityDes(text)}
                        value={entityDes}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.buttoncss}
                        placeholder='ค่าจ้าง'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityProfit(text)}
                        value={entityProfit}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {/* <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.buttonText}>Select Image</Text>
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDeleteButtonPress}>
                        <Text>Delete</Text>
                    </TouchableOpacity> */}
                    <View style={styles.entityButton}>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.buttonimage}onPress={pickImage}>
                                <Text style={styles.buttonText}>
                                    เลือกรูปภาพ
                                </Text>     
                            </TouchableOpacity>
                                <View>
                                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 , marginTop: 10,}} />}
                                </View>
                        </View>
					</View>

                    <View style={{borderBottomColor:'white', borderBottomWidth: 0.8, marginVertical:10, marginTop: 10}}></View>

                                    <View style={styles.entityButton}>
                                        <View style={{alignItems: "center"}}>
                                            <TouchableOpacity style={styles.button}onPress={onAddButtonPress}>
                                                <Text style={styles.buttonText}>
                                                    แก้ไขเสร็จสิ้น
                                                </Text>
                                            </TouchableOpacity>
                                        </View>  

                                        <View style={{alignItems: "center"}}>
                                            <TouchableOpacity style={styles.buttondelete}onPress={onDeleteButtonPress}>
                                                <Text style={styles.buttonText}>
                                                    ลบทิ้ง
                                                </Text>
                                            </TouchableOpacity>
                                        </View> 
                                    </View>                
            </View>
        </View>
        
    )
}