import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Practice = () => {
  const [words, setWords] = useState([{
    id: 0,
    word: '',
    pos: ''
  }]);
  const [count, setCount] = useState(0);
  const [word, setWord] = useState('');
  const [answer, setAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [progress, setProgress] = useState(0)

  const [showText, setShowText] = useState(false)
  const [disableNext, setDisableNext] = useState(true)

  const [disableNoun, setDisableNoun] = useState(false)
  const [disableVerb,setDisableVerb]= useState(false)
  const [disableAdverb, setDisableAdverb]= useState(false)
  const [disableAdjective,setDisbaleAdjective]= useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate();

  const selectNoun = useRef();
  const selectVerb = useRef();
  const selectAdverb = useRef();
  const selectAdjective = useRef();

  /* fetch words array from server */
  useEffect(() => {
    const fetchWords = async () => {
      const response = await axios.get('http://localhost:5000/words');
      setWords(response.data);
    }
    fetchWords();
  }, [])

  /* set word everytime count updates */
  useEffect(() => {
    setWord(words[count].word)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }, [words, count])
  
  /* focus on selected answer button*/
  const focusAnswer = () => {
    if(answer === 'noun') selectNoun.current.focus();
    if(answer === 'verb') selectVerb.current.focus();
    if(answer === 'adverb') selectAdverb.current.focus();
    if(answer === 'adjective') selectAdjective.current.focus();
  };

  /* go to next word */
  const Next = () => {
    if(count < 9) {
      setCount(count => count + 1)
      setWord(words[count].word)
      setAnswer('')
      setDisableNext(true)

      /* increment score if answer is correct */
      if(answer === words[count].pos) {
        setScore(score => score + 1)
      }

      /* enable disabled  buttons*/
      if(answer === 'noun') {
        setDisbaleAdjective(false)
        setDisableVerb(false)
        setDisableAdverb(false)
      }
      else if(answer === 'adverb') {
        setDisbaleAdjective(false)
        setDisableVerb(false)
        setDisableNoun(false)
      }
      else if(answer === 'adjective') {
        setDisableNoun(false)
        setDisableVerb(false)
        setDisableAdverb(false)
      }
      else if(answer === 'verb') {
        setDisbaleAdjective(false)
        setDisableNoun(false)
        setDisableAdverb(false)
      }
 
    }else {
      const finalScore = (score/ words.length) * 100 
        navigate('/rank', {state: {finalScore}})
    }
    setShowText(false)
  }

  /* handle answers buttons */
  const handleClick = (e) => {
    if(answer === '')setAnswer(answer => answer = e.target.name)
    
    /* update progress one answer is chosen*/
    setProgress(progress => progress = ((count + 1 )/ words.length) * 100)
    
    focusAnswer()
    setShowText(true)
    setDisableNext(false)

    /* disable unselected buttons */
    if(answer === 'noun') {
      setDisbaleAdjective(true)
      setDisableVerb(true)
      setDisableAdverb(true)
    }
    else if(answer === 'adverb') {
      setDisbaleAdjective(true)
      setDisableVerb(true)
      setDisableNoun(true)
    }
    else if(answer === 'adjective') {
      setDisableNoun(true)
      setDisableVerb(true)
      setDisableAdverb(true)
    }
    else if(answer === 'verb') {
      setDisbaleAdjective(true)
      setDisableNoun(true)
      setDisableAdverb(true)
    }  
  }

  

  return (
    <>
    {
      isLoading ? 
      <div className="loading-container">
        <span class="loader"></span>
      </div>
      :

      <div className='practice-container'>
        <div className="progress-bar">
          <div className='progress' style={{width : `${progress}%`}}>
            {progress > 0 ? 
            <span>{progress} %</span> :
            <></>
            }
          </div>
        </div>
        <h2>{word}</h2>
       
        <div className="btns-container">
            <button 
              name='noun' 
              onClick={handleClick} 
              disabled={disableNoun} 
              ref={selectNoun}>
               Noun
            </button>
            <button
              name='adverb'
              onClick={handleClick}
              disabled={disableAdverb} 
              ref={selectAdverb}>
               Adverb
            </button>
            <button 
              name='adjective' 
              onClick={handleClick} 
              disabled={disableAdjective} 
              ref={selectAdjective}>
                Adjective
            </button>
            <button 
              name='verb' 
              onClick={handleClick} 
              disabled={disableVerb} 
              ref={selectVerb}>
                Verb
            </button>
        </div>
        {
          showText ? 
            answer === words[count].pos ? 
            <p className='correct'>Your Answer is Correct</p>
            :
            <p className='incorrect'>Your Answer is Incorrect</p>
          : <></>
        }
        
        <button className='next' onClick={Next} disabled={disableNext}>Next</button>
    </div>
    }
    </>
  )
}

export default Practice