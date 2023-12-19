import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckInscription } from './CheckInscription';
import { TextInscription } from './TextInscription';
import { Tabs, Tab } from './Tabs';

export function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between p-4">
        <h1 className="text-4xl font-bold text-gray-800">EthScriptum</h1>
        <ConnectButton />
      </header>
      <Tabs>
        <Tab label="Check availability">
          <CheckInscription />
        </Tab>
        <Tab label="Inscribe text">
          <TextInscription />
        </Tab>
        <Tab label="Inscribe image">
          <div>
            <p className="text-gray-500 text-sm">
              This feature is not yet available.
            </p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
