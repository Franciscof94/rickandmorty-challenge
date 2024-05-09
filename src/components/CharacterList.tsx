'use client'
import React from 'react';
import { Character } from './Character';
import Pagination from './Pagination';

import { SearchBar } from './SearchBar';
import { IResult, IResults } from 'src/interfaces/api-results';

interface Props {
    results: IResults;
    characterNumber: number;
    handleSetCharacter: (character: IResult) => void;
    selectedCharacter: IResult | null;
    handleSetNewData: (listNumber: number | undefined, pageNumber: number, searchValue: string) => void;
}

export const CharacterList = ({ results, characterNumber, handleSetCharacter, selectedCharacter, handleSetNewData }: Props) => {
    return (
        <div>
            <h2 className='text-center font-medium text-2xl mb-4 text-white'>{selectedCharacter ? `${selectedCharacter.name}` : `Character #${characterNumber}`}</h2>
            <div className='flex justify-center my-3 w-full bg-white py-2'>
                <SearchBar
                    onSearch={(searchValue) => handleSetNewData(characterNumber, 0, searchValue)}
                />
            </div>
            <Character
                results={results.results}
                character={characterNumber?.toString()}
                handleSetCharacter={handleSetCharacter}
                selectedCharacter={selectedCharacter}
            />
            <Pagination
                next={results?.info?.next}
                prev={results?.info?.prev}
                currentPage={1}
                totalPages={results?.info?.pages}
                handleSetNewData={handleSetNewData}
                listNumber={characterNumber}
            />
        </div>
    );
}
