import Workspace from '@layouts/Workspace';
import React from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const DirectMessage = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 5000,
  });

  return <div>DirectMessage ㅊㅋ</div>;
};

export default DirectMessage;
