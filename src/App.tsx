import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { Account } from './components/Account';
import { Balance } from './components/Balance';
import { BlockNumber } from './components/BlockNumber';
import { NetworkSwitcher } from './components/NetworkSwitcher';

export function App() {
  const { isConnected } = useAccount();

  return (
    <>
      <h1>EthScriptum</h1>

      <ConnectButton />

      {isConnected && (
        <>
          <hr />
          <h2>Network</h2>
          <NetworkSwitcher />
          <br />
          <hr />
          <h2>Account</h2>
          <Account />
          <br />
          <hr />
          <h2>Balance</h2>
          <Balance />
          <br />
          <hr />
          <h2>Block Number</h2>
          <BlockNumber />
          <br />
        </>
      )}
    </>
  );
}
