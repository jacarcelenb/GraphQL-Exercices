import { gql } from "@apollo/client";

const SEND_PROMPT = gql`
mutation SendPrompt($prompt: String){
  SendPrompt(prompt: $prompt)
}
`;



export { SEND_PROMPT };
