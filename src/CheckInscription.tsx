import { useState } from 'react';
import { checkAvailability, shortString } from './utils';
import { CheckAvailabilityResponse } from './types';

export function CheckInscription() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<CheckAvailabilityResponse | null>(
    null
  );

  const handleCheck = async () => {
    setIsLoading(true);
    try {
      const response = await checkAvailability(input);
      console.log('Response:', response);
      setDetails(response);
    } catch (error) {
      // TODO: Handle error
      console.error('Error checking inscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4 max-w-lg">
      <div className="flex mb-4 gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter inscription data"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleCheck}
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors ${
            isLoading
              ? 'bg-blue-300'
              : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
          }`}
        >
          {isLoading ? 'Checking...' : 'Check Availability'}
        </button>
      </div>
      {details && (
        <div className="p-4 mt-4 bg-white rounded-md shadow">
          <p
            className={`text-lg ${
              details.isTaken ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {details.isTaken
              ? 'Inscription already exists'
              : 'Inscription is available'}
          </p>
          {details.ethscription && (
            <>
              <p className="mt-2">
                Owner:&nbsp;
                <a
                  href={`https://etherscan.io/${details.ethscription.current_owner}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {shortString(details.ethscription.current_owner)}
                </a>
              </p>
              <p className="mt-2">
                Transaction hash:&nbsp;
                <a
                  href={`https://etherscan.io/tx/${details.ethscription.transaction_hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {shortString(details.ethscription.transaction_hash)}
                </a>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
