import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Image } from 'react-native';
import { Card, CardItem, Body, Content } from 'native-base';
import { getTenNewestThreads, getTopReviews } from '../api/AnilistService';
import Constants from 'expo-constants';

export default function ReviewScreen({ navigation }) {
  const [reviews, setReviews] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    getTopReviews(page).then(response => {
      setReviews(reviews.concat(response))
    })
  }, [page])
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          return (
            <SummaryCard
              summary={item.summary}
              rating={item.rating}
              mediaName={item.media.title.romaji}
              id={item.id}
              mediaImage={item.media.coverImage.medium}
            />
          )
        }}
        keyExtractor={review => {
          return review.id
        }}
        onEndReached={() => { setPage(page + 2) }}
        onEndReachedThreshold={0.1}
        onRefresh={() => {
          setIsRefreshing(true)
          setThreads([])
          setPage(0)
        }}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}
const SummaryCard = ({ summary, rating, mediaName, id, mediaImage }) => (
  <Card key={id}>
    <CardItem>
      <Body>
        <View style={styles.row}>
          <Text style={styles.summary}>
            {`${ summary } \n`}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri:
                mediaImage
            }}
          />
        </View>
        <Text style={styles.userName}>
          {`${ mediaName }`}
        </Text>
        <View style={styles.row}>
          <Text style={styles.threadDate}>
            {`Rating: ${ rating }`}
          </Text>
        </View>
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
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  threadDate: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-end'
  },
  image: {
    height: 100,
    width: 70,
    alignSelf: 'flex-end'
  },
  summary: {
    width: 250
  }
});