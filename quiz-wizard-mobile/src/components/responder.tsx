import React, {FC} from 'react'
import {observer} from 'mobx-react-lite'
import {ViewProps, View} from 'react-native'
import {ResponderId} from '@types'
import {useRespondersStore} from '@providers'
import {
  StyleService,
  Text,
  useStyleSheet,
  useTheme
} from '@ui-kitten/components'
import {HashIcon, PersonIcon, QuestionMarkIcon} from '@icons'
import {useTranslation} from 'react-i18next'

export interface ResponderProps extends ViewProps {
  responderId?: ResponderId
}

export const Responder: FC<ResponderProps> = observer(
  ({responderId, style, ...props}) => {
    const [t] = useTranslation()
    const theme = useTheme()
    const styles = useStyleSheet(themedStyles)

    const responderStore = useRespondersStore()

    const responder = responderId
      ? responderStore.getResponderById(responderId)
      : undefined

    return (
      <View {...props} style={[styles.root, style]}>
        {responderId ? (
          <>
            <HashIcon
              style={[styles.icon, styles.separator]}
              fill={theme['text-primary-color']}
            />
            <Text style={styles.separator} children={responderId} />
            <PersonIcon
              style={[styles.icon, styles.separator]}
              fill={theme['text-primary-color']}
            />
            <Text
              style={styles.responderName}
              numberOfLines={1}
              children={responder?.name ?? t<string>('UNKNOWN_RESPONDER')}
            />
          </>
        ) : (
          <>
            <QuestionMarkIcon
              style={[styles.icon, styles.separator]}
              fill={theme['text-primary-color']}
            />
            <Text children={t<string>('ANONYMOUS')} />
          </>
        )}
      </View>
    )
  }
)

const themedStyles = StyleService.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  responderName: {
    width: 96
  },
  icon: {
    width: 18,
    height: 18
  },
  separator: {
    marginRight: 3
  }
})
