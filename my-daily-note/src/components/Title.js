import React from 'react';
import { Text } from 'react-native';

function Title({ text, color }) {
    console.log('Title render'); // Theo dõi render trong Terminal
    return <Text style={{ color, fontSize: 22, marginBottom: 16 }}>{text}</Text>;
}

export default React.memo(Title);
