import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {cFilter} from "../../lib/cf.js";

export default async function Home() {
  const ratings = [
    [1, 1, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 0],
  ];

  const user1=cFilter(ratings,1);
  const user2=cFilter(ratings,2);
  const user3=cFilter(ratings,3);
  const user4=cFilter(ratings,4);


  return (
    <main className="flex flex-col md:flex-row min-h-screen justify-center items-center bg-black gap-12 p-10">
      <div className="-translate-y-10 flex flex-col flex-1 justify-end md:items-end gap-3">
        <h1 className="md:flex-1 justify-center flex text-3xl font-medium">
          Player
        </h1>
        <div className="flex flex-col">
          <Link
            className="items-center justify-center md:justify-end gap-2 flex-1 flex text-lg hover:text-white/80 text-white/90"
            href="/livepeer/player/livestream"
          >
            <span>Play a livestream</span> <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link
            className="items-center justify-center md:justify-end gap-2 flex-1 flex text-lg hover:text-white/80 text-white/90"
            href="/livepeer/player/asset-short"
          >
            <span>Play a wholesome video</span> <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link
            className="items-center justify-center md:justify-end gap-2 flex-1 flex text-lg hover:text-white/80 text-white/90"
            href="/livepeer/player/asset-long"
          >
            <span>Play a degen video</span> <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link
            className="items-center justify-center md:justify-end gap-2 flex-1 flex text-lg hover:text-white/80 text-white/90"
            href="/livepeer/player/bad-account"
          >
            <span>Play a scam video</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link
            className="items-center justify-center md:justify-end gap-2 flex-1 flex text-lg hover:text-white/80 text-white/90"
            href="/livepeer/player/jwt"
          >
            <span>Play a JWT-protected Disney video</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <span className="w-full h-px md:h-[600px] md:w-px -rotate-[30deg] md:rotate-[35deg] bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/80 to-transparent" />
      <div className="translate-y-10 flex flex-col flex-1 items-start gap-3">
        <h1 className="md:flex-1 flex text-3xl font-medium">Collaborative Filtering Recommendations Engine</h1>
Given ratings = [
  [1, 1, 0, 0, 1],
  [1, 1, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 1, 1, 0],
];
          <span>Recommended Video for user 1 is {user1[0]+1}</span>
          <span>Recommended Video for user 2 is {user2[0]+1}</span>
          <span>Recommended Video for user 3 is {user3[0]+1}</span>
          <span>Recommended Video for user 4 is {user4[0]+1}</span>
      </div>
    </main>
  );
}
