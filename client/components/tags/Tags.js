import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const Tag = ({ title, bgImage }) => {
    return (
        <ImageBackground style={styles.tagContainer} source={bgImage}>
            <View style={styles.overlay}></View>
            <Text style={styles.tag}>{title}</Text>
        </ImageBackground>
    )
}

const TagsContainer = ({ tags }) => {
    return (
        <View style={styles.container}>
            {tags.map((tag) =>
                <Tag
                    title={tag.title}
                    bgImage={tag.bgImage}
                    key={tag.id} 
                />)}
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    tag: {
        color: '#FFFFFF',
        fontSize: 16
    },
    tagContainer: {
        flex: 1,
        maxHeight: 120,
        minWidth: '30%',
        backgroundColor: '#CCC',
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexBasis: 2,
        flexDirection: 'row',
        padding: 12,
        margin: 4
    }
})

export default TagsContainer;