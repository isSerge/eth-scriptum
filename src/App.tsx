import {
  Header,
  CheckInscription,
  TextInscription,
  Tabs,
  Tab,
} from './components';

export function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
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
