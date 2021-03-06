import React, {FC} from 'react'
import {TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {Svg, Circle} from 'react-native-svg'
import {useTheme} from '@ui-kitten/components'

const BUTTON_SIZE = 64

export const CaptureButton: FC<TouchableOpacityProps> = (props) => {
  const theme = useTheme()
  const color = props.disabled
    ? theme['color-primary-transparent-300']
    : theme['color-primary-100']

  return (
    <TouchableOpacity {...props}>
      <Svg height={BUTTON_SIZE} width={BUTTON_SIZE}>
        <Circle
          cx={BUTTON_SIZE * 0.5}
          cy={BUTTON_SIZE * 0.5}
          r={Math.floor(BUTTON_SIZE * 0.4)}
          fill={color}
        />
        <Circle
          cx={BUTTON_SIZE * 0.5}
          cy={BUTTON_SIZE * 0.5}
          r={Math.floor(BUTTON_SIZE * 0.48)}
          stroke={color}
          strokeWidth="2"
          fill="transparent"
        />
      </Svg>
    </TouchableOpacity>
  )
}
