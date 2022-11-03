import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from '@components/ChatBox/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect, useRef, FC } from 'react';
import autosize from 'autosize';
// import { Mention, SuggestionDataItem } from 'react-mentions';
import { useParams } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';
import { MdSend } from '@react-icons/all-files/Md/MdSend';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}
const ChatBox: FC<Props> = ({ chat, onSubmitForm, onChangeChat, placeholder }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, [textareaRef]);

  const onKeydownChat = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          placeholder={placeholder}
          ref={textareaRef}
        ></MentionsTextarea>
        <Toolbox>
          <SendButton className={chat.trim() ? 'active' : ''}>
            <MdSend />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
