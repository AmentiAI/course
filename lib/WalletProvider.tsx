'use client';

import { ReactNode } from 'react';
import { LaserEyesProvider } from '@omnisat/lasereyes';

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <LaserEyesProvider
      config={{
        network: 'mainnet', // or 'testnet' for testing
      }}
    >
      {children}
    </LaserEyesProvider>
  );
}
