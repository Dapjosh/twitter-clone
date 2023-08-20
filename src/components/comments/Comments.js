import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoreHorizontal, MdOutlineReportProblem } from '../../constant/icons';
import Replies from './Replies';

export default function Comments() {
    const [showMore, setShowMore] = useState(false);
    const [toggleReply, setToggleReply] = useState(false);
    const handleMore = () => {
        setShowMore(() => !showMore);
    };

    return (
        <div className="my-5 pt-4 border-t-[.5px] border-gray-300">
            <div className="flex items-start gap-3">
                <div>
                    <img
                        src="https://source.unsplash.com/ZHvM3XIOHoE"
                        className="w-12 h-12 rounded-full"
                        alt="d"
                    />
                </div>
                <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg mt-[3px] pt-2 px-3 pb-3">
                        {/* user header */}
                        <div className="flex items-center justify-between pt-1">
                            {/* name and username */}
                            <Link to="/users" className="flex items-center gap-1 mb-2 ">
                                <h2 className="font-semibold text-sm hover:underline">
                                    Zahid Hasan
                                </h2>
                                <p className="text-gray-500 text-xs">
                                    <span className="px-1"> · </span> 2h ago
                                </p>
                            </Link>

                            <div className="flex mt-[-10px] items-center gap-2 group relative cursor-pointer">
                                <div
                                    className="ml-auto p-2 hover:bg-gray-100 grid place-content-center rounded-full"
                                    onClick={handleMore}
                                >
                                    <FiMoreHorizontal fontSize={23} />
                                </div>
                                <div
                                    className={`absolute z-[5] top-full min-w-[150px] right-0 ${
                                        showMore ? 'flex opacity-100' : 'hidden opacity-0'
                                    } flex-col  bg-white shadow-sm shadow-gray-300 opacity-1`}
                                >
                                    {/* <div className="w-max rounded-sm hover:bg-gray-100 px-2 py-[7px] min-w-full ">
                                        <Link to className="text-black text-sm">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <AiOutlinePushpin fontSize={22} />
                                                </div>
                                                Pin
                                            </div>
                                        </Link>
                                    </div> */}
                                    <div className="w-max rounded-sm hover:bg-gray-100 px-2 py-[7px] min-w-full ">
                                        <Link to className="text-black text-sm">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <MdOutlineReportProblem fontSize={20} />
                                                </div>
                                                Report tweet
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm mt-1">
                            This is comment Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Possimus, id!
                        </p>
                    </div>
                    <div className="text-xs flex items-center gap-3 mt-2 font-semibold text-gray-600">
                        <button
                            type="button"
                            className="hover:bg-gray-100 rounded-sm px-1 py-[.5px]"
                        >
                            like
                        </button>
                        <button
                            type="button"
                            onClick={() => setToggleReply(!toggleReply)}
                            className="hover:bg-gray-100 rounded-sm px-1 py-[.5px]"
                        >
                            Reply
                        </button>
                        <span>·</span>
                        <p className="font-normal">1 Reply</p>
                    </div>

                    {/* reply */}
                    <Replies toggle={toggleReply} />
                    <Replies />
                </div>
            </div>
        </div>
    );
}