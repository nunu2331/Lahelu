import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import { View } from "react-native";

export default function CustomDrawerContent(props: any) {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItem 
                    label={'Home'} 
                    // onPress={() => router.navigate("/(tabs)", { paramKey: "homeValue" })} 
                    onPress={() => router.navigate({
                        pathname: '/(tabs)',
                        params: {valueTab: 0}
                    })} 
                />
                <DrawerItem 
                    label={'Fresh'} 
                    onPress={() => router.navigate("/(drawer)/topik", { paramKey: "freshValue" })} 
                />
                <DrawerItem 
                    label={'Trending'} 
                    onPress={() => router.navigate("/(drawer)/topik", { paramKey: "trendingValue" })} 
                />
                <DrawerItem 
                    label={'Topik'} 
                    onPress={() => router.navigate("/(drawer)/topik", { paramKey: "topikValue" })} 
                />
            </DrawerContentScrollView>
        </View>
    );
}
