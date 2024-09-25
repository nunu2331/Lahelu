import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";
import { View } from "react-native";

export default function CustomDrawerContent(props: any) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
            {/* <DrawerItemList {...props} /> */}
                <DrawerItem label={'Home'} onPress={() => router.navigate("/(tabs)")} />
                <DrawerItem label={'Topik'} onPress={() => router.navigate("/(drawer)/topik")} />
                {/* <DrawerItem label={'Fresh'} onPress={() => router.navigate("/(drawer)/topic")} /> */}
            </DrawerContentScrollView>
        </View>
    );
}