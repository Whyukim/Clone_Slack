import useInput from '@hooks/useInput';
import { Container, Header, DragOver } from '@pages/DirectMessage/styles';
import { IDM } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import gravatar from 'gravatar';
import { useParams } from 'react-router';
import useSWR from 'swr';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );
  const [chat, onChangeChat, setChat] = useInput('');

  const [dragOver, setDragOver] = useState(false);

  const onSubmitForm = useCallback(
    (e: any) => {
      e.preventDefault();

      if (chat?.trim()) {
        axios
          .post(`/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then((res) => {
            setChat('');
            mutateChat();
          })
          .catch((err) => {
            console.dir(err);
          });
      }
    },
    [chat, workspace, id],
  );

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList /* chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} */ />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      {dragOver && <DragOver>업로드!</DragOver>}
    </Container>
  );
};

export default DirectMessage;
