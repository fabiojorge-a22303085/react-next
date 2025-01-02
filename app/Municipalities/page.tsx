'use client'

import React from 'react'
import useSWR from 'swr'
import { Municipality } from '@/models/interfaces'
import MunicipalityCard from '@/components/MunicipalityCard/MunicipalityCard'

export default function page() {
    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR<Municipality[], Error> ('api/municipalities', fetcher)

    if (error) return <div>Error loading data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No data!</div>

    return <section className="overflow-auto h-full">
        <h1 className="text-4xl font-bold text-center mb-8">Municipios</h1>
        { data.map( m => 
        <MunicipalityCard
        id={m.id}
        name={m.name}
        district_name={m.district_name}
        />
        )}
    </section>
}
