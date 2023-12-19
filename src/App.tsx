import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount } from 'wagmi';
import { CheckInscription } from './CheckInscription';

export function App() {
  // const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between p-4">
        <h1 className="text-4xl font-bold text-gray-800">EthScriptum</h1>
        <ConnectButton />
      </header>
      <CheckInscription />
    </div>
  );
}
