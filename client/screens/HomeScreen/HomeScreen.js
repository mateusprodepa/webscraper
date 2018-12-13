import React from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import bgImage from '../../assets/images/dark-bg.jpg';
import AddTagInput from '../../components/tags/AddTagInput';
import TagsContainer from '../../components/tags/Tags';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <AddTagInput />
            <TagsContainer tags={[
                {title: 'Teste', id: 1, bgImage: bgImage},
                {title: 'Mais um teste', id: 2, bgImage: bgImage},
                {title: 'Mais um teste', id: 3, bgImage: bgImage}
            ]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center", 
        backgroundColor: '#1C3649'
    }
})

export default HomeScreen;