import React from 'react';

import { Button } from 'react-native-elements';

const AddTagButton = () => {
    return (
        <Button
            icon={{ name: 'plus-circle', type: 'font-awesome', color: '#FFFFFF' }}
            title="Adicionar"
            activeOpacity={1}
            underlayColor="transparent"
            onPress={() => {}}
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            disabled={false}
            buttonStyle={{
                height: 50,
                width: 300,
                backgroundColor: '#7FCFCF',
                // borderRadius: 50,
            }}
            containerStyle={{ marginVertical: 10 }}
            titleStyle={{ fontWeight: 'bold', color: 'white' }}
            />
    )
}

export default AddTagButton;