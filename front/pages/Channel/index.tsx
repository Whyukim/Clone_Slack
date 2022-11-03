import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import InviteChannelModal from '@components/InviteChannelModal';
import useInput from '@hooks/useInput';
import Workspace from '@layouts/Workspace';
import { IChat } from '@typings/db';
import axios from 'axios';
import { stringify } from 'querystring';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { Container, Header } from './styles';
import fetcher from '@utils/fetcher';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const { data: chatData, mutate: mutateChat } = useSWR<IChat[]>(
    `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=1`,
    fetcher,
  );

  const onSubmitForm = useCallback(
    (e: any) => {
      console.log(chat);
      e.preventDefault();
      // if (chat?.trim()) {
      //   axios
      //     .post(`/workspaces/${workspace}/channels/${channel}/chats`, {
      //       content: chat,
      //     })
      //     .then((res) => {
      //       setChat('');
      //       mutateChat();
      //     })
      //     .catch((err) => {
      //       console.dir(err);
      //     });
      // }
    },
    [chat],
  );
  console.log(chat);

  return (
    <Container>
      <Header>채널</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      {/* <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      /> */}
      {/* {dragOver && <DragOver>업로드!</DragOver>} */}
    </Container>
  );
};

export default Channel;
