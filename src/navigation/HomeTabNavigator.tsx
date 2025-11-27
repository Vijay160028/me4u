import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Responsive scaling functions
const scale = (size: number) => {
  const baseWidth = 375; // iPhone X base width
  return (SCREEN_WIDTH / baseWidth) * size;
};

const scaleFont = (size: number) => {
  const baseWidth = 375;
  const ratio = SCREEN_WIDTH / baseWidth;
  const newSize = size * ratio;
  if (Platform.OS === 'ios') {
    return Math.max(10, Math.round(newSize));
  }
  return Math.max(10, newSize);
};

const placeholderStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scale(24),
  },
  text: {
    fontSize: scaleFont(18),
    color: '#333333',
  },
});

const iconStyles = StyleSheet.create({
  icon: {
    fontSize: scaleFont(24),
  },
});

// Icon components for tabs
const HomeIcon = ({color}: {color: string}) => (
  <Text style={[iconStyles.icon, {color}]}>🏠</Text>
);

const PlanTripIcon = ({color}: {color: string}) => (
  <Text style={[iconStyles.icon, {color}]}>🌐</Text>
);

const PackagesIcon = ({color}: {color: string}) => (
  <Text style={[iconStyles.icon, {color}]}>⬜</Text>
);

const SoonIcon = ({color}: {color: string}) => (
  <Text style={[iconStyles.icon, {color}]}>⏳</Text>
);

// Placeholder screens for other tabs
const PlanMyTripScreen = () => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>Plan My Trip</Text>
  </View>
);

const PackagesScreen = () => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>Packages</Text>
  </View>
);

const SoonScreen = () => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>Soon</Text>
  </View>
);

export const HomeTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom || 0;
  const tabBarBaseHeight = scale(65);
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6347',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          height: tabBarBaseHeight + bottomInset,
          minHeight: scale(60) + bottomInset,
          paddingBottom: Math.max(bottomInset, scale(Platform.OS === 'ios' ? 10 : 6)),
          paddingTop: scale(10),
          paddingHorizontal: scale(8),
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -4},
          shadowOpacity: 0.12,
          shadowRadius: 8,
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
        },
        tabBarLabelStyle: {
          fontSize: scaleFont(11),
          fontWeight: '600',
          marginTop: scale(-2),
          marginBottom: bottomInset > 0 ? scale(4) : scale(2),
          letterSpacing: 0.3,
        },
        tabBarIconStyle: {
          marginTop: scale(2),
          marginBottom: scale(2),
        },
        tabBarItemStyle: {
          paddingVertical: scale(4),
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <HomeIcon color={focused ? '#FF6347' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="PlanMyTrip"
        component={PlanMyTripScreen}
        options={{
          tabBarLabel: 'Plan My Trip',
          tabBarIcon: ({color, focused}) => (
            <PlanTripIcon color={focused ? '#FF6347' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
          tabBarLabel: 'Packages',
          tabBarIcon: ({color, focused}) => (
            <PackagesIcon color={focused ? '#FF6347' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Soon"
        component={SoonScreen}
        options={{
          tabBarLabel: 'Soon',
          tabBarIcon: ({color, focused}) => (
            <SoonIcon color={focused ? '#FF6347' : color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

