const axios = require("axios").default;
const fs = require("fs").promises;
const path = require("path");
const { parseString } = require("xml2js");

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const makeRequest = async (cpfWithoutMask, baseURL, outputFolder) => {
  try {
    const response = await axios.get(`${baseURL}${cpfWithoutMask}`, {
        headers: {
            "x-auth": "5a049968-1f13-4ac1-be2b-46b7445fd84f",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
            Cookie: "",
        },
      withCredentials: true,
      timeout: 1000,
      validateStatus: false,
    });

    if (response.status === 200 && response.data) {
      if (response.headers["content-type"].includes("xml")) {
        const fileName = path.join(outputFolder, `${cpfWithoutMask}_200.xml`);
        await fs.writeFile(fileName, response.data);
        console.log(`CPF ${cpfWithoutMask} possui XML na resposta. Salvando...`);
      } else {
        const fileName = path.join(outputFolder, `${cpfWithoutMask}_200.json`);
        await fs.writeFile(fileName, JSON.stringify(response.data, null, 2));
        console.log(`CPF ${cpfWithoutMask} possui JSON na resposta. Salvando...`);
      }
    } else {
      console.log(`CPF ${cpfWithoutMask} não possui JSON ou XML na resposta ou o status não é 200.`);
    }
  } catch (error) {
    console.error(`Erro na requisição para ${baseURL}${cpfWithoutMask}: ${error.message}`);
  }
};

const main = async () => {
  const baseURL = "api";
  const outputFolder = "base/";
  const maxIterations = 99999999999;

  try {
    await fs.access(outputFolder);
  } catch (err) {
    await fs.mkdir(outputFolder);
  }

  for (let i = 1; i <= maxIterations; i++) {
    const cpfWithoutMask = i.toString().padStart(11, '0');

    await makeRequest(cpfWithoutMask, baseURL, outputFolder);

    if (i < maxIterations) {
      await sleep(2000);
    }
  }
};

main().catch((error) => console.error("Erro principal:", error));
