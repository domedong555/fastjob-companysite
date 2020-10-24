import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
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
                        บริษัท {item.text}
                    </Text>
                    <Text>
                        งาน {item.job}
                    </Text>
                    <Text>
                        รายละเอียด {item.description}
                    </Text>
                    <Text>
                        รายได้ {item.Profit}
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
                        บริษัท {item.text}
                    </Text>
                    <Text>
                        งาน {item.job}
                    </Text>
                    <Text>
                        รายละเอียด {item.description}
                    </Text>
                    <Text>
                        รายได้ {item.Profit}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View> 
            {/* <DrawerScreen/> */}
                <View >
                    <TextInput
                        placeholder='Add new entity'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityText(text)}
                        value={entityText}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder='Job'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityJob(text)}
                        value={entityJob}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder='Description'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityDes(text)}
                        value={entityDes}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder='Profit'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityProfit(text)}
                        value={entityProfit}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.buttonText}>Select Image</Text>
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
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
    )
}
