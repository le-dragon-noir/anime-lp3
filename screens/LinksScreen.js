import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Image } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { getStarterMedias } from '../api/AnilistService';
import Constants from 'expo-constants';

export default function LinksScreen({ navigation }) {
  const [mediaArray, setMediaArray] = React.useState([])
  const [mediaPage, setMediaPage] = React.useState(0)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    getStarterMedias(mediaPage).then(response => {
      setMediaArray(mediaArray.concat(response))
      setIsRefreshing(false)
    })
  }, [mediaPage])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mediaArray}
        renderItem={({ item }) => {
          return (
            <MediaCardRow
              mediaRow={item}
              navigation={navigation}
            />
          )
        }}
        keyExtractor={item => {
          return item[0].id
        }}
        onEndReached={() => {setMediaPage(mediaPage + 2)}}
        onEndReachedThreshold={0.1}
        onRefresh={() => {
          setIsRefreshing(true)
          setMediaArray([])
          setMediaPage(0)
        }}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

const MediaCardRow = ({ mediaRow }) => {
  const firstMedia = mediaRow[0]
  const secondMedia = mediaRow[1]
  return (
    <View style={styles.row} key={`${firstMedia.id}${secondMedia.id}`}>
      <MediaCard content={firstMedia}/>
      <MediaCard content={secondMedia}/>
    </View>
  )
}

const MediaCard = ({content, navigation}) => (
  <Card
    style={styles.imageCard}
    key={content.id}
  >
    <CardItem>
      <Body>
        <Image
          style={styles.image}
          source={{
            uri:
            content.coverImage.large
          }}
        />
        <Text style={styles.title}>
          {`${ content.title.romaji }`}
        </Text>
      </Body>
    </CardItem>
  </Card>
)

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
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  imageCard: {
    height: 300,
    flex: .45,
    alignContent: 'center'
  },
  image: {
    height: 240,
    width: 150,
    alignSelf: 'center'
  }

});