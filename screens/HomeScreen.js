import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View , Image} from 'react-native';
import { Card, CardItem, Body, Spinner } from 'native-base';
import { getTenNewestThreads } from '../api/AnilistService';
import Constants from 'expo-constants';

export default function HomeScreen({navigation}) {
  const [threads, setThreads] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    getTenNewestThreads(page).then(response => {
      setThreads(threads.concat(response))
      setIsRefreshing(false)
      setIsLoading(false)
    })
  }, [page])

  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading
        ? <Spinner style={styles.spinner} />
        : (
          <FlatList
            data={threads}
            renderItem={({ item }) => {
              return (
                <ThreadCard
                  id={item.id}
                  title={item.title}
                  name={item.user.name}
                  date={(new Date(item.createdAt * 1000)).toLocaleDateString()}
                  avatar={item.user.avatar.medium}
                />
              )
            }}
            keyExtractor={thread => {
              return thread.id
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
        )}
    </SafeAreaView>
  )
}
const ThreadCard = ({title, name, date, id, avatar}) => (
  <Card key={id}>
    <CardItem onPress={(() => {
      {/* navigation.navigate('Media') */}
      })}>
      <Body>
        <Text>
          {`${ title } \n`}
        </Text>
        <Image
          style={styles.image}
          source={{
            uri: avatar
          }}
        />
        <View style={styles.row}>
          <Text style={styles.userName}>
            {`${ name }`}
          </Text>
          <Text style={styles.threadDate}>
            {`${ date }`}
          </Text>
        </View>
      </Body>
    </CardItem>
  </Card>
)


HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
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
    width: 30,
    height: 30
  },
  spinner: {
    alignSelf: 'center',
    width: 30,
    height: 30,
  }
});