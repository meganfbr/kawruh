
import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  Play,
  RotateCcw,
  Terminal,
  Copy,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Eye,
} from 'lucide-react';
import styles from './styles.module.css';

type WorkerMessage = {
  type: 'loading' | 'running' | 'success' | 'error';
  output?: string;
};

type Props = {
  initialCode?: string;
  expectedOutput?: string;
  hint?: string;
  solution?: string;
};

type Status = 'idle' | 'loading' | 'running' | 'success' | 'error';

const DEFAULT_CODE = `nama = "Kawruh"
print("Halo", nama)
print(10 + 5)`;

export default function PythonPlayground({
  initialCode = DEFAULT_CODE,
  expectedOutput,
  hint,
  solution,
}: Props): React.JSX.Element {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(
    'Klik Run Code untuk menjalankan Python.'
  );
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const checkingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const workerUrl = useBaseUrl('/js/python-worker.js');

  const isExercise = expectedOutput !== undefined;
  const busy = status === 'loading' || status === 'running';

  const clearTimeoutRef = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const stopWorker = () => {
    clearTimeoutRef();
    workerRef.current?.terminate();
    workerRef.current = null;
    checkingRef.current = false;
  };

  useEffect(() => {
    return () => {
      clearTimeoutRef();
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const normalize = (value: string) =>
    value.replace(/\r\n/g, '\n').trimEnd();

  const createWorker = () => {
    const worker = new Worker(workerUrl, {
      type: 'module',
      name: 'kawruh-python-worker',
    });

    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const { type, output: result } = event.data;

      if (type === 'loading') {
        setStatus('loading');
        setOutput('Menyiapkan Python...');
      }

      if (type === 'running') {
        setStatus('running');
        setOutput('Menjalankan kode...');
      }

      if (type === 'success' || type === 'error') {
        clearTimeoutRef();
        setStatus(type);

        const actualOutput = result || '';
        setOutput(
          actualOutput || 'Tidak ada output.'
        );

        if (checkingRef.current) {
          if (
            type === 'success' &&
            normalize(actualOutput) === normalize(expectedOutput || '')
          ) {
            setFeedback('correct');
          } else {
            setFeedback('incorrect');
          }
        }

        checkingRef.current = false;
      }
    };

    worker.onerror = (event) => {
      stopWorker();
      setStatus('error');
      setOutput(event.message || 'Worker mengalami error.');
      setFeedback('error');
    };

    workerRef.current = worker;
    return worker;
  };

  const executeCode = (checkAnswer = false) => {
    if (busy) return;

    checkingRef.current = checkAnswer;
    setFeedback(null);
    setStatus('loading');
    setOutput('Menyiapkan Python...');

    const worker = workerRef.current || createWorker();

    // Batas sederhana agar eksekusi tidak berjalan selamanya.
    // Ini bukan sandbox keamanan penuh.
    clearTimeoutRef();

    timeoutRef.current = setTimeout(() => {
      stopWorker();
      setStatus('error');
      setOutput(
        'Eksekusi dihentikan karena melebihi batas waktu.'
      );
      setFeedback('error');
    }, 60000);

    worker.postMessage({ code });
  };

  const resetCode = () => {
    stopWorker();
    setCode(initialCode);
    setStatus('idle');
    setFeedback(null);
    setShowHint(false);
    setShowSolution(false);
    setOutput('Klik Run Code untuk menjalankan Python.');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      setOutput('Gagal menyalin kode.');
    }
  };

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <span>Python Playground</span>
        <span className={styles.language}>
          {isExercise ? 'Exercise' : 'Python'}
        </span>
      </div>

      <div className={styles.editorHeader}>
        <span>main.py</span>

        <button type="button" onClick={copyCode}>
          <Copy size={16} />
          Copy
        </button>
      </div>

      <textarea
        className={styles.editor}
        value={code}
        onChange={(event) => {
          setCode(event.target.value);
          setFeedback(null);
        }}
        spellCheck={false}
        aria-label="Python code editor"
      />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.runButton}
          onClick={() => executeCode(false)}
          disabled={busy}
        >
          <Play size={17} />
          {busy ? 'Processing...' : 'Run Code'}
        </button>

        {isExercise && (
          <button
            type="button"
            className={styles.checkButton}
            onClick={() => executeCode(true)}
            disabled={busy}
          >
            <CheckCircle2 size={17} />
            Check Answer
          </button>
        )}

        <button
          type="button"
          className={styles.resetButton}
          onClick={resetCode}
        >
          <RotateCcw size={17} />
          Reset / Stop
        </button>
      </div>

      <div className={styles.output}>
        <div className={styles.outputTitle}>
          <Terminal size={17} />
          <span>Output</span>
        </div>

        <pre role="status" aria-live="polite">{output}</pre>
      </div>

      {feedback === 'correct' && (
        <div className={styles.feedbackCorrect} role="status">
          <CheckCircle2 size={20} />
          <span>Benar! Output sesuai dengan jawaban yang diharapkan.</span>
        </div>
      )}

      {feedback === 'incorrect' && (
        <div className={styles.feedbackIncorrect} role="status">
          <XCircle size={20} />
          <span>
            Belum tepat. Periksa output dan coba lagi.
          </span>
        </div>
      )}

      {isExercise && (hint || solution) && (
        <div className={styles.exerciseTools}>
          {hint && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
            >
              <Lightbulb size={17} />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}

          {solution && (
            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
            >
              <Eye size={17} />
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          )}

          {showHint && hint && (
            <div className={styles.exerciseInfo}>
              <strong>Petunjuk</strong>
              <p>{hint}</p>
            </div>
          )}

          {showSolution && solution && (
            <div className={styles.exerciseInfo}>
              <strong>Contoh Solusi</strong>
              <pre>{solution}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
