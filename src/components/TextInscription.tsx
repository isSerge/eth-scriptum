import {
  useSendTransaction,
  usePrepareSendTransaction,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';
import { ChangeEvent, useCallback, useState } from 'react';
import { stringToHex } from '../utils';
import { CopyIcon } from './Icons';

const prefix = 'data:,';

// TODO: check availability before inscribing
// TODO: change success links for other chains (not only mainnet)
export function TextInscription() {
  const [text, setText] = useState('');
  const [encodedText, setEncodedText] = useState(prefix);
  const [hex, setHex] = useState(stringToHex(prefix));

  const { address, isDisconnected } = useAccount();

  const { config } = usePrepareSendTransaction({
    to: address,
    data: `0x${hex}`,
  });

  const { data, error, isLoading, isError, sendTransaction } =
    useSendTransaction(config);

  const { isLoading: isWaitingForTx, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleCreate = async () => {
    if (isDisconnected) {
      alert('Connect your wallet first');
      return;
    }

    sendTransaction?.();
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(hex);
    setTimeout(() => {
      alert(`Copied hex to clipboard: ${hex}`);
    }, 250);
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(text);
    setEncodedText(`data:,${text}`);
    setHex(Buffer.from(`data:,${text}`).toString('hex'));
  }, []);

  return (
    <div className="bg-gray-100 p-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div style={{ minWidth: '338px' }}>
          <div className="flex flex-col items-center justify-center bg-gray-100">
            <textarea
              autoFocus
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              name="text"
              placeholder="Text to inscribe"
              onChange={handleChange}
              value={text}
              rows={4}
              style={{ minHeight: '100px' }}
            ></textarea>

            <div className="mb-4 bg-white rounded-md shadow w-full">
              <div className="p-4 border-b border-gray-200">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Encoded Text
                </label>
                <div
                  className="mt-1 text-gray-800 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400"
                  style={{ wordBreak: 'break-all' }}
                >
                  {encodedText}
                </div>
              </div>

              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Hex Value
                  </label>
                  <button
                    onClick={handleCopyClick}
                    className="rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <CopyIcon />
                  </button>
                </div>
                <div
                  className="text-gray-800 flex-grow max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400"
                  style={{ wordBreak: 'break-all' }}
                >
                  {hex}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ minWidth: '338px' }}>
          <div>
            <button
              className="mb-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors"
              type="button"
              onClick={handleCreate}
            >
              Create inscription
            </button>

            {isLoading && <div className="text-blue-500">Check wallet...</div>}
            {isWaitingForTx && (
              <div className="text-blue-500">Waiting for transaction...</div>
            )}
            {isSuccess && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md text-green-700">
                <p>Your inscription was successfully created!</p>
                {/* <div className="flex flex-col sm:flex-row gap-2 mt-2"> */}
                <a
                  href={`https://etherscan.io/tx/${data?.hash}`}
                  className="text-blue-500 hover:text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Etherscan
                </a>
                <br />
                <a
                  href={`https://ethscriptions.com/ethscriptions/${data?.hash}`}
                  className="text-blue-500 hover:text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Ethscriptions
                </a>
                {/* </div> */}
              </div>
            )}
            {isError && (
              <div className="text-red-500">Error: {error?.message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
