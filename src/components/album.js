import React, {useEffect} from "react"
import { Helmet } from 'react-helmet'
import { siteMetadata } from "../../gatsby-config"
import { usePalette } from 'react-palette'

import AlbumCover from "../components/cover"
import Cursor from "../components/cursor"
import "../styles/album.sass"
import "../styles/global.sass"

export default function Album(props) {

  useEffect(() => {
    const titleClass = document.querySelector("#album-name")
    const titleName = props.name
    const width = window.innerWidth
    if (width < 1600 && width > 550) {
      if (/^\d+$/.test(titleName)) {
        titleClass.style.fontSize = '28vw'
      } else if (!titleName.includes(" ") && !titleName.includes("•")) {
        titleClass.style.fontSize = '13.5vw'
      } else if (titleName.length > 15) {
        titleClass.style.fontSize = '15vw'
      } else {
        titleClass.style.fontSize = '21vw'
      }
    }
    if (width < 550) {
      if (/^\d+$/.test(titleName)) {
        titleClass.style.fontSize = '30vw'
      } else if (!titleName.includes(" ") && !titleName.includes("•")) {
        titleClass.style.fontSize = '20vw'
      } else if (titleName.length > 15) {
        titleClass.style.fontSize = '15vw'
      } else {
        titleClass.style.fontSize = '25vw'
      }
    }
  })

  // primary colors of album cover returned
  const { data, loading, error } = usePalette(props.albumCover)
  // console.log(data.vibrant)
  // console.log(data.muted)
  // console.log(data.lightVibrant)
  // console.log(data.darkVibrant)
  // console.log(data.lightMuted)
  // console.log(data.darkMuted)

  return (
    <Cursor>
      <Helmet>
        <title>{props.year} | {siteMetadata.title}</title>
      </Helmet>

      <section>
        <div className="main-bg" style={{background: `linear-gradient(to right bottom, ${data.lightVibrant}, ${data.darkMuted})`}}></div>

        <div className="album-container">

          <header className="header-container">
            <div className="header-text">
                  {siteMetadata.title}
            </div>

            <div className="header-text">
              {props.year}
            </div>
          </header>
          
          <div className="mobile-upper-group">
            <div className="album-name-container">
              <div id="album-name">
                {props.name.replace("(Deluxe)", "")}
              </div>
            </div>

            <div className="album-description">
             {props.albumDescription}
            </div>
          </div>

          <AlbumCover albumCover={props.albumCover} albumDetail={props.albumDetail} albumName={props.name}/>

          <div className="album-quote">
              {props.quote.split("\n").map((i,key) => {
                  return <div key={key}>{i}</div>;
              })}
          </div>

          <footer className="footer-nav">
              <div>
                {props.artist}
              </div>
              <div className="mobile-nav-tooltip">
                click on either side of the screen to navigate
              </div>
          </footer>

        </div>
      </section>
    </Cursor>
  )
}