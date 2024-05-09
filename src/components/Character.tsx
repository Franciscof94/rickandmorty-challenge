'use client'

import Image from 'next/image';
import React from 'react';
import { Status } from './Status';
import { IResult } from 'src/interfaces/api-results';

interface Props {
  results: IResult[];
  character: string;
  handleSetCharacter: (character: IResult, characterNumber: number) => void;
  selectedCharacter: IResult | null;
}

export const Character = ({ results, character, handleSetCharacter, selectedCharacter }: Props) => {
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        {results?.map((result) => (
          <div
            key={result.id}
            className={`flex flex-col items-center rounded cursor-pointer shadow-2xl ${selectedCharacter?.id === result.id ? 'bg-brown-20' : 'bg-white'}`}
            onClick={() => handleSetCharacter(result, parseInt(character))}
          >
            <div className=''>
              <Image
                src={result.image}
                alt='character'
                width={85}
                height={85}
                className=' border-black'
              />
            </div>
            <div className={`px-1 mb-3 ${selectedCharacter?.id === result.id ? 'text-white' : 'text-black'}`}>
              <div className=''>
                <div>
                  <h3
                    className='text-center text-lg font-bold'
                    title={result.name.length > 15 ? result.name : undefined}
                  >
                    {result.name}
                  </h3>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Status status={result.status} className='h-2 w-2 mx-1' />
                <p title={result.species.length > 10 ? result.species : undefined} className='text-center font-medium'>{result.status} - {result.species.length > 10
                  ? result.species.substring(0, 8) + '..'
                  : result.species}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
