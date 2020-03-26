import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Image } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { getTopCharacters } from '../api/AnilistService';
import Constants from 'expo-constants';

export default function LinksScreen({ navigation }) {
  const [characters, setCharacters] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    getTopCharacters(page).then(response => {
      setCharacters(characters.concat(response))
      setIsRefreshing(false)
    })
  }, [page])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        renderItem={({ item }) => {
          return (
            <CharacterCard
              content={item}
              navigation={navigation}
            />
          )
        }}
        keyExtractor={item => {
          console.log('item', item)
          return item.id
        }}
        onEndReached={() => {setPage(page + 2)}}
        onEndReachedThreshold={0.1}
        onRefresh={() => {
          setIsRefreshing(true)
          setCharacters([])
          setPage(0)
        }}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

const CharacterCard = ({ content }) => {
  return (
    <View 
      style={styles.row}
      key={content.id}
    >
      <Card style={styles.imageCard}>
        <CardItem>
          <Body>
            <Image
              style={styles.image}
              source={{
                uri:
                  content.image.medium
              }}
            />
            <Text style={styles.title}>
              {`${ content.name.full } \n`}
            </Text>
            <Text style={styles.media}>
              {`${ content.media.nodes[0].title.romaji }`}
            </Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 13,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  media: {
    fontSize: 13,
    alignSelf: 'center',
    color: 'gray'
  },
  imageCard: {
    height: 300,
    flex: .9,
    alignContent: 'center'
  },
  image: {
    height: 240,
    width: 150,
    alignSelf: 'center'
  }

});