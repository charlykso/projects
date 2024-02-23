import fs from 'fs/promises'

async function getData(filepath) {
  try {
    const data = await fs.readFile(filepath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default getData;