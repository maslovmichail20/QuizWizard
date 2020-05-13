import React, {FC} from 'react'
import {View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {
  Button,
  Text,
  StyleService,
  useStyleSheet,
  Divider
} from '@ui-kitten/components'
import {Screen, UserProfile} from '@components'
import {FileAddIcon, CameraIcon, DownloadIcon} from '@icons'

export const HomeScreen: FC = () => {
  const [t] = useTranslation()
  const styles = useStyleSheet(themedStyles)

  return (
    <Screen>
      <UserProfile />
      <View style={styles.actionsWrapper}>
        <Button accessoryLeft={FileAddIcon}>
          {(props) => <Text {...props} children={t<string>('ADD_QUIZ')} />}
        </Button>
        <Button accessoryLeft={CameraIcon}>
          {(props) => (
            <Text {...props} children={t<string>('ADD_QUIZ_ANSWERS')} />
          )}
        </Button>
        <Divider style={styles.divider} />
        <Button accessoryLeft={DownloadIcon}>
          {(props) => (
            <Text {...props} children={t<string>('DOWNLOAD_ANSWERS_SHEET')} />
          )}
        </Button>
      </View>
    </Screen>
  )
}

const themedStyles = StyleService.create({
  actionsWrapper: {
    margin: 24,
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  divider: {
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 24
  }
})
