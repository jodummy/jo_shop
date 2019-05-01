import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';


import Welcome from '../screens/Welcome';
/* import Login from '../screens/Login';
import Browse from '../screens/Browse';
import Explore from '../screens/Explore';
import Product from '../screens/Product';
import Setting from '../screens/Setting'; */


import { theme } from '../constants';

const screen = createStackNavigator({
    Welcome,
  /*   Login,
    Browse,
    Explore,
    Product,
    Setting, */
}, {
        defaultNavigationOptions: {
            headerStyle: {},
            headerBackImage: <Image />,
            headerBackTitle: null,
            headerLeftContainerStyle: {},
            headerRightContainerStyle: {}

        }
    });

export default createAppContainer(screen);
