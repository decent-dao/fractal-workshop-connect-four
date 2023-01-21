export const ROUTES = {
  base: {
    path: '/',
    relative: () => '/'
  },
  game: {
    path: ':gameId',
    relative: (gameId: number) => `/${gameId.toString()}`
  }
}