import { createHashRouter } from 'react-router-dom';
import { ConnectFourGames } from '../../components/ConnectFourGames';
import { ConnectFour } from '../ConnectFour';
import { ROUTES } from './routes';

export const router = createHashRouter([
  {
    path: ROUTES.base.path, // splash
    element: <ConnectFourGames />,
  },
  {
    element: <ConnectFour />,
    path: ROUTES.game.path,
  }
])