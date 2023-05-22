import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { API_KEY, imageUrl } from '../../constants/constants'
import "./RowPost.css"
import axios from '../../axios'
// import { logDOM } from '@testing-library/react'
function RowPost(props) {
  const [row, setRow] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then((response) => {


      setRow(response.data.results)
    })

  }, [])
  const opts = {
    height: '390',
    width: '100%',
    PlayerVars: {
      autoplay: 1
    },
  };
  const handleMovies = async (id) => {
    console.log(id);
    // const data=await axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
    const data = await axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    // console.log(data.data.results[0].Key);
    // console.log("camed.............");

    if (data.data.results.length !== 0) {


      setUrlId(data.data.results[0])
    } else {
      console.log("Not Found.....");
    }
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          row.map((obj) =>

            <img onClick={() => handleMovies(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + obj.backdrop_path} `} alt="poster" />
          )
        }

      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  )
}

export default RowPost;
