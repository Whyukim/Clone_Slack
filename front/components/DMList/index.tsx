// import useSocket from '@hooks/useSocket';
import { CollapseButton } from '@components/DMList/styles';
// import useSocket from '@hooks/useSocket';
import { IUser, IUserWithOnline } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { BsFillTriangleFill } from '@react-icons/all-files/Bs/BsFillTriangleFill';
import { FaRegCircle } from '@react-icons/all-files/Fa/FaRegCircle';
import { FaCircle } from '@react-icons/all-files/Fa/FaCircle';

const DMList: FC = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );
  //   const [socket] = useSocket(workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  useEffect(() => {
    console.log('DMList: workspace 바꼈다', workspace);
    setOnlineList([]);
  }, [workspace]);

  useEffect(
    () => {
      // socket?.on('onlineList', (data: number[]) => {
      //   setOnlineList(data);
      // });
      // socket?.on('dm', onMessage);
      // console.log('socket on dm', socket?.hasListeners('dm'), socket);
      return () => {
        // socket?.off('dm', onMessage);
        // console.log('socket off dm', socket?.hasListeners('dm'));
        //   socket?.off('onlineList');
      };
    },
    [
      /* socket */
    ],
  );

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <BsFillTriangleFill />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);

            return (
              <NavLink
                key={member.id}
                className={({ isActive }) => (isActive ? 'selected' : 'not')}
                to={`/workspace/${workspace}/dm/${member.id}`}
              >
                {isOnline ? (
                  <FaCircle style={{ marginBottom: '-2px', marginRight: '5px' }} color="rgb(43, 172, 118)" />
                ) : (
                  <FaRegCircle style={{ marginBottom: '-2px', marginRight: '5px' }} color="rgb(188, 171, 188)" />
                )}
                <span>{member.nickname}</span>
                {member.id === userData?.id && <span> (나)</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;
