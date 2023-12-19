import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-4xl font-bold text-gray-800">EthScriptum</h1>
      <ConnectButton />
    </header>
  );
}
