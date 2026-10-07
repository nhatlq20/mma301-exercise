import { SafeAreaView, StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import ProductScreen from './screens/ProductScreen';

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <ProductScreen />
        </SafeAreaView>
    );
}

registerRootComponent(App);
