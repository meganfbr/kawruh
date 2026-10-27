
import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Play, RotateCcw, Terminal, Copy } from 'lucide-react';
import styles from './styles.module.css';

type WorkerMessage = {
  type: 'loading' | 'running' | 'success' | 'error';
  output?: string;
};

type Props = {
  initialCode?: string;
};

const DEFAULT_CODE = `nama = "Kawruh"
print("Halo", nama)
print(10 + 5)`;

export default function PythonPlayground({
  initialCode = DEFAULT_CODE,
}: Props): React.JSX.Element {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(
    'Klik Run Code untuk menjalankan Python.'
  );
  const [status, setStatus] = useState('idle');

  const workerRef = useRef<Worker | null>(null);
  const workerUrl = useBaseUrl('/js/python-worker.js');

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const createWorker = () => {
    const worker = new Worker(workerUrl, {
      type: 'module',
      name: 'kawruh-python-worker',
    });

    worker.onmessage = (
      event: MessageEvent<WorkerMessage>
    ) => {
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
        setStatus(type);
        setOutput(result || 'Tidak ada output.');
      }
    };

    worker.onerror = (event) => {
      setStatus('error');
      setOutput(event.message || 'Worker mengalami error.');
      worker.terminate();
      workerRef.current = null;
    };

    workerRef.current = worker;
    return worker;
  };

  const runCode = () => {
    if (status === 'loading' || status === 'running') {
      return;
    }

    setStatus('loading');
    setOutput('Menyiapkan Python...');

    const worker = workerRef.current || createWorker();
    worker.postMessage({ code });
  };

  const resetCode = () => {
    workerRef.current?.terminate();
    workerRef.current = null;

    setCode(initialCode);
    setStatus('idle');
    setOutput('Klik Run Code untuk menjalankan Python.');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      setOutput('Gagal menyalin kode ke clipboard.');
    }
  };

  const busy = status === 'loading' || status === 'running';

  return (
    <div className={styles.playground}>
      <div className={styles.header}>
        <span>Python Playground</span>
        <span className={styles.language}>Python</span>
      </div>

      <div className={styles.editorHeader}>
        <span>main.py</span>
        <button
          type="button"
          onClick={copyCode}
          aria-label="Copy Python code"
        >
          <Copy size={16} />
          Copy
        </button>
      </div>

      <textarea
        className={styles.editor}
        value={code}
        onChange={(event) => setCode(event.target.value)}
        spellCheck={false}
        aria-label="Python code editor"
      />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.runButton}
          onClick={runCode}
          disabled={busy}
        >
          <Play size={17} />
          {busy ? 'Processing...' : 'Run Code'}
        </button>

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
    </div>
  );
}
