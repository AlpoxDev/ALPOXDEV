import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// stores
import { observer } from 'mobx-react';
import { MSTProps } from 'stores';
import { AsyncStatus } from 'common/mst';

// components
import { PostCreatePreview, PostCreateTextarea, Button } from 'components';

export const PostCreateContainer = observer(
  ({ store }: MSTProps): JSX.Element => {
    const router = useRouter();

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

      const params = { title: 'createPost test', subtitle: 'subtitle', content };
      postStore.onCreatePost({ params });
    }, [content, createPost.status, postStore.createPost]);

    const onCancel = useCallback(() => {
      setContent('');
    }, [setContent]);

    useEffect(() => {
      if (createPost.status !== AsyncStatus.ready) return;

      router.push(`/posts/${createPost.data?.id}`);
      createPost.onDefault();
    }, [createPost.status === AsyncStatus.ready]);

    return (
      <PostCreateContainerWrapper>
        <LeftSection>
          <PostCreateTextarea value={content} onChange={onChange} />
          <BottomSection>
            <SaveButton isAuto primary onClick={onCreate}>
              작성{createPost.status === AsyncStatus.pending && '중...'}
            </SaveButton>
            <CancelButton isAuto onClick={onCancel}>
              취소
            </CancelButton>
          </BottomSection>
        </LeftSection>
        <RightSection>
          <PostCreatePreview content={content} />
        </RightSection>
      </PostCreateContainerWrapper>
    );
  },
);

const PostCreateContainerWrapper = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  overflow-y: scroll;

  position: absolute;
  top: 64px;
  left: 0;
  right: 0;

  display: flex;
`;

const Section = styled.section`
  width: 50%;
  height: calc(100vh - 64px);

  overflow-y: scroll;
`;

const LeftSection = styled(Section)`
  border-right: 1px solid #eaeaea;
`;
const RightSection = styled(Section)`
  padding: 21px;
`;

const BottomSection = styled.section`
  width: 100%;
  height: 64px;
  padding: 0 21px;

  display: flex;
  align-items: center;
`;

const SaveButton = styled(Button)`
  margin-left: auto;
  margin-right: 10px;
`;

const CancelButton = styled(Button)``;
