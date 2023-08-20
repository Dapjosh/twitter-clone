import React, { useRef } from 'react';
import { AiOutlineSend } from '../../constant/icons';

export default function CommentInput({ reply }) {
    const textRef = useRef(null);
    const handleChange = () => {
        textRef.current.style.height = 'auto';
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    };
    return (
        <div className="flex items-start gap-3">
            <div>
                <img
                    src="https://source.unsplash.com/84E44EdD18o"
                    className={` ${reply ? 'w-10 h-10 mt-[4.2px]' : 'w-12 h-12'} rounded-full`}
                    alt="d"
                />
            </div>
            <div className="flex flex-1 items-center mt-[3px] rounded-xl">
                <textarea
                    name="comment"
                    id="comment"
                    rows="1"
                    onChange={handleChange}
                    ref={textRef}
                    className="text-sm rounded-xl flex-1 bg-gray-100 resize-none py-3 px-3"
                    placeholder="Add a comment"
                />
                <AiOutlineSend className="mx-2 cursor-pointer" fontSize={23} />
            </div>
        </div>
    );
}
