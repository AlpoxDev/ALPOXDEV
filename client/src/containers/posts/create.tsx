import React, { useCallback, useState } from 'react';
// import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// stores
import { MSTProps } from 'stores';
import { AsyncStatus } from 'common/mst';

// components
import { PostCreatePreview, PostCreateTextarea, Button } from 'components';

export const PostCreateContainer = ({ store }: MSTProps): JSX.Element => {
  const { postStore } = store;
  const { createPost } = postStore;

  const [content, setContent] = useState<string>('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setContent(value);
    },
    [content, setContent],
  );

  const onCreate = useCallback(() => {
    if (createPost.status === AsyncStatus.pending) return;

    console.log('createPost', content);
  }, [content, createPost.status]);

  const onCancel = useCallback(() => {
    setContent('');
  }, [setContent]);

  return (
    <PostCreateContainerWrapper>
      <TopSection>
        <LeftSection>
          <PostCreateTextarea value={content} onChange={onChange} />
        </LeftSection>
        <RightSection>
          <PostCreatePreview content={content} />
        </RightSection>
      </TopSection>

      <BottomSection>
        <SaveButton isAuto primary onClick={onCreate}>
          작성{createPost.status === AsyncStatus.pending && '중...'}
        </SaveButton>
        <CancelButton isAuto onClick={onCancel}>
          취소
        </CancelButton>
      </BottomSection>
    </PostCreateContainerWrapper>
  );
};

const PostCreateContainerWrapper = styled.div`
  width: 100%;

  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
`;

const TopSection = styled.section`
  display: flex;
  align-items: center;
`;

const BottomSection = styled.section`
  width: 100%;
  height: 64px;
  padding: 0 21px;

  display: flex;
  align-items: center;
`;

const Section = styled.section`
  width: 50%;
  height: calc(100vh - 128px);
  overflow-y: scroll;
  padding: 21px;
`;

const LeftSection = styled(Section)`
  padding: 0;
  border-right: 1px solid #eaeaea;
`;

const RightSection = styled(Section)`
  background-color: white;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
  margin-right: 10px;
`;

const CancelButton = styled(Button)``;
