export default function SectionBackground({ image, strength = "bg-ink/85" }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url('${encodeURI(image)}')` }}
      />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${strength}`} />
    </>
  );
}
