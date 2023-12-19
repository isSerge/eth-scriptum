import {
  useSendTransaction,
  usePrepareSendTransaction,
  useWaitForTransaction,
  useAccount,
} from 'wagmi';
import { ChangeEvent, useCallback, useState } from 'react';
import { stringToHex } from './utils';
import { CopyIcon } from './Icons';

const prefix = 'data:,';

// TODO: check availability before inscribing
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

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setText(text);
    setEncodedText(`data:,${text}`);
    setHex(Buffer.from(`data:,${text}`).toString('hex'));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 max-w-lg">
      <input
        autoFocus
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="text"
        placeholder="Text to ethscribe"
        onChange={handleChange}
        value={text}
      />
      <div className="mb-4 p-2 bg-white rounded-md shadow w-full">
        {encodedText}
      </div>
      <div className="flex items-center mb-4 p-2 bg-white rounded-md shadow w-full">
        <div className="flex-grow">{hex}</div>
        <button
          onClick={handleCopyClick}
          className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <CopyIcon />
        </button>
      </div>
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
        <>
          <div className="text-green-500">
            Your inscription successfully created!{' '}
            <a href={`https://etherscan.io/tx/${data?.hash}`}>
              View on Etherscan
            </a>
            <a href={`https://ethscriptions.com/ethscriptions/${data?.hash}`}>
              View on Ethscriptions
            </a>
          </div>
        </>
      )}
      {isError && <div className="text-red-500">Error: {error?.message}</div>}
    </div>
  );
}
