'use client'
import React, { useState } from 'react';

import { EpisodesContainer } from './EpisodesContainer';
import { CharacterList } from './CharacterList';

import Image from 'next/image';
import LogoImage from '../images/Logo.png'
import { getCharacter } from 'src/actions/getCharacter';
import { IResult, IResults } from 'src/interfaces/api-results';

interface Props {
    data: IResults;
}

export const Results = ({ data }: Props) => {
    const [resultListOne, setResultListOne] = useState<IResults>(data)
    const [resultListTwo, setResultListTwo] = useState<IResults>(data)
    const [characterOneSelected, setCharacterOneSelected] = useState<IResult | null>(null);
    const [characterTwoSelected, setCharacterTwoSelected] = useState<IResult | null>(null);

    const handleSetCharacterOne = (character: IResult) => {
        if (character?.id === characterTwoSelected?.id) return
        setCharacterOneSelected(character);
    };

    const handleSetCharacterTwo = (character: IResult) => {
        if (character?.id === characterOneSelected?.id) return
        setCharacterTwoSelected(character);
    };

    const handleSetNewData = async (listNumber: number | undefined, pageNumber: number, searchValue: string = '') => {

        try {
            const result = await getCharacter(pageNumber || 1, searchValue?.toLowerCase());

            if (listNumber === 1) {
                setResultListOne(result);
            } else if (listNumber === 2) {
                setResultListTwo(result);
            }
        } catch (error) {
            console.error("Error fetching character data:", error);
        }
    };

    return (
        <div className='flex flex-col p-4'>
            <div
                className='flex justify-center my-6'
            >
                <Image
                    src={LogoImage}
                    width={300}
                    height={300}
                    alt="logo"
                />
            </div>
            <div className='flex justify-center mb-10 flex-col sm:flex-row'>
                <div className='w-full sm:w-1/2 pr-2'>
                    <CharacterList
                        results={resultListOne}
                        characterNumber={1}
                        handleSetCharacter={handleSetCharacterOne}
                        selectedCharacter={characterOneSelected}
                        handleSetNewData={handleSetNewData}
                    />
                </div>
                <div className='w-full sm:w-1/2 pl-2'>
                    <CharacterList
                        results={resultListTwo}
                        characterNumber={2}
                        handleSetCharacter={handleSetCharacterTwo}
                        selectedCharacter={characterTwoSelected}
                        handleSetNewData={handleSetNewData}
                    />
                </div>
            </div>
            <EpisodesContainer
                character={{ characterOne: characterOneSelected, characterTwo: characterTwoSelected }}
            />
        </div>
    );
};
