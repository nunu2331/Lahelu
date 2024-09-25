import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface BottomSheetProps {
    setModalVisible: (visible: boolean) => void;
    lightColor?: string;
    darkColor?: string;

}

export default function BottomSheet({
    setModalVisible,
    lightColor,
    darkColor,
}: BottomSheetProps) {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const themeColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    const features = [
        {
            id: 1,
            title: "Buat meme",
            description: "Membantu pengguna mencari informasi dengan cepat dan akurat menggunakan pencarian berbasis kata kunci.",
            icon: require('../assets/icons/gallery-outline.png'),
        },
        {
            id: 2,
            title: "Buat topik",
            description: "Mengirimkan pemberitahuan secara real-time untuk menginformasikan pengguna tentang pembaruan terbaru.",
            icon: require('../assets/icons/community-outline.png'),
        },
        {
            id: 3,
            title: "Meme generator",
            description: "Mengubah tampilan aplikasi menjadi mode gelap untuk pengalaman visual yang lebih nyaman di kondisi cahaya rendah.",
            icon: require('../assets/icons/wand-outline.png'),
        },
    ];


    return (
        <ThemedView style={styles.backdrop}>
            <Pressable style={styles.pressableArea} onPress={() => setModalVisible(false)} />

            <ThemedView style={[styles.bottomSheet]}>
                <ThemedView style={styles.header}>
                    <ThemedText style={styles.modalText} onPress={() => console.log(colorScheme)}>Pilihan</ThemedText>
                    <Pressable
                        style={({ pressed }) => [
                            { backgroundColor: pressed ? colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)' : 'transparent' },
                            styles.closeButton
                        ]} onPress={() => setModalVisible(false)}>
                        <Ionicons name='close' size={24} color={themeColor} />
                    </Pressable>
                </ThemedView>
                <ThemedView style={styles.body}>
                    <FlatList
                        data={features}
                        renderItem={({ item }) =>
                            <Pressable
                                style={({ pressed }) => [
                                    { backgroundColor: pressed ? colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)' : 'transparent' },
                                    styles.featureCard
                                ]}>
                                <Image
                                    source={item.icon}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        // tintColor: isFocused ? 'red' : 'gray' 
                                        tintColor: themeColor,
                                    }}
                                    resizeMode='contain'
                                />
                                <ThemedText style={styles.featureTitle}>{item.title}</ThemedText>
                            </Pressable>
                        }
                    />
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
    },
    pressableArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    bottomSheet: {
        width: '100%',
        height: '26%',
        borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
    },
    modalText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    closeButton: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
    },
    body: {
        flex: 1,
        marginTop: 8,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 18,
    },
    featureTitle: {
        marginLeft: 8,
        fontSize: 16,
    }
});
