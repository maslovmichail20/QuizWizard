import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {QuizSchema} from 'quiz-wizard-schema'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned'

import {generateQuizSheet} from '../helpers'

export interface DownloadQuizSheetButtonProps {
  quiz: QuizSchema
}

export function DownloadQuizSheetButton({
  quiz
}: DownloadQuizSheetButtonProps) {
  const [t] = useTranslation()
  const [isGenerating, setIsGenerating] = useState(false)
  const onClick = () => {
    setIsGenerating(true)
    generateQuizSheet(quiz, t)
      .finally(() => setIsGenerating(false))
  }

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={onClick}
      startIcon={
        isGenerating ? (
          <CircularProgress
            color="inherit"
            size="24px"
          />
        ) :
          <AssignmentReturnedIcon />
      }
    >
      {t('DOWNLOAD_QUIZ')}
    </Button>
  )
}
