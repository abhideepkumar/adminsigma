import Image from "next/image";
import Link from "next/link";
import React from "react";
const Event = () => {
  
  return (
    <div className="flex justify-center items-center">
      <Link
        className=" mx-5 p-3 border rounded-md border-blue-500"
        href="/fillevent"
      >
        <div className="flex">
          <Image
            src="/more (1).png"
            className="w-12"
            alt=""
            width={64}
            height={64}
          ></Image>
          <h1 className="p-3">Schedule Events</h1>
        </div>
      </Link>
    </div>
  );
};

export default Event;
