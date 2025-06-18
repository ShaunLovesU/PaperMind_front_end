export type Triplet = [string, string, string];

export interface QAResponse {
  answer: string;
  triplets: Triplet[];
}
