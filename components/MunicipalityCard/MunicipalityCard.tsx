/* /components/MunicipalityCard/MunicipalityCard.tsx */

import { Municipality } from '@/models/interfaces'
import React from 'react'

export default function MunicipalityCard ({id, name, district_name}: Municipality) {

   return <article className="m-2 p-2 bg-yellow-300 hover:bg-yellow-400">
      {name} ({district_name})
      </article>
}
