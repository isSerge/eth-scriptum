import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import {
  goerli,
  arbitrum,
  zkSync,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    arbitrum,
    zkSync,
    ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'EthScriptum',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
