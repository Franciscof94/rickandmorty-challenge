import { getCharacter } from "../actions/getCharacter";
import { Results } from "../components/Results";


export default async function Home() {
  const results = await getCharacter(1);

  return (
    <div>
      <Results data={results} />
    </div>
  );
}
