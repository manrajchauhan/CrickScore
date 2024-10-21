"use client";
import { MoveRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Match {
  _id: string;
  date: string;
  venue: string;
  time: string;
  seriesName: string;
  team1: string;
  team2: string;
}

const HeroBottom: React.FC = () => {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingMatch = async () => {
    try {
      const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international', {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch match data.');
      }

      const data = await response.json();

      const upcomingMatches = Array.isArray(data.matchScheduleMap)
        ? data.matchScheduleMap.flatMap((scheduleItem: any) => {
            if (
              scheduleItem?.scheduleAdWrapper &&
              Array.isArray(scheduleItem.scheduleAdWrapper.matchScheduleList)
            ) {
              return scheduleItem.scheduleAdWrapper.matchScheduleList.flatMap(
                (matchItem: any) =>
                  Array.isArray(matchItem.matchInfo)
                    ? matchItem.matchInfo.map((match: any) => ({
                        _id: match.matchId.toString(),
                        date: scheduleItem.scheduleAdWrapper.date,
                        venue: `${match.venueInfo.ground}, ${match.venueInfo.city}`,
                        time: new Date(parseInt(match.startDate)).toLocaleTimeString('en-GB', {
                          timeZone: match.venueInfo.timezone,
                        }),
                        seriesName: matchItem.seriesName,
                        team1: match.team1.teamName,
                        team2: match.team2.teamName,
                      }))
                    : []
              );
            } else {
              return [];
            }
          })
        : [];

      setMatch(upcomingMatches[0] || null);
      setLoading(false);
    } catch (error) {
      setError('Failed to load match data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMatch();
  }, []);

  return (
    <div className='hero'>
      <div className="px-14 text-white flex flex-col gap-4 pb-16">
        {loading ? (
          <h1 className='font-extrabold text-[40px]'>Loading...</h1>
        ) : error ? (
          <h1 className='font-extrabold text-[40px] text-red-500'>{error}</h1>
        ) : match ? (
          <>
            <h1 className='font-extrabold text-[80px] tracking-tighter'>Match Line-Up</h1>
            <h1 className='font-medium text-[40px] tracking-tighter'>{match.seriesName}</h1>
            <div className='flex flex-1 gap-4'>
              <h1 className='text-2xl font-bold'>{match.team1}</h1>
              <h1 className='text-2xl'>VS</h1>
              <h1 className='text-2xl font-bold'>{match.team2}</h1>
            </div>
            <p><span className='text-lg font-bold'>Date:</span> {match.date}</p>
            <p><span className='text-lg font-bold'>Venue:</span> {match.venue}</p>
            <a href='/recent' className='border border-white duration-200 p-5 w-fit hover:bg-white/80 bg-white text-lg rounded-md flex gap-2 text-black tracking-tighter mt-10'>
              Upcoming Matches <MoveRight />
            </a>
          </>
        ) : (
          <h1 className='font-extrabold text-[40px]'>No upcoming matches available.</h1>
        )}
      </div>
    </div>
  );
};

export default HeroBottom;
