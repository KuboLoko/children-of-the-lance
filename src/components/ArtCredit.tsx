/**
 * Small caption placed directly beneath an image to credit its artist.
 *
 * Required whenever we show official Dragonlance artwork or any art we did not
 * make ourselves. Renders nothing if no artist is given.
 *
 * @param label Localised word for "Artwork" (defaults to English).
 */
export function ArtCredit({
  artist,
  label = "Artwork",
}: {
  artist: string | null | undefined;
  label?: string;
}) {
  if (!artist) return null;
  return (
    <span className="cotl-credit">
      {label}: {artist}
    </span>
  );
}
