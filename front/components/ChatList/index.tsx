import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM, IChat } from '@typings/db';
import React, { useCallback, forwardRef, RefObject, MutableRefObject, FC } from 'react';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
}
const ChatList: FC = () => {
  //   const onScroll = useCallback(
  //     (values) => {
  //       if (values.scrollTop === 0 && !isReachingEnd) {
  //         console.log('가장 위');
  //         setSize((prevSize) => prevSize + 1).then(() => {
  //           // 스크롤 위치 유지
  //           const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
  //           if (current) {
  //             current.scrollTop(current.getScrollHeight() - values.scrollHeight);
  //           }
  //         });
  //       }
  //     },
  //     [scrollRef, isReachingEnd, setSize],
  //   );

  return (
    <ChatZone>
      hello
      {/* {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat} />
              ))}
            </Section>
          );
        })} */}
    </ChatZone>
  );
};

export default ChatList;
