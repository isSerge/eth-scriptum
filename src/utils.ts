import { CheckAvailabilityResponse } from './types';

const apiUrl = 'https://api.ethscriptions.com/api/';

export async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

export async function checkAvailability(dataUri: string): Promise<CheckAvailabilityResponse> {
  const hash = await sha256(`data:,${dataUri}`);
  return fetch(apiUrl + 'ethscriptions/exists/' + hash)
    .then(response => response.json())
    .then(({ result, ethscription }) => ({
      isTaken: result,
      ethscription,
    }));
}

export function shortString(value: string, initialLength = 6, endLength = -4): string {
  return `${value.slice(0, initialLength)}...${value.slice(endLength)}`
}

export function stringToHex(str: string) {
  return str.split('').map(c => c.charCodeAt(0).toString(16)).join('');
}
