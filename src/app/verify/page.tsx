import VerifyEmail from '@/components/VerifyEmail';
import React, { Suspense } from 'react';

const Verify = () => {
  return (
    <Suspense>
      <div>
        <VerifyEmail />
      </div>
    </Suspense>
  );
};

export default Verify;
