import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';
import { Alert } from 'react-native';


export default function HomeScreen(props) {

    const [entities, setEntities] = useState([])
    const [entitiesContact, setEntitiesContact] = useState([])

    const [entityText, setEntityText] = useState('')
    const [entityJob, setEntityJob] = useState('')
    const [entityDes, setEntityDes] = useState('')
    const [entityProfit, setEntityProfit] = useState('')

    const entityRef = firebase.firestore().collection('CompanyEntities')
    const contactRef = firebase.firestore().collection('CompanyContact')
    const userID = props.extraData.id

    const [image, setImage] = useState(null);

    const navigation = useNavigation();
 
    useEffect(() => {
            (async () => {
                entityRef
                .where("authorID", "==", userID)
                .onSnapshot(
                    querySnapshot => {
                        const newEntities = []
                        querySnapshot.forEach(doc => {
                            const entity = doc.data()
                            entity.id = doc.id
                            newEntities.push(entity)
                        });
                        setEntities(newEntities)
                    },
                    error => {
                        console.log(error)
                    }
                ); 
                
                contactRef
                .where("authorID", "==", userID)
                .onSnapshot(
                    querySnapshot => {
                        const newEntitiesContact = []
                        querySnapshot.forEach(doc => {
                            const entityContact = doc.data()
                            entityContact.id = doc.id
                            newEntitiesContact.push(entityContact)
                        });
                        setEntitiesContact(newEntitiesContact)
                    },
                    error => {
                        console.log(error)
                    }
                ); 

                if (Platform.OS !== 'web') {
                  const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                  if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                  }
                }
              })();
    }, [])

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
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                image: image,
                text: entityText,
                job: entityJob,
                description: entityDes,
                Profit: entityProfit,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    setEntityJob('')
                    setEntityDes('')
                    setEntityProfit('')
                    setImage(null)
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item}) => {
        return (
            <View style={styles.container}>
                <View style={styles.entityButton}>
                    <TouchableOpacity                             
                                onPress={() =>
                                navigation.navigate(
                                    'Job',
                                    { id: item.id }
                                    )
                                }>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 100 }}
                            PlaceholderContent={<ActivityIndicator />}
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                   <Text>
                        บริษัท: {item.text}
                    </Text>
                    <Text>
                        ตำแหน่งงาน: {item.job}
                    </Text>
                    <Text>
                        รายละเอียด: {item.description}
                    </Text>
                    <Text>
                        ค่าจ้าง: {item.Profit}
                    </Text>
                </View>
            </View>
            
        )
    }

    const renderEntityContact = ({item}) => {
        return (
            <View style={styles.container}>
                <View style={styles.entityButton}>
                    <TouchableOpacity                             
                                onPress={() =>
                                navigation.navigate(
                                    'Job',
                                    { id: item.id }
                                    )
                                }>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 100 }}
                            PlaceholderContent={<ActivityIndicator />}
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <Text>
                        บริษัท: {item.text}
                    </Text>
                    <Text>
                        ตำแหน่งงาน: {item.job}
                    </Text>
                    <Text>
                        รายละเอียด: {item.description}
                    </Text>
                    <Text>
                        ค่าจ้าง: {item.Profit}
                    </Text>
                </View>
            </View>
        )
    }

    return (
    <ScrollView>
        <View> 
            {/* <DrawerScreen/> */}
          
                <View style={styles.jobListText}>
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
                                        เพิ่ม
                                    </Text>
                                </TouchableOpacity>
                            </View>
					    </View>
                    </View>
            
                <View>
                    <Text style={styles.jobListText} >
                        งานที่เปิดสมัคร
                    </Text>
                    { entities && (
                        <View>
                            <View>
                                <FlatList
                                    data={entities}
                                    renderItem={renderEntity}
                                    keyExtractor={(item) => item.id}
                                    removeClippedSubviews={true}
                                />
                            </View>
                        </View>
                    )}                    
                </View>
                            
        </View>
        </ScrollView>
    )
}