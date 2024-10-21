"use client";
import React, { useEffect, useState } from 'react';
import UpcomingCard from './UpcomingCard';
import Link from 'next/link';

interface Match {
  _id: string;
  date: string;
  venue: string;
  time: string;
  seriesName: string;
  team1: string;
  team2: string;
}

const Upcoming: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
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

      setMatches(upcomingMatches);
      setLoading(false);
    } catch (error) {
      setError('Failed to load matches. Please try again later.');
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div className="Upcoming mt-10">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-neutral-900 mt-6">
        {loading ? (
          <div className="text-center">Loading matches...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No matches available at the moment. Please check back later.</div>
        ) : (
            matches.map((match) => (
                <UpcomingCard
                  key={`${match._id}-${match.date}-${match.team1}-${match.team2}`}
                  date={match.date}
                  venue={match.venue}
                  time={match.time}
                  seriesName={match.seriesName}
                  team1={match.team1}
                  team2={match.team2}
                  link={`/upcoming/matches/${match._id}`}
                />
              ))
        )}
      </main>
    </div>
  );
};

export default Upcoming;
