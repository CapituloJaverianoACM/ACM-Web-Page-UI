"use client";

import { useEffect, useState } from 'react';
import { Contributor } from '@/models/contributor.model';
import { getContributors } from '@/controllers/contributor.controller';
import Image from 'next/image';

export default function Contributors() {

    const [contributors, setContributors] = useState<Contributor[]>([]);

    useEffect(() => {
        const fetchContributors = async () => {
            const data = await getContributors();
            setContributors(data);
        };

        fetchContributors();
    }, []);

  return (
    <div
            id="contributors"
            className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <div className="text-center space-x-4 mb-10">
                <h4 className="inline dark:text-white">Contribuyen con este proyecto</h4>
                <span className='dark:text-white font-sans text-semibold bg-gray-400 rounded px-3 py-1'>{contributors.length}</span>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-8">
                {
                  contributors?.map((contributor) => (
                    <a 
                      key={contributor._id}
                      href={contributor.github}
                    >
                      <Image
                        src={contributor.image}
                        alt={`Avatar de ${contributor.name}`}
                        width={48}
                        height={48}
                        className='rounded-full border-1 border-black/20 dark:border-white/20'
                      />
                    </a>
                      
                  ) )
                }
            </div>
        </div>
  )
}
