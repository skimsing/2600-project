import "./RenderStory.scss";
export default function RenderStory({ story }) {
  return (
    <div>
      {story ? (
        <div className="story" key={story.id}>
          <div className="story__info">
            <p className="story__title">Title: {story.title}</p>
            <p className="story__genre">Genre: {story.genre}</p>
            <p className="story__date">First Published: {story.publishDate}</p>
            <p className="story__author">Written by: {story.author.username}</p>
          </div>
          <p className="story__body">{story.story}</p>
        </div>
      ) : (
        <div>
          <h3>Oops, no stories found</h3>
        </div>
      )}
    </div>
  );
}
