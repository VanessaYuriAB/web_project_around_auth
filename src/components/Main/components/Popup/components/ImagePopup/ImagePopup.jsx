function ImagePopup({ card }) {
  const { name, link } = card;

  return (
    <figure className="figure popup__figure_card">
      <img className="image popup__image_card" src={link} alt={name} />
      <figcaption className="caption popup__caption_card">{name}</figcaption>
    </figure>
  );
}

export default ImagePopup;
