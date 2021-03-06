import {useCallback, useMemo} from 'react'
import {BrowserRouter, Switch, Route, Redirect, useLocation, useHistory} from 'react-router-dom'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import DashboardIcon from '@material-ui/icons/Dashboard'
import {useTranslation} from 'react-i18next'

import {
  AccountPage,
  AnalyticsPage,
  AnswersPage,
  DashboardPage,
  GroupsPage,
  QuizzesPage,
  SignInPage,
  SignUpPage,
  StudentPage,
  NewStudentPage,
  StudentsPage,
  NewGroupPage,
  GroupPage,
  NewQuizPage,
  QuizPage,
  NewAnswerPage,
  AnswerPage
} from '../pages'
import {NavigationTarget, PageWithNavigation, Toolbar} from '../components'

import {Path} from './path'
import {PublicRoute} from './public-route'
import {PrivateRoute} from './private-route'

export function Router() {
  return (
    <BrowserRouter>
      <Switch>

        <PublicRoute
          exact
          path={Path.signIn()}
          children={<SignInPage />}
        />

        <PublicRoute
          exact
          path={Path.signUp()}
          children={<SignUpPage />}
        />

        <AppRoute />

      </Switch>
    </BrowserRouter>
  )
}

function AppRoute() {

  const history = useHistory()
  const location = useLocation()

  const onNavigate = useCallback(
    (path: string) => {
      if (location.pathname.match(path)) {
        return
      }

      history.push(path)
    },
    [history, location]
  )

  const navigationTargets = useNavigationTargets()

  return (
    <PrivateRoute>
      <PageWithNavigation
        {...navigationTargets}
        onNavigate={onNavigate}
        toolbar={<Toolbar />}
      >
        <Switch>
          <Route
            exact
            path={Path.dashboard()}
            component={DashboardPage}
          />
          <Route
            exact
            path={Path.account()}
            component={AccountPage}
          />
          <Route
            path={Path.students()}
            component={StudentsRoute}
          />
          <Route
            path={Path.groups()}
            component={GroupsRoute}
          />
          <Route
            path={Path.quizzes()}
            component={QuizzesRoute}
          />
          <Route
            path={Path.answers()}
            component={AnswersRoute}
          />
          <Route
            path={Path.analytics()}
            component={AnalyticsPage}
          />
          <Redirect
            to={Path.dashboard()}
          />
        </Switch>
      </PageWithNavigation>
    </PrivateRoute>
  )
}

const useNavigationTargets = () => {
  const [t] = useTranslation()
  const topNavigationTargets = useMemo<NavigationTarget[]>(
    () => [
      {
        path: Path.students(),
        caption: t('STUDENTS'),
        Icon: LocalLibraryIcon
      },
      {
        path: Path.groups(),
        caption: t('GROUPS'),
        Icon: GroupIcon
      },
      {
        path: Path.quizzes(),
        caption: t('QUIZZES'),
        Icon: AssignmentIcon
      },
      {
        path: Path.answers(),
        caption: t('ANSWERS'),
        Icon: AssignmentTurnedInIcon
      },
      {
        path: Path.analytics(),
        caption: t('ANALYTICS'),
        Icon: EqualizerIcon
      }
    ],
    [t]
  )

  const {pathname} = useLocation()

  const bottomNavigationTargets = useMemo<NavigationTarget[] | undefined>(
    () => !pathname.match(Path.dashboard()) ? [
      {
        path: Path.dashboard(),
        caption: t('DASHBOARD'),
        Icon: DashboardIcon
      }
    ] : undefined,
    [pathname, t]
  )

  const isTargetSelected = useCallback(
    (path: string) => Boolean(pathname.match(path)),
    [pathname]
  )

  return {
    topNavigationTargets,
    bottomNavigationTargets,
    isTargetSelected
  }
}

function StudentsRoute() {
  return (
    <Switch>
      <Route
        exact
        path={Path.newStudent()}
        component={NewStudentPage}
      />
      <Route
        exact
        path={Path.student()}
        component={StudentPage}
      />
      <Route
        path={Path.students()}
        component={StudentsPage}
      />
    </Switch>
  )
}

function GroupsRoute() {
  return (
    <Switch>
      <Route
        exact
        path={Path.newGroup()}
        component={NewGroupPage}
      />
      <Route
        exact
        path={Path.group()}
        component={GroupPage}
      />
      <Route
        path={Path.groups()}
        component={GroupsPage}
      />
    </Switch>
  )
}

function QuizzesRoute() {
  return (
    <Switch>
      <Route
        exact
        path={Path.newQuiz()}
        component={NewQuizPage}
      />
      <Route
        exact
        path={Path.quiz()}
        component={QuizPage}
      />
      <Route
        path={Path.quizzes()}
        component={QuizzesPage}
      />
    </Switch>
  )
}

function AnswersRoute() {
  return (
    <Switch>
      <Route
        exact
        path={Path.newAnswer()}
        component={NewAnswerPage}
      />
      <Route
        exact
        path={Path.answer()}
        component={AnswerPage}
      />
      <Route
        path={Path.answers()}
        component={AnswersPage}
      />
    </Switch>
  )
}
