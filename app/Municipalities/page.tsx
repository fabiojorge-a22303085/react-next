/* app/municipalities/page.tsx */ 

'use client'
import React from 'react';
import { Municipality } from '@/models/interfaces';
import MunicipalityCard from '@/ProductC/MunicipalityCard/MunicipalityCard';

export default function Municipalities() {

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data: municipalities, error, isLoading } = useSWR<Municipality[], Error>('/api/municipalities');
    
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!municipalities) return <div>No data available</div>;

    return <>
        {municipalities.map((municipality: { id: any; name: any; district_name: any; }) => (
            <MunicipalityCard 
                key={municipality.id} 
                id={municipality.id}
                name={municipality.name}
                district_name={municipality.district_name}
            />
        ))}
    </>
}

function useSWR<T, U>(arg0: string): { data: any; error: any; isLoading: any; } {
    throw new Error('Function not implemented.');
}
