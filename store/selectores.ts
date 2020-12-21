import { RootState } from 'store/reducers';

const selectors = {
  useState: ({ user }: RootState) => user
}

export default selectors;