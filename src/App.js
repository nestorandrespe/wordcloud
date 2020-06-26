import React from 'react';
import './App.css';
import Wordcloud from './components/wordcloud/Wordcloud'


function App() {
  return (
    <div className="App">
      <Wordcloud
        width="600"
        height="300"
        list={[
          ['cuatro', 70],
          ['cuatro', 50],
          ['uno',  40],
          ['tres', 20],
          ['dos',  19],
          ['cinco', 15],
          ['cinco', 15],
          ['cinco', 15],
          ['cinco', 5],
          ['cinco', 15],
          ['cinco', 10],
          ['cinco', 5]
        ]}
      />

      <Wordcloud
        width="600"
        height="300"
        list={[
          ['cuatro', 70],
          ['cuatro', 50],
          ['uno',  40],
          ['tres', 20],
          ['dos',  19],
          ['cinco', 15],
          ['cinco', 15],
          ['cinco', 15],
          ['cinco', 5],
          ['cinco', 15],
          ['cinco', 10],
          ['cinco', 5]
        ]}
      />
    </div>
  );
}

export default App;
