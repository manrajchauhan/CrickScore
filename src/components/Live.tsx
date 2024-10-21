"use client";
import React, { useEffect, useState } from 'react';
import LiveMatches from './LiveMatches';

interface Match {
  _id: string;
  date: string;
  venue: string;
  time: string;
  seriesName: string;
  team1: string;
  team2: string;
  Team1ScoreRES: string;
  Team2ScoreRES: string;
  Team1Over: string;
  Team2Over: string;
}

const Live: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      const response = await fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live', {
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

      const LiveMatches = data.typeMatches
        .flatMap((typeMatch: any) =>
          typeMatch.seriesMatches.flatMap((series: any) => {
            const seriesWrapper = series.seriesAdWrapper || {};
            const matches = seriesWrapper.matches || [];

            return matches.map((matchItem: any) => {
              const matchInfo = matchItem.matchInfo;
              const venueInfo = matchInfo.venueInfo || {};

              const matchResult1 = matchItem.matchScore?.team1Score?.inngs1?.runs ?? '-';
              const matchResult2 = matchItem.matchScore?.team2Score?.inngs1?.runs ?? '-';
              const MatchOverTeam1 = matchItem.matchScore?.team1Score?.inngs1?.overs ?? '-';
              const MatchOverTeam2 = matchItem.matchScore?.team2Score?.inngs1?.overs ?? '-';

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
                Team1ScoreRES: matchResult1,
                Team2ScoreRES: matchResult2,
                Team1Over: MatchOverTeam1,
                Team2Over: MatchOverTeam2,
              };
            });
          })
        )
        .filter((match: any) => match);

      setMatches(LiveMatches);
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
    <div className="Live mt-10">
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-neutral-900 mt-6">
        {loading ? (
          <div className="text-center">Loading matches...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : matches.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No recent matches available at the moment. Please check back later.</div>
        ) : (
          matches.map((match) => (
            <LiveMatches
              key={match._id}
              Team1ScoreRES={match.Team1ScoreRES}
              Team2ScoreRES={match.Team2ScoreRES}
              Team1Over={match.Team1Over}
              Team2Over={match.Team2Over}
              date={match.date}
              venue={match.venue}
              time={match.time}
              seriesName={match.seriesName}
              team1={match.team1}
              team2={match.team2}
              link={`/matches/${match._id}`}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Live;
