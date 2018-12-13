import React, { Component } from 'react';
import { Font } from 'expo';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import bgImage from '../../assets/images/dark-bg.jpg';
import AddTagInput from '../../components/tags/AddTagInput';
import TagsContainer from '../../components/tags/Tags';

class HomeScreen extends Component {

    state = {
        fontLoaded: false,
        tags: [
            {title: 'Teste', id: 1, bgImage: bgImage},
            {title: 'Mais um teste', id: 2, bgImage: bgImage},
            {title: 'Mais um teste', id: 3, bgImage: bgImage},
            {title: 'Mais um teste', id: 4, bgImage: bgImage},
            {title: 'Mais um teste', id: 5, bgImage: bgImage},
            {title: 'Mais um teste', id: 6, bgImage: bgImage},
            {title: 'Mais um teste', id: 7, bgImage: bgImage},
            {title: 'Mais um teste', id: 8, bgImage: bgImage},
            {title: 'Mais um teste', id: 9, bgImage: bgImage},
            {title: 'Mais um teste', id: 10, bgImage: bgImage},
        ]
    }

    async componentDidMount() {
        await Font.loadAsync({
            bold: require('../../assets/fonts/Montserrat-Bold.otf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTagInput />
                {this.state.fontLoaded ? <TagsContainer tags={this.state.tags} /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    }
})

export default HomeScreen;