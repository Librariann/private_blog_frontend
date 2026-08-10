type EditorialPageHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
};

export function EditorialPageHeading({
  index,
  eyebrow,
  title,
  description,
  meta,
}: EditorialPageHeadingProps) {
  return (
    <header className="editorial-page-heading">
      <div className="editorial-page-index" aria-hidden="true">
        {index}
      </div>
      <div className="editorial-page-heading-copy">
        <span className="editorial-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {meta && <span className="editorial-page-heading-meta">{meta}</span>}
    </header>
  );
}
