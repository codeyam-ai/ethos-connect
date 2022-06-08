import store from 'store2'

type InitializeOptions = {
  walletAppUrl: string
}

const initialize = ({ walletAppUrl }: InitializeOptions): void => {
  const ethosStore = store.namespace('ethos')
  ethosStore('walletAppUrl', walletAppUrl)
}

export default initialize
