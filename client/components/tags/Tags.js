import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';

const Tag = ({ title, bgImage }) => {
    return (
        <ImageBackground 
            imageStyle={styles.bgImage}
            style={styles.tagContainer}
            source={bgImage}>
            <View style={styles.overlay}></View>
            <Text style={styles.tag}>{title.split(' ').join('\n')}</Text>
        </ImageBackground>
    )
}

const TagsContainer = ({ tags }) => {
    return (
        <View style={styles.view}>
            <ScrollView
                contentContainerStyle={{minHeight: '100%', width: '100%'}}
                scrollEnabled={true}>
                <View style={styles.scrollContainer}>
                    {tags.map((tag) =>
                        <Tag
                            title={tag.title}
                            bgImage={tag.bgImage}
                            key={tag.id} 
                        />)}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        borderWidth: 0,
        borderColor: 'transparent'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    tag: {
        color: '#FFFFFF',
        fontSize: 19,
        fontFamily: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    tagContainer: {
        flex: 1,
        height: 155,
        minWidth: '30%',
        backgroundColor: '#F5F5F5',
        margin: 4,
        marginRight: 9,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10
    },
    scrollContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexBasis: 2,
        flexDirection: 'row',
        padding: 8,
        margin: 4,
        width: '100%',
        height: '100%'
    },
    view: {
        flex: 1,
        width: '100%',
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default TagsContainer;