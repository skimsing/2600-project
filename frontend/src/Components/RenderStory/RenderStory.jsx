export default function RenderStory({story}){
    return(
        <div>
            <div className="story__info">
                <p className="story__title">{story.title}</p>
                <p className="story__genre">{story.genre}</p>
                <p className="story__date">First Published: {story.date}</p>
                <p className="story__author">Written by:</p>
            </div>
            <p className="story__body">{story.story}</p>
        </div>
    )
}