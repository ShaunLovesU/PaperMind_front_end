import axios from "axios";
import type {QAResponse} from "./types";

const API_BASE = "http://localhost:8000";

export async function fetchAnswer(question: string): Promise<QAResponse> {
  const response = await axios.post(`${API_BASE}/api/answer`, { question });
  return response.data;
}
