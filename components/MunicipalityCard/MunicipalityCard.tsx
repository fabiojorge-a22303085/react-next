/* /components/MunicipalityCard/MunicipalityCard.tsx */

import { Municipality } from '@/models/interfaces'
import React from 'react'

export default function MunicipalityCard

({id, district_name, name}: Municipality) {
   return <div>{name} ({district_name})</div>
}
