import React from 'react';

import {
    Text,
    View
} from 'react-native';

import AddTagInput from '../../components/tags/AddTagInput';

const HomeScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center",  backgroundColor: '#1C3649' }}>
            <AddTagInput />
            {/* <Tags /> */}
        </View>
    )
}

export default HomeScreen;