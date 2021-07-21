import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

import PopupButton from '../Buttons/PopupButton';
import ButtonPicture from './ButtonPicture';

const PopUp = props => {
  useEffect(() => {
    console.log('mount popup');
    return () => {
      console.log('unmount popup');
    };
  }, []);

  const clearHandler = () => {
    Alert.alert(
      'Do you realy want to clear?',
      'Do you realy want to clear?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: props.onClear},
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={props.closePopup} style={styles.underlay} />
      <View style={styles.window}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.h1}>Multiplikation Övningar</Text>
          <Text style={styles.h2}>
            Lär dig att kommer ihåg multiplikationstabellen.
          </Text>
          <View style={styles.section}>
            <Text style={styles.h3}>Premiss</Text>
            <Text style={styles.p}>
              Om man ska klara skolans matte måste man känna till vissa mönster.
              En av de viktigaste mönstrerna för låg- och mellanstadie elever är
              de multiplikationstabellerna (gångertabbellerna). Utan det här
              igenkännadet blir det svårt senare att klara av bl.a. division och
              bråk.
            </Text>
            <Text style={styles.p}>
              Det är inte konstigt att vissa ha brister i korttidsminne vid
              ålderna där vi lära oss multiplikationstabellerna (dvs
              lågstadiet): skolan tar för det mesta bara hänsyn till ålder inte
              barnets nuvarande utveckling.
            </Text>
            <Text style={styles.p}>
              Det här appen är utvecklat efter en idé från en svensk pedagogik
              professor Torkel Klingberg.
            </Text>
            <Text>
              Obs. det här är min tolkning: fel eller misforståelse kan och
              kommer att ske.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.h3}>UI</Text>
            <Text style={styles.p}>
              Appen är uppbyggd av en skärm, en interaktiv multiplikationstabell
              och en numberpad.
            </Text>
            <View style={styles.appImageContainer}>
              <Image
                source={require('../graphics/apppicture.jpg')}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.h3}>Skärm</Text>
            <Text style={styles.p}>
              Skärmen innerhåller en skärm för produkten som sökas, en skärm som
              svaret ska skrivas in, en timer och en indikator på nuvarande nivå
              och kvarvarande frågor.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../graphics/screenpicture.jpg')}
                style={styles.image}
              />
            </View>
            <Text style={styles.p}>
              Timer och nivå kan justeras vid behov (se botten av det här
              skrollande fönstret).
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.h3}>Number Pad</Text>
            <Text style={styles.p}>
              Tryck på "start" och man får en produkt på produktskärm. Knappa in
              svaret och tryck på "enter". Om man trycka fel kan man använda
              "del" (delete). Om man vill pausa kan man trycka på "stop". Nivå
              och kvarvarande produkter (men inte själva produkten) sparas både
              när man trycker på "stop" och när man stänger av appen.
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../graphics/numberpadpicture.jpg')}
                style={styles.image}
              />
            </View>
            <Text>
              Man kommer tillbaka till det här fönstret genom att trycka på
              "info". Här kan du spara nivån och kvarvarande produkter ("save")
              och dessutom radera nivån och kvarvarande produkter ur minne
              ("clear"). Obs. Om du radera av misstag tryck på spara direkt
              efter och informationen kommer inte att raderas.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.h3}>Interaktiva tabellen</Text>
            <Text style={styles.p}>
              Interaktiva tabellen innehåller tre olika delar. Tabellsknapper
              (mörk lila), tabellceller (ljus lila) och glömde celler (svarta).
            </Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../graphics/tablepicture.jpg')}
                style={styles.image}
              />
            </View>
            <Text style={styles.p}>
              Glömde celler är baserat på din nivå: om man är bekväm med fyrans
              tabell börjar man på nivå 4 och alla tal fram till 4 gånger 4 är
              gömda (läsa vidare om man vill veta hur man ändra nivån).
            </Text>
            <Text style={styles.p}>
              Om man inte veta ett svar kan man leta reda på det i tabellen. Om
              man trycka på en tabellknapp kommer hela raden eller kolumnen att
              ändra färg. Om man till exempel söker 6 gånger 6 kan man trycker
              på 6 på den horizontala axeln och 6 på den vertikala axeln. Talet
              som finns i både linjer av färgade celler (och är en lite grann
              mörkare) är ditt önskade talet.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.h3}>Nivå och Timer inställning</Text>
            <Text style={styles.p}>
              Med programmet stoppat kan man ändra nivån och timerhastighet.
            </Text>
            <Text style={styles.p}>
              <Text style={styles.bold}>Nivån</Text> ändras genom att skiva in
              13 och den önskade nivå (1 till 9). Till exempel, för att välja
              nivå 4, tryck:
            </Text>
            <ButtonPicture combo="134" />
            <Text style={styles.p}>
              <Text style={styles.bold}>Timerhastighet</Text> ändras genom att
              skriva in 77 och önskade nivån (1 till 9), 1 är långsam och 9
              snabbt. Till exempel, för att välja nivå 4, tryck:
            </Text>
            <ButtonPicture combo="774" />
          </View>
        </ScrollView>
        <View style={styles.panel}>
          <View style={styles.button}>
            <PopupButton onPress={props.closePopup} title="Close" />
          </View>
          <View style={styles.button}>
            <PopupButton onPress={props.onSave} title="Save" />
          </View>
          <View style={styles.button}>
            <PopupButton onPress={clearHandler} title="Clear" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  window: {
    backgroundColor: '#ccc',
    width: '85%',
    height: '85%',
    alignSelf: 'center',
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    elevation: 5,
  },
  scrollView: {
    backgroundColor: '#fff',
    margin: '5%',
    flex: 5,
  },
  panel: {
    flex: 0.07,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    marginRight: '2%',
    marginLeft: '2%',
  },

  underlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.5,
    backgroundColor: '#000',
  },
  settingsOn: {
    flex: 1,
    width: '100%',
  },
  settingsOff: {
    flex: 1,
    width: null,
    height: null,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    height: 300,
  },
  appImageContainer: {
    flex: 1,
    height: 400,
  },
  section: {
    margin: '5%',
  },
  h1: {
    color: '#19386b',
    fontSize: 25,
    marginBottom: 6,
    marginTop: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    color: '#19386b',
    fontSize: 20,
    marginBottom: 6,
    marginTop: 2,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  h3: {
    color: '#19386b',
    fontSize: 20,
    marginBottom: 6,
    marginTop: 2,
    fontWeight: 'bold',
  },
  p: {
    flexDirection: 'row',
    color: '#224c91',
    fontSize: 15,
    marginBottom: 4,
    marginTop: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default PopUp;
