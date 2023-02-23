import { Configuration, OpenAIApi } from "openai";
let configuration;
let openai;
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);


export default async function (req, res) {
  if(!configuration){
    configuration = new Configuration({
      apiKey: req.body.gptKey,
    });
  }
  if(!openai){
    openai = new OpenAIApi(configuration);
  }
 
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.code),
    temperature: 0.6,
    max_tokens:512,

  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(code) {
  console.log('---------------------------------')
 
  const capitalizedcode =
    code[0].toUpperCase() + code.slice(1).toLowerCase();

  return `${capitalizedcode}`;
}
