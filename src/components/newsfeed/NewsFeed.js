import React from 'react';
import posts from '../../constant/Posts';
import PostSection from './PostSection';
import TextArea from './Textarea';

export default function NewsFeed() {
    return (
        <div className="mt-2 bg-w relative">
            <TextArea />
            <PostSection posts={posts} />
        </div>
    );
}
