import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { fetchImageList } from './api';
import { ImageContainer } from './UI/ImageContainer';
import { IImage } from './types';
import './App.css';

function App() {
  const [list, setList] = useState<IImage[]>([]);
  const [hint, setHint] = useState('');
  const [savedList, setSavedList] = useState<IImage[]>([]);
  const apiKey = useRef('');

  const handleInputChange = async (evt: FormEvent<HTMLInputElement>) => {
    const response = await fetchImageList(apiKey.current, evt.currentTarget.value);
    const result = [];

    for (let i = 0; i < response.data.length; i++) {
      let image = response.data[i];
      result.push({
        id: image.id,
        url: image.images.downsized.url
      })
    }

    setList(result);
  }

  const saveImage = (image: IImage) => {
    let index =savedList.findIndex(imageItem => imageItem.id === image.id);

    if (index < 0) {
      setSavedList(list => [...list, image]);
    }
  }

  const deleteImage = (image: IImage) => {
    let result = savedList.filter(imageItem => imageItem.id !== image.id);
    setSavedList([...result]);
  };


  useEffect(() => {
    const matches = window.location.search.match(/apiKey=(.*)$/);

    if (!matches) {
      setHint('Please add apiKey in url param');
    } else {
      apiKey.current = matches[1];
    }
  }, []);

  return (
    <div className="App">
      { hint ? (<div>{hint}</div>) : (
        <>
          <div className="list-container">
            <input onChange={handleInputChange}></input>
            <div>
            {
              list.map(image => <ImageContainer key={image.id} saved={false} handler={saveImage} {...image}/>)
            }
            </div>
          </div>
          <div className="list-container">
            {
              savedList.map(image => <ImageContainer key={image.id} saved handler={deleteImage} {...image}/>)
            }
          </div>
        </>
      )}
    </div>
  );
}

export default App;
