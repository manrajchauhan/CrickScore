import Link from 'next/link';
import React from 'react';

interface LiveMatchCards {
  date: string;
  venue: string;
  time: string;
  seriesName: string;
  team1: string;
  team2: string;
  link: string;
  Team1ScoreRES:string;
  Team2ScoreRES:string;
  Team1Over:string;
  Team2Over:string;
}

const LiveMatches: React.FC<LiveMatchCards> = ({
  date,
  venue,
  time,
  seriesName,
  team1,
  team2,
  Team1ScoreRES,
  Team2ScoreRES,
  Team1Over,
  Team2Over,
  link
}) => {
  return (
    <section className="gap-10">
      <div>
        <div className="border overflow-hidden rounded-[20px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="w-full p-2 mt-2 text-headingchild">
            <h1 className="text-neutral-800 font-semibold text-[20px] tracking-tighter">
              {seriesName}
            </h1>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[18px] font-normal text-black">
                {team1} VS {team2}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
            <ul className="mt-4">
              <li className="text-neutral-600 text-[16px]"><span className='font-bold'>{team1}: </span>{Team1ScoreRES} - <span className='font-bold'>({Team1Over}) Overs</span></li>
              <li className="text-neutral-600 text-[16px]"><span className='font-bold'>{team2}:</span> {Team2ScoreRES} - <span className='font-bold'>({Team2Over}) Overs</span></li>
            </ul>
            </div>
            <ul className="mt-4">
              <li className="text-neutral-600 text-[16px]">📅 Date: {date}</li>
              <li className="text-neutral-600 text-[16px]">🕒 Time: {time} IST</li>
              <li className="text-neutral-600 text-[16px]">📍 Venue: {venue}</li>
            </ul>
            <div className="mt-6">
              <Link
                href={link}
                className="border px-4 py-2 rounded-[8px] text-black hover:bg-neutral-100 transition-colors duration-150"
                aria-label={`View details for ${team1} vs ${team2}`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
