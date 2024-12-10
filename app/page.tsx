import React from 'react'
import Link from "next/link";

export default function page() {
  return <>
  <h1>React and Next.js</h1>
  <p>Bem vindo à minha App em React e Next.js,
  das tecnologias web mais usadas nos dias de hoje</p>
  <Link href="/produtos/page">produtos</Link>
  <Link href="/tecnologias/page">tecnologias</Link>
  </>
}
