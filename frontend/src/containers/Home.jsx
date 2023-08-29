import React, { useRef, useState } from "react";
import useAutoResizeHeight from "../hooks/useAutoResizeHeight";
import Button from "../components/Button";
import { motion, AnimatePresence } from "framer-motion";
import PoemResult from "./PoemResult";

export default function Home() {
  const [poemInspirationInput, setPoemInspirationInput] = useState({
    value: "",
    error: ""
  });
  const [poemGenerationStage, setPoemGenerationStage] = useState('IDLE'); // IDLE, GENERATING, DONE
  const [generatePoem, setGeneratedPoem] = useState({
    input: '',
    output: '',
  });
  const ref = useRef(null);
  useAutoResizeHeight(ref.current, poemInspirationInput.value);

  function handleChange(e) {
    setPoemInspirationInput({
      ...poemInspirationInput,
      value: e.target.value
    });
  }
  function cleanPoemInspirationInput() {
    setPoemInspirationInput({
      value: "",
      error: "",
    })
  }
  function handleSearch() {
    if (poemInspirationInput.value) {
      setGeneratedPoem({
        input: poemInspirationInput.value,
        output: '',
      });
      setPoemGenerationStage("GENERATING");
    } else {
      setPoemInspirationInput({
        ...poemInspirationInput,
        error: true,
      });
    }
  }

  return (
    <div className="home">

      <div className="info" style={{visibility: poemGenerationStage != "IDLE" ? "hidden" : "visible"}}>
        <h4 className="home__title">Poem GPT</h4>
        <h6 className="home__subtitle">
            Drop Your Thoughts, Words or Phrases and let the AI do the rest
        </h6>
      </div>
        
      <textarea
        style={{
          maxHeight: poemGenerationStage != "IDLE" ? "100vh" : "130px",
          marginTop: '70px'
        }}
        ref={ref}
        value={poemInspirationInput.value}
        id="textarea"
        type="text"
        placeholder="Craft a Poem"
        onChange={handleChange}
        className={
          poemGenerationStage != "IDLE" ? "home__input move-top-left " : "home__input"
        }
        disabled={poemGenerationStage != "IDLE" ? true : false}
      />
      <div className="input__error">{ poemInspirationInput.error ? "* Enter something" : null}</div>
      <div
          style={{height: '100%'}}
      >
        <AnimatePresence>
          {
            poemGenerationStage != 'IDLE' && (
              <motion.div
                initial={{ opacity: 0 , transform: "translateX(100%)",  width: '0%'}}
                animate={{ opacity: 1 , transform: "translateX(0%)", position: 'absolute', top: '0px', right: '0px', width: '65%', height: '100%'}}
                exit={{ opacity: 0 , transform: "translateX(100%)" }}
                transition={{ duration: 2, delay: 0 }}
              >
                <PoemResult
                  result={generatePoem}
                />
              </motion.div>)
          }
        </AnimatePresence>
      </div>
      <AnimatePresence>
          {
              poemGenerationStage != 'IDLE' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: 0 }}
                  className="side__header"
                >
                  <motion.div
                    initial={{ opacity: 0, X: "-25%" }}
                    animate={{ opacity: 1, x: "0px" }}
                    exit={{ opacity: 0, x: "0px" }}
                    transition={{ duration: 2, delay: 0 }}
                    className="result__back"
                    onClick={() => {
                      setPoemInspirationInput({
                        value: "",
                        error: "",
                      })
                      setPoemGenerationStage("IDLE")
                    }}
                  >
                    <span>&#8592;</span>
                    <label>Back to Search</label>
                  </motion.div>
                </motion.div>)
          }
        </AnimatePresence>
      {
        poemGenerationStage == 'IDLE' &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ Y: "0px", opacity: 0 }}
          transition={{ duration: 2, delay: 0 }}
          className="home__button-container"
        >
          <Button name="Search" clickHandler={handleSearch} />
          <Button name="Reset"  clickHandler={cleanPoemInspirationInput} />
        </motion.div>
      }
    </div>
    
  );
}
