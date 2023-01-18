import { createHashRouter } from 'react-router-dom';
import { ConnectFourGames } from '../../components/ConnectFourGames';
import { ConnectFour } from '../ConnectFour';

export const router = createHashRouter([
  {
    path: '/', // splash
    element: <ConnectFourGames />,
    children: [
      {
        element: <ConnectFour />,
        path: ':address',
        // loader: gameLoader,
      }],
  },
])