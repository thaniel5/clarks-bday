import { useState } from 'react'

function App() {
  const [isComing, setIsComing] = useState('')
  const [total, setTotal] = useState(0)

  return (
    <main className="container">
      <h1>Clark's 5th Birthday!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <p>What is your name?</p>
        <span>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" />
        </span>
        <p>Are you coming to the party?</p>
        <span>
          <span>
            <input
              type="radio"
              id="yes"
              name="coming"
              value="yes"
              checked={isComing === 'yes'}
              onChange={(e) => setIsComing(e.target.value)}
            />
            <label htmlFor="yes">Yes</label>
          </span>
          <span>
            <input
              type="radio"
              id="no"
              name="coming"
              value="no"
              checked={isComing === 'no'}
              onChange={(e) => setIsComing(e.target.value)}
            />
            <label htmlFor="no">No</label>
          </span>
        </span>
        {isComing === 'yes' && (
          <div>
            <p>How many total people in your party?</p>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
            />
            {Array.from({ length: total }, (_, i) => (
              <span>
                <label htmlFor={`firstName${i}`}>First Name</label>
                <input id={`firstName${i}`} name="firstName" />

                <label htmlFor={`lastName${i}`}>Last Name</label>
                <input id={`lastName${i}`} name="lastName" />

                <label htmlFor={`age${i}`}>Age</label>
                <input type="number" id={`age${i}`} name="age" />
              </span>
            ))}
          </div>
        )}
        <button>Submit RSVP</button>
      </form>
    </main>
  )
}

export default App
