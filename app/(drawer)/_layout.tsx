import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Button } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import CustomDrawerContent from '@/components/CustomDrawerContent';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
            drawerContent={CustomDrawerContent}
            screenOptions={{
                // headerRight: () => <TabBarIcon name={'search'} color={'#0a7ea4'} />,
                headerShown: false
            }}>
                <Drawer.Screen
                    name="(tabs)" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                    }}
                />
                {/* <Drawer.Screen
                    name="fresh" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Fresh',
                        title: 'Fresh',
                    }}
                />
                <Drawer.Screen
                    name="trending" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Trending',
                        title: 'Trending',
                    }}
                /> */}
                {/* <Drawer.Screen
                    name="topik" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Topik',
                        title: 'Topic',
                    }}
                /> */}
            </Drawer>
        </GestureHandlerRootView>
    );
}
