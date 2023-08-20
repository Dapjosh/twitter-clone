import React, { useRef, useState } from 'react';
import { FaPlay } from '../../constant/icons';

export default function Media({ post }) {
    const { img, video, views, thumbnail } = post;
    const [hideThumbnail, setHideThumbnail] = useState(false);
    const videoRef = useRef(null);
    const handleClick = () => {
        videoRef.current.play();
        setHideThumbnail(true);
    };
    return (
        <div>
            {img && (
                <div className="rounded-3xl overflow-hidden mt-3 w-fit">
                    <img src={img} alt="78A265wPiO4" className="max-h-[420px] max-w-[420px]" />
                </div>
            )}
            {video && (
                <>
                    <div className="flex items-start gap-3 justify-between mb-2">
                        <h3 className="font-bold text-xl basis-4/5">
                            This is the video title Lorem ipsum dolor sit amet.
                        </h3>
                        <span className="text-black text-sm mr-1 mt-1">{views} Views</span>
                    </div>
                    <div className="rounded-sm relative min-h-fit overflow-hidden mt-3 w-full">
                        <video controls ref={videoRef} height="100%" width="100%" src={video}>
                            <track kind="captions" />
                        </video>
                        {/* thumbnail */}
                        {!hideThumbnail && (
                            <>
                                <div className="absolute inset-0">
                                    <img src={thumbnail} alt="thumnail" />
                                </div>
                                <div
                                    className="absolute flex items-center justify-center bg-opacity-20 bg-black inset-0 z-[4]"
                                    onClick={handleClick}
                                >
                                    <div className="bg-black grid place-content-center bg-opacity-30 rounded-full h-20 w-20">
                                        <FaPlay fontSize={30} color="white" className="mr-[-5px]" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
