import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { HomeFeedScreen } from '../screens/HomeFeedScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { SurpriseScreen } from '../screens/SurpriseScreen';
import { FiltersScreen } from '../screens/FiltersScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { RootStackParamList, MainTabParamList } from './types';
import { HomeTabIcon, JarIcon, SparkleIcon } from '../components/Icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.plum700,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeFeedScreen}
        options={{ tabBarIcon: ({ color, size }) => <HomeTabIcon size={size} color={color} /> }}
      />
      <Tab.Screen
        name="DateJar"
        component={SavedScreen}
        options={{ title: 'Date Jar', tabBarIcon: ({ color, size }) => <JarIcon size={size} color={color} /> }}
      />
      <Tab.Screen
        name="Surprise"
        component={SurpriseScreen}
        options={{ tabBarIcon: ({ color, size }) => <SparkleIcon size={size} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { colors } = useTheme();

  return (
    <View style={[styles.fill, { backgroundColor: colors.bg }]}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Filters" component={FiltersScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ animation: 'slide_from_right' }} />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
