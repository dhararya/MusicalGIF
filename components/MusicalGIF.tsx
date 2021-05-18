import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from 'react-player/soundcloud';
import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { Gif } from "@giphy/react-components";
import { useAsync } from "react-async-hook";

const useStyles = makeStyles({
  root: {
    margin: "1.5rem 1.5rem"
  }
});

const sounds = ["https://soundcloud.com/shadowlegionary/nyan-cat", "https://soundcloud.com/hampsterdancemasters/the-hamster-dance-song",
"https://soundcloud.com/tayzonday/chocolate-rain",  "https://soundcloud.com/tayzonday/chocolate-rain", "https://soundcloud.com/thepopposse/never-gonna-give-you-up",
"https://soundcloud.com/thepopposse/never-gonna-give-you-up", "https://soundcloud.com/thepopposse/never-gonna-give-you-up",
"https://soundcloud.com/xpriteshx/fatality-mortal-kombat-sound-effect", "https://soundcloud.com/mlg_getrekt/sad-violin-music-mlg-sound-1",
"https://soundcloud.com/tom-m-c/what-are-you-doing-in-my-swamp", 
"https://soundcloud.com/tornupto-12/deja-vu-meme", "https://soundcloud.com/alexis-tapia-najar/run-vine-sound-effect-mp3-1",
"https://soundcloud.com/user-992367524/they-ask-you-how-you-areand-youre-not-really-fine-meme", "https://soundcloud.com/blackout-the-gearhead/mr-krabs-astronomia-coffin-dance-meme-4ydngbcnaze",
"https://soundcloud.com/remaings/ladies-and-gentlemen-we-got-em-meme", "https://soundcloud.com/danyal-460888021/cj-gta-ah-shit-here-we-go-again-green-screen",
"https://soundcloud.com/search/sounds?q=windows%20xp%20sound", "https://soundcloud.com/magnus-theil-jensen/fbi-open-up",
"https://soundcloud.com/childish-gambino", "https://soundcloud.com/britarnya/america-fuck-yeah", "https://soundcloud.com/cherrykachu/wide-putin-meme",
"https://soundcloud.com/untamed-spirit/funny-minecraft-villager", "https://soundcloud.com/jeff-jeff-153823913/french-meme-song",
"https://soundcloud.com/user-307209404", "https://soundcloud.com/search?q=coronavirus%20cardib", "https://soundcloud.com/your_text_spoken/hello-darkness-my-old-friend",
"https://soundcloud.com/baauer/harlem-shake", "https://soundcloud.com/search?q=spongebob%20song", "https://soundcloud.com/pawpaw-114353728",
"https://soundcloud.com/search?q=sandstorm", "https://soundcloud.com/kn900/ppap"];

export default function MusicalGIF(props) {
  const classes = useStyles();
  let caption = props.caption;
  const giphyFetch = new GiphyFetch("XIGon8NVdRj2CkMmG1tuAsjsHNjSDVJW");

  function GifDemo() {
    const [gif, setGif] = useState<IGif | null>(null);
    useAsync(async () => {
      const result = await giphyFetch.search(caption, {sort: "relevant", limit: 1});
      const { data } = result.data.length!==0 ? await giphyFetch.gif(String(result.data[0].id)) : await giphyFetch.gif("UoeaPqYrimha6rdTFV");
      setGif(data);
      if (result.data.length===0){
        caption = "No results found!";
      }
    }, []);
    return gif && <Gif gif={gif} width={700} />
  }

  function returnURL(){{
    if (caption==="No results found!"){
      return "https://soundcloud.com/fesstheron/crying-noises-wow"
    } else if (caption==="Musical GIF will never give you up"){
      return "https://soundcloud.com/thepopposse/never-gonna-give-you-up"
    } else {
      return sounds[Math.floor(Math.random()*32)]
    }
  }}

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {GifDemo()}
        <CardContent>
          <Typography variant="body2" color="secondary" component="p">
            {caption}
          </Typography>
        </CardContent>
        <ReactPlayer 
            url= {returnURL()}
            height= {100}
            playing= {true}
            
         />
      </CardActionArea>
    </Card>
  );
}
