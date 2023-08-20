import React from 'react';
import SinglePost from './SinglePost';

export default function PostSection({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <SinglePost post={post} key={post.id} />
            ))}
        </div>
    );
}
