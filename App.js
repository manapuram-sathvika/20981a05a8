import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const urls = ['http://20.244.56.144/numbers/fibo', 'http://20.244.56.144/numbers/rand', 'http://20.244.56.144/numbers/odd', 'http://20.244.56.144/numbers/primes'];
      const promises = urls.map(url =>
        fetch(url)
          .then(response => response.json())
          .catch(error => {
            console.error(`Error fetching ${url}: ${error}`);
            return { numbers: [] };
          })
      );

      try {
        const responses = await Promise.allSettled(promises);

        const validResponses = responses
          .filter(response => response.status === 'fulfilled')
          .map(response => response.value.numbers)
          .flat();

        const uniqueSortedNumbers = [...new Set(validResponses)].sort((a, b) => a - b);
        setMergedNumbers(uniqueSortedNumbers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Merged Unique Integers</h1>
      <pre>{JSON.stringify({ numbers: mergedNumbers }, null, 2)}</pre>
    </div>
  );
}

export default App;
