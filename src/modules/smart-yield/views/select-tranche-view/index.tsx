import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function SelectTrancheView() {
  const { id } = useParams<{id:string}>();
  const [tranche, setTranche] = useState<'senior' | 'junior' | undefined>();

  const selectTrancheHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTranche(e.target.name as 'senior' | 'junior');

  return (
    <>
      <h2>Select your preferred tranche</h2>
      <label htmlFor="senior-tranche">
        Senior tranche
        <input type="radio" name="senior" id="senior-tranche" checked={tranche === 'senior'} onChange={selectTrancheHandler}/>
      </label>
      <label htmlFor="junior-tranche">
        Junior tranche
        <input type="radio" name="junior" id="junior-tranche" checked={tranche === 'junior'} onChange={selectTrancheHandler}/>
      </label>
      <Link to={`/smart-yield/deposit/${id}/${tranche}`} {...{ disabled: !tranche }}>Next Step</Link>
    </>
  )
}
