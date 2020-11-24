/**
*
* MapboxGL Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import {
  View,
  Icon,
} from 'native-base';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import { openURLByLinking } from 'utils/helpers';
import Button from 'components/Button';

import { accessToken } from './utils/config';

import styles from './styles';

class CardMap extends React.Component {
  constructor(porps) {
    super(porps);

    MapboxGL.setAccessToken(accessToken);
  }

  getCoordinate(poi) {
    if (!poi) return undefined;

    return [poi.longitude, poi.latitude];
  }
  openMobileMap = () => {
    const { pois } = this.props;
    const { address } = pois[0];
    const formattedAddress = address.replace(/ /g, '+');
    if (Platform.OS === 'ios') openURLByLinking(`http://maps.apple.com/?address=${formattedAddress}`);
    else openURLByLinking(`https://www.google.com/maps/place/${formattedAddress}`);
    // openURLByLinking(`http://maps.apple.com/?ll=${this.centerCoordinate[1]},${this.centerCoordinate[0]}`);
  }

  /* render */

  renderMapbox() {
    const { pois, poiIndex } = this.props;
    this.centerCoordinate = this.getCoordinate(pois[poiIndex]);

    return (
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        style={styles.map}
        centerCoordinate={this.centerCoordinate}
        zoomLevel={14}
        scrollEnabled={false}
        zoomEnabled={false}
        logoEnabled={false}
      >
        { this.renderAnnotations(pois) }
      </MapboxGL.MapView>
    );
  }
  renderAnnotations(pois) {
    return pois.map((poi, i) => {
      const coordinate = this.getCoordinate(poi);
      const id = `pointAnnotation${i}`;

      return (
        <MapboxGL.PointAnnotation
          key={id}
          id={id}
          coordinate={coordinate}
          anchor={{ x: 0.5, y: 1 }}
        >
          <View style={styles.annotationCircle} />
        </MapboxGL.PointAnnotation>
      );
    });
  }

  renderMapButton = () => (
    <Button style={styles.sendButton} onPress={this.openMobileMap}>
      <Icon style={styles.sendIcon} name="ios-send" />
    </Button>
  )

  render() {
    return (
      <View style={styles.content}>
        { this.renderMapbox() }
        { this.renderMapButton() }
      </View>
    );
  }
}


CardMap.defaultProps = {
  poiIndex: 0,
  pois: [],
};

CardMap.propTypes = {
  poiIndex: PropTypes.number,
  pois: PropTypes.array,
};

export default CardMap;
