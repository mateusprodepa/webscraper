import React from 'react';

import { View } from 'react-native';
import { Input } from 'react-native-elements';
import AddTagButton from './AddTagButton';
// import Icon from 'react-native-vector-icons/FontAwesome';

const AddTagInput = () => {
    return (
        <View style={{ marginTop: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Input
                shake={true}
                inputStyle={{
                    backgroundColor: '#455D6F',
                    minHeight: 60,
                    minWidth: 300,
                    textAlign: 'center',
                    flex: 1,
                    marginRight: 11,
                    borderRadius: 50
                }}
                inputContainerStyle={{
                    borderBottomWidth: 0,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                placeholder="Adicione uma Tag"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                blurOnSubmit={true}
                placeholderTextColor="#CCCCCC"
            />
            <AddTagButton />
        </View>
    )
}

export default AddTagInput;