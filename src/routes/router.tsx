import { createHashRouter } from 'react-router-dom';
import { ConnectFourGames } from '../components/pages/ConnectFourGames';
import { ROUTES } from './routes';
import { ConnectFourGame } from '../components/pages/ConnectFourGame';

export const router = createHashRouter([
  {
    path: ROUTES.base.path, // splash
    element: <ConnectFourGames />,
  },
  {
    element: <ConnectFourGame />,
    path: ROUTES.game.path,
  }
])