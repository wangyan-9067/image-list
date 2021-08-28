import React from 'react'
import { IImage } from '../types';

export function ImageContainer({id, url, saved, handler}: { id: string, url: string, saved: boolean, handler: (image: IImage) => void }) {
  return (
    <div>
      <button onClick={() => handler({id, url})}>{ saved ? "delete" : "save"}</button>
      <img width="100" src={url}/>
    </div>
  )
}