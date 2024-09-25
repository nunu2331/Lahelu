import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
// import CustomBottomSheet from '@/components/CustomBottomSheet';


export default function Modal() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* <Pressable style={{flex: 1}} onPress={()=> navigation.goBack()}/>
            <View style={styles.bottomSheet}>
                <View>
                    <Text style={styles.header}>Pilihan</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={()=> navigation.goBack()}>
                        <Ionicons name='close' size={24}/>
                    </TouchableOpacity>
                </View>
            </View> */}
            {/* <CustomBottomSheet/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'white'
        height: "40%"
    },
    bottomSheet: {
        // flex: 1,
        backgroundColor: '#151718',
        height: '50%',
        width: '100%',
        // position: 'absolute',
        // bottom: 0
    },
    header: {
        color: 'white'
    },
    closeIcon: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        borderRadius: 99999
    },
});
