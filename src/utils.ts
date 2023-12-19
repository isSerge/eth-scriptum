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

export async function checkAvailability(data: string) {
  const hash = sha256(data);
  return fetch(apiUrl + 'ethscriptions/exists/' + hash)
    .then(response => response.json())
    .then(data => ({
      isTaken: data.result,
      ownerAddress: data.ethscription?.current_owner || null,
    }));
}
