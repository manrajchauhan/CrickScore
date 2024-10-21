"use client";
import React, { useEffect, useState } from 'react';
import RecentCard from './RecentCard';

interface Match {
  _id: string;
  date: string;
  venue: string;
  time: string;
  seriesName: string;
  team1: string;
  team2: string;
}

const RecentMatch: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent', {
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

      const recentMatches = data.typeMatches
        .flatMap((typeMatch: any) =>
          typeMatch.seriesMatches.flatMap((series: any) => {
            const seriesWrapper = series.seriesAdWrapper || {};
            const matches = seriesWrapper.matches || [];
            return matches.map((matchItem: any) => {
              const matchInfo = matchItem.matchInfo;
              const venueInfo = matchInfo.venueInfo || {};

              return {
                _id: matchInfo.matchId.toString(),
                date: new Date(parseInt(matchInfo.startDate)).toLocaleDateString('en-GB'),
                venue: `${venueInfo.ground}, ${venueInfo.city}`,
                time: new Date(parseInt(matchInfo.startDate)).toLocaleTimeString('en-GB', {
                  timeZone: venueInfo.timezone,
                }),
                seriesName: matchInfo.seriesName,
                team1: matchInfo.team1.teamName,
                team2: matchInfo.team2.teamName,
              };
            });
          })
        )
        .filter((match: any) => match);

      setMatches(recentMatches);
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
    <div className="Recent mt-10">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-neutral-900 mt-6">
        {loading ? (
          <div className="text-center">Loading matches...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No recent matches available at the moment. Please check back later.</div>
        ) : (
          matches.map((match) => (
            <RecentCard
              key={`${match._id}-${match.date}-${match.team1}-${match.team2}`}
              date={match.date}
              venue={match.venue}
              time={match.time}
              seriesName={match.seriesName}
              team1={match.team1}
              team2={match.team2}
              link={`/recent/matches/${match._id}`}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default RecentMatch;
