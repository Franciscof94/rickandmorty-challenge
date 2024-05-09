
import React, { useEffect, useMemo, useState } from 'react';
import { IResult } from 'src/interfaces/api-results';

interface Props {
  character: {
    characterOne: IResult | null;
    characterTwo: IResult | null;
  };
}

const EpisodeList = ({ title, episodes }: { title: string; episodes: any[] }) => (
  <div className="w-full md:w-1/3 px-2 my-2">
    <div className="bg-gray-200 border border-black p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <div className="mt-2">
        {episodes.map((episode: any, index: number) => (
          <div key={index} className={`text-sm text-gray-700 ${index !== 0 ? 'border-t border-gray-500 pt-2' : ''}`}>
            <div>
              {episode.name} - {episode.air_date}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);


export const EpisodesContainer = ({ character }: Props) => {
  const [episodesCharacterOne, setEpisodesCharacterOne] = useState([]);
  const [episodesCharacterTwo, setEpisodesCharacterTwo] = useState([]);
  const [sharedEpisodes, setSharedEpisodes] = useState([]);

  const fetchData = useMemo(
    () => async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
    },
    []
  );

  const fetchEpisodesForCharacter = async (character: IResult | null, setEpisodes: Function) => {
    if (character) {
      const episodes = await Promise.all(
        character.episode.map((url: string) => fetchData(url))
      );
      setEpisodes(episodes);
    }
  };

  useEffect(() => {
    fetchEpisodesForCharacter(character.characterOne, setEpisodesCharacterOne);
  }, [character.characterOne, fetchData]);

  useEffect(() => {
    fetchEpisodesForCharacter(character.characterTwo, setEpisodesCharacterTwo);
  }, [character.characterTwo, fetchData]);

  useEffect(() => {
    if (episodesCharacterOne.length > 0 && episodesCharacterTwo.length > 0) {
      const shared = episodesCharacterOne.filter((episode: any) =>
        episodesCharacterTwo.some((e: any) => e.id === episode.id)
      );
      setSharedEpisodes(shared);
    }
  }, [episodesCharacterOne, episodesCharacterTwo]);

  return (
    <div className="flex flex-wrap justify-center">
      <EpisodeList title="Character #1 - Only Episodes" episodes={episodesCharacterOne} />
      <EpisodeList title="Shared Episodes" episodes={sharedEpisodes} />
      <EpisodeList title="Character #2 - Only Episodes" episodes={episodesCharacterTwo} />
    </div>
  );
};
