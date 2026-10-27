
const PYODIDE_URL =
  'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';

let pyodidePromise = null;

async function initializePython() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const { loadPyodide } = await import(
        `${PYODIDE_URL}pyodide.mjs`
      );

      return loadPyodide({
        indexURL: PYODIDE_URL,
      });
    })();
  }

  return pyodidePromise;
}

self.onmessage = async (event) => {
  const { code } = event.data;

  try {
    self.postMessage({ type: 'loading' });

    const python = await initializePython();
    const output = [];

    python.setStdout({
      batched: (text) => output.push(text),
    });

    python.setStderr({
      batched: (text) => output.push(text),
    });

    self.postMessage({ type: 'running' });

    try {
      await python.loadPackagesFromImports(code);

      const result = await python.runPythonAsync(code);

      if (result !== undefined && result !== null) {
        output.push(String(result));
      }

      if (result && typeof result.destroy === 'function') {
        result.destroy();
      }

      self.postMessage({
        type: 'success',
        output: output.join('\n') ||
          'Kode berhasil dijalankan.',
      });
    } catch (error) {
      self.postMessage({
        type: 'error',
        output: [...output, String(error)].join('\n'),
      });
    }
  } catch (error) {
    pyodidePromise = null;

    self.postMessage({
      type: 'error',
      output: `Gagal memuat Python: ${String(error)}`,
    });
  }
};
