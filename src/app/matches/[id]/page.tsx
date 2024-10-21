"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Image from 'next/image';
import Link from 'next/link';

interface MatchDetail {
  _id: string;
  description: string;
  format: string;
  type: string;
  complete: boolean;
  venue: string;
  date: string;
  time: string;
  seriesName: string;
  team1: string;
  team2: string;
  score?: string;
  team1Details: PlayerDetail[];
  team2Details: PlayerDetail[];
  winningTeam:string;
  status:string;
  playersOfTheMatch:playersOfTheMatch;
  umpire1:string;
  umpire2:string;
  umpire3:string;
}

interface PlayerDetail {
    id: number;
    name: string;
    fullName: string;
    nickName: string;
    captain: boolean;
    role: string;
    keeper: boolean;
    substitute: boolean;
    teamId: number;
    battingStyle: string;
    bowlingStyle: string;
    teamName: string;
    faceImageId: number;
    playingXIChange: string;
  }

  interface playersOfTheMatch {
    id:number;
    name:string;
    fullName:string;
  }

const MatchDetails: React.FC = () => {
  const { id } = useParams();
  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatchDetails = async () => {
    if (!id) return;

    try {
      const response = await fetch(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}`, {
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY as string,
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch match details.');
      }

      const data = await response.json();

      const matchInfo = data?.matchInfo;


      if (!matchInfo) {
        throw new Error('Match info is missing from the response.');
      }

      const venueInfo = matchInfo.venueInfo || {};
      const matchDetail: MatchDetail = {
        _id: matchInfo.matchId?.toString() || '',
        description: matchInfo.matchDescription || 'N/A',
        format: matchInfo.matchFormat || 'N/A',
        type: matchInfo.matchType || 'N/A',
        complete: matchInfo.result?.resultType || 'Waiting',
        winningTeam: matchInfo.result?.winningTeam || 'To Be Announced',
        venue: matchInfo.venue.name || 'Unknown Ground',
        date: matchInfo.matchStartTimestamp ? new Date(matchInfo.matchStartTimestamp).toLocaleDateString('en-GB') : 'Invalid Date',
        time: matchInfo.matchStartTimestamp ? new Date(matchInfo.matchStartTimestamp).toLocaleTimeString('en-GB', {
          timeZone: venueInfo.timezone || 'UTC',
        }) : 'Invalid Time',
        seriesName: matchInfo.series.name || 'N/A',
        team1: matchInfo.team1?.name || 'N/A',
        team2: matchInfo.team2?.name || 'N/A',
        team1Details: matchInfo.team1?.playerDetails || [],
  team2Details: matchInfo.team2?.playerDetails || [],
  status:matchInfo.status || 'N/A',
  playersOfTheMatch:matchInfo.playersOfTheMatch?.name || [],
  umpire1: matchInfo.umpire1?.name || 'N/A',
  umpire2: matchInfo.umpire2?.name || 'N/A',
  umpire3: matchInfo.umpire3?.name || 'N/A',
      };

      setMatch(matchDetail);

    } catch (error: any) {
      console.error('Error fetching match details:', error);
      setError(error.message || 'Failed to load match details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
  }, [id]);

  return (
    <>
    {loading ? (
        <div className="text-center">Loading match details...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : match ? (
        <>
    <div className='relative h-[40vh] flex flex-col justify-between'>
    <NavBar />
    <div className="bg-black/40 h-full w-full absolute top-0 left-0 -z-10"></div>
    <Image
    src={'/std1.jpg'}
    alt='Upcoming'
    width={1512}
    height={928}
    className='w-full h-full object-cover opacity-85 absolute top-0 -z-20 '/>
    <h1 className='text-6xl text-white tracking-tighter px-16 mb-20 font-medium'>{match.seriesName}</h1>
  </div>
  <div className='px-12 mt-10'>
    <button className='bg-red-500 px-4 animate-pulse'>
        Live Match
    </button>
  </div>
  <div className='px-14 mb-10'>
    <div className="gap-10 flex mt-10">
        <section className="max-w-full">
          <div className="text-black flex flex-col gap-4 mt-10">
            <h1 className='font-semibold text-6xl tracking-tight'>{match.seriesName}</h1>
            <h6 className='text-xl font-light tracking-tight'>{match.description}</h6>
          </div>
          <div className="text-black flex gap-4 mt-10">
            <h1 className='text-xl font-bold tracking-tight '>Result: <span className='font-normal normal-case text-red-400'>{match.complete}</span></h1>
            <h6 className='text-xl tracking-tight font-bold'>Winning Team : <span className='font-normal'>{match.winningTeam}</span></h6>
          </div>
          <ul className='text-black flex justify-between py-8'>
            <ol className="flex gap-10 items-center justify-center">
              <li className="flex flex-col">
                <p className='text-3xl font-thin'>{`${match.team1} vs ${match.team2}`}</p>
                <span className='text-sm font-bold'>Team</span>
              </li>
              <li className="flex flex-col">
                <p className='text-3xl font-thin'>{match.date}</p>
                <span className='text-sm font-bold'>Date</span>
              </li>
              <li className="flex flex-col">
                <p className='text-3xl font-thin'>{match.type}</p>
                <span className='text-sm font-bold'>Type</span>
              </li>
            </ol>
          </ul>
          <div className='LiveScore'>
  <h1 className='pt-8 pb-4 text-3xl font-bold tracking-tighter text-black'>Live Score</h1>
  <hr className='mb-10'/>

  <table className='min-w-full divide-y divide-gray-200'>
    <thead className='bg-gray-100'>
      <tr>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{match.team1}</th>
        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{match.team2}</th>
      </tr>
    </thead>
    <tbody className='bg-white divide-y divide-gray-200'>
      <tr>
        <td className='px-6 py-4 whitespace-nowrap text-heading text-base tracking-tight'>Score</td>
        <td className='px-6 py-4 whitespace-nowrap text-heading text-base tracking-tight'>{match.team1}</td>
        <td className='px-6 py-4 whitespace-nowrap text-heading text-base tracking-tight'>{match.team2}</td>
      </tr>
    </tbody>
  </table>
</div>


          <h1 className='text-black pt-8 pb-4 text-3xl font-bold tracking-tighter'>Teams</h1>
          <hr className='mb-10'/>

          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{match.team1}</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>{match.team2}</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
  {match.team1Details.map((player, index) => (
    <tr key={index}>
      <td className='px-6 py-4 whitespace-nowrap text-heading text-base tracking-tight'>{index + 1}</td>
      <td className='px-6 py-4 whitespace-nowrap text-heading text-base tracking-tight'>{player.fullName}</td>
      <td className='px-6 py-4 whitespace-nowrap text-heading text-base tracking-tight'>
        {match.team2Details[index]?.fullName || '-'}
      </td>
    </tr>
  ))}
</tbody>

          </table>

          {/* Series Section */}
          <h1 className='text-black pt-8 pb-4 text-3xl font-bold tracking-tighter'>Series Info</h1>
          <hr className='mb-10'/>
          <ul className='text-black flex justify-between py-8'>
            <ol className="flex gap-10 items-center justify-center">
              <li className="flex flex-col">
                <p className='text-3xl font-thin'>{match.venue}</p>
                <span className='text-sm font-bold'>Venue</span>
              </li>
              <li className="flex flex-col">
                <p className='text-3xl font-thin'>{match.status}</p>
                <span className='text-sm font-bold'>Status</span>
              </li>
            </ol>
          </ul>

          {/* Umpire Section */}
          <h1 className='text-black pt-8 pb-4 text-3xl font-bold tracking-tighter'>Umpire</h1>
          <hr className='mb-10'/>
          <div className="text-black flex gap-4 mt-10">
            <h1 className='text-xl font-bold tracking-tight '>Name: <span className='font-normal uppercase'>{match.umpire1}</span></h1>
            <h1 className='text-xl font-bold tracking-tight '>Name: <span className='font-normal uppercase'>{match.umpire2}</span></h1>
            <h1 className='text-xl font-bold tracking-tight '>Name: <span className='font-normal uppercase'>{match.umpire3}</span></h1>
          </div>
        </section>
      </div>
  </div>
  </>
 ) : (
    <div className="text-center text-gray-500">No match details available.</div>
  )}
  </>
  );
};

export default MatchDetails;
