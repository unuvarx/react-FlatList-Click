import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapButton: {
    alignItems: 'center',
    marginHorizontal: 50,
    padding: 20,
    backgroundColor: 'orange',
  },
  textFontSize: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'black',
    color: '#fff',

  },
  item: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  cardText: {
    flex: 1,
  }
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getListPhotos();
    return () => {};
  }, []);

  getListPhotos = () => {
    const apiURL =
      'https://jsonplaceholder.typicode.com/photos?_limit=20&page=1';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => setIsLoading(false));
    const bringData = data.map(i => {
      return {
        ...i,
        selected: 1,
      };
    });
    setData(bringData);
  };
  onClickItem = (item, index) => {
    const newArrData = data.map(e => {
      if (item.id == e.id && item.selected == 0.2) {
        return {
          ...e,
          selected: 1,
        };
      } else if (item.id == e.id) {
        return {
          ...e,
          selected: 0.2,
        };
      }

      return {
        ...e,
      };
    });
    setData(newArrData);
  };

  RenderItem = ({item, index}) => {
    if (item.id % 2 == 0) {
      return (
        <TouchableOpacity
          onPress={() => onClickItem(item, index)}
          style={[
            styles.item,
            {
              marginTop: 11,
              height: 150,
              opacity: item.selected,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Image
            style={styles.thumbnail}
            source={{uri: item.thumbnailUrl, width: 100, height: 100}}
            resizeMode="contain"
          />
          <Text style={styles.cardText} >{item.title}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => onClickItem(item, index)}
          style={[
            styles.item,
            {
              marginTop: 11,
              height: 150,
              opacity: item.selected,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}>
          <Text style={styles.cardText} >{item.title}</Text>
          <Image
            style={styles.thumbnail}
            source={{uri: item.thumbnailUrl, width: 100, height: 100}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    }
  };
  const selecteds = [];
  showInfo = () => {
    let titles = '';
    data.map(x => {
      if (x.selected == 0.2) {
        selecteds.push(x.title);
        titles = titles + '--' + x.title;
      }
      alert(titles);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={RenderItem}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity onPress={()=> showInfo()}>
        <Text style={styles.textFontSize}>INFO</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
