'use client'

import { RecoilRoot } from "recoil"

 
export default function MetadataCard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      
      <RecoilRoot>
      {children}
      </RecoilRoot>
    </>
  )
}