import type {Triplet} from "../types";

interface Props {
  triplets: Triplet[];
}

export default function TripletList({ triplets }: Props) {
  if (triplets.length === 0) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Triplets used:</h3>
      <ul>
        {triplets.map(([h, r, t], idx) => (
          <li key={idx}>
            ({h}) -[{r}]-{'>'} ({t})
          </li>
        ))}
      </ul>
    </div>
  );
}
