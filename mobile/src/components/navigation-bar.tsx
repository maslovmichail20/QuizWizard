import React, {FC} from 'react'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components'
import {OptionsIcon, HomeIcon} from '@icons'

export const NavigationBar: FC<BottomTabBarProps> = ({
  navigation,
  state: {index, routeNames}
}) => (
  <BottomNavigation
    selectedIndex={index}
    onSelect={(indexToNavigate) =>
      navigation.navigate(routeNames[indexToNavigate])
    }>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={OptionsIcon} />
  </BottomNavigation>
)
