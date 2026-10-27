
import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import styles from './styles.module.css';

type Option = {
  id: string;
  text: string;
  explanation: string;
};

type QuizCardProps = {
  question: string;
  options: Option[];
  correctAnswer: string;
};

export default function QuizCard({
  question,
  options,
  correctAnswer,
}: QuizCardProps): React.JSX.Element {
  const [selected, setSelected] = useState<string | null>(null);

  const isCorrect = selected === correctAnswer;
  const selectedOption = options.find(
    (option) => option.id === selected
  );

  return (
    <section className={styles.quiz}>
      <div className={styles.header}>
        <span>Knowledge Check</span>
        <span>Quick Quiz</span>
      </div>

      <h3>{question}</h3>

      <div className={styles.options}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected === option.id}
            className={[
              styles.option,
              selected === option.id
                ? isCorrect
                  ? styles.correct
                  : styles.incorrect
                : '',
            ].join(' ')}
            onClick={() => setSelected(option.id)}
          >
            <span className={styles.optionId}>{option.id}</span>
            <span>{option.text}</span>
            {selected === option.id && (
              isCorrect
                ? <CheckCircle2 size={19} />
                : <XCircle size={19} />
            )}
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className={styles.feedback} role="status">
          <strong>
            {isCorrect
              ? 'Benar! Jawabanmu tepat.'
              : 'Belum tepat, coba lagi!'}
          </strong>

          <p>{selectedOption.explanation}</p>

          <button
            type="button"
            className={styles.retry}
            onClick={() => setSelected(null)}
          >
            <RotateCcw size={16} />
            Ulangi Quiz
          </button>
        </div>
      )}
    </section>
  );
}
