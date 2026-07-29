"use client";

import { useState } from "react";
import * as Papa from "papaparse";
import type { ParseResult } from "papaparse";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  async function uploadCSV() {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results: ParseResult<Record<string, string>>) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(results.data),
        });

        if (response.ok) {
          alert("CSV Uploaded Successfully");
        } else {
          alert("Upload Failed");
        }
      },
    });
  }

  return (
    <main style={{ padding: "30px" }}>
      <h1>Upload Feedback CSV</h1>

      <br />

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          if (e.target.files)
            setFile(e.target.files[0]);
        }}
      />

      <br />
      <br />

      <button onClick={uploadCSV}>
        Upload CSV
      </button>
    </main>
  );
}